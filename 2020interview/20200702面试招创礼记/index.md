# 问题统计：
1. 闭包（高阶函数）
2. http协议如何从url到页面加载的过程 
3. webpack如何有哪些优化性能的方法 
4. 多个请求同时发生，最后一个请求让loading消失
5. 如何实现图片懒加载
6. 浏览器缓存了解多少，你的最佳实践？
7. 如何首屏优化 
8. 网站攻防：XSS/CSRF 
9. TS了解多少？
10. flex布局有使用过吗？有父子模块，如何让子模块在父模块水平垂直居中？
11. git，同时有两条分支，a分支commit了5次并且提交了，b分支如何获取a分支的第三次commit
12. 项目中最难的问题是什么？如何解决

（面试官：前端大佬）

## 1.闭包，完成函数pipe，让输入的三个方法依次执行

var a = v => v * v
var b = v => v * 2
var c = v => v + 1

解决只有三个function的问题
```javascript
const pipe = (a, b, c) => val => {
  return c(b(a(val)))
}
```

如果只有pipe的参数无限个呢？解决function有无限个的问题。
```javascript
function pipe(...funcs) {
  if (funcs.length === 0) {
    return arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => val => b(a(val)))
}

var res = pipe(a, b, c)

console.log(res(3))
```

## 2.同时有5个请求，如何让最后一个请求结束后让loading消失

1）已知有5个请求，则设定变量为5，然后每个请求结束了之后变量减一，为零则loading消失


## 3.http协议如何从url到页面加载的过程？（这道题非常考网络编程基础）TODO:问题太大留到最后解决
（关于这道题很全面的回答）https://www.cnblogs.com/chengxs/p/11039155.html
*基本步骤：*
1. 浏览器**接收url地址**后开启网络请求线程
2. 开启网络线程后，对url进行**DNS域名解析**，找到对应IP地址，**发出一个完整的http请求到对应服务器**
3. 服务器接收到请求后转达请求到对应后台
4. **后台返回数据**，并**在浏览器端对加载的资源进行解析和对数据进行缓存**
5. 完成渲染

*详细步骤：*
1. 输入url进浏览器
2. 浏览器解析url获得URL的domain
3. 浏览器发送domain到DNS服务器进行域名解析(称为三次握手)
4. 浏览器获得DNS解析出的IP地址
5. 浏览器伴随协议、参数发送请求到对应IP地址
6. 请求经过局域网、交换机、路由器、主干网络后，到达IP地址相应服务器
7. 请求到达服务器后端，经过router、controller、model、view最后返回给浏览器
8. 浏览器获取数据资源，然后对html，css形成的dom树进行渲染，执行js脚本并根据请求数据判断是否需要对资源进行缓存
9. 一次‘会话’完成，如果设置了Connection：keep-alive则TCP连接不关闭，否则关闭连接。


**在http请求的过程中有哪些可以优化？**

1. 使用cdn请求静态资源，加速获得资源
2. 缓存html，css，js，图片，减少http请求
3. 合并请求，减少http请求
4. 使用HttpDns进行DNS预解析


## 4.TCP和UDP协议了解过吗？TCP与UDP的区别？
UDP：（游戏）
1）无连接协议，只管数据发送，不管是否接收
2）因为1）所以UDP速度快
3）因为1）所以UDP不可靠性
4）UDP可以1对1，1对多，多对1，多对多传输数据

TCP：（邮件、文件）
1）不丢包
2）连接：三次握手
3）断开：四次握手
4）传输可靠
5）只能一对一传输


## 5.浏览器缓存了解多少，如何从这方面优化？
缓存的优点：
1）减少冗余的网络传输
2）从本地请求文件，用户加载页面速度快
3）减少服务器负担，提升网站性能
> 谷歌查看缓存文件的网址：chrome://net-internals/#httpCache
### 有哪几种缓存？，如何缓存文件？，缓存之间的区别？ ###
浏览器缓存有：强缓存和协商缓存

响应请求的同时带上缓存规则。
缓存规则由响应头的头部信息（response header）的这三者组成：**Cache-controls/ETag/Last-Modified**
Cache-controls:是否缓存，且缓存时间
ETag：每个文件有一个ETag，改动文件就变了，可以看似文件唯一标识hash
Last-Modified：文件的修改时间


通过Cache-controls判断资源是否过期

Cache-controls可选参数：
1）no-cache(不缓存，重要)
2）max-age=xxx(xxx的单位是秒，重要)
3）private(仅浏览器缓存)
4）public(浏览器和代理服务器都可以缓存)

如果Cache-controls的参数是max-age则为*强缓存*
如果Cache-controls的参数是no-cache则为*协商缓存*

*强缓存*
触发条件：
Cache-controls的参数是max-age

强缓存步骤:
1. 首次请求a.js，缓存表没有该信息，则向服务器请求该文件
2. 服务器返回文件，并将cache-controls="max-age=xxx"，则为强缓存，文件存进缓存表
3. 再次请求a.js，缓存表中cache-controls是"max-age=xxx"，则为强缓存
3.1. 如果没过期，直接读a.js
3.2. 如果过期了，则执行协商缓存步骤 

*协商缓存*
触发条件：
1. Cache-controls参数为no-cache
2. max-age过期了

协商缓存步骤：
1. 首次请求b.js，缓存表没有该信息，则向服务器请求该文件
2. 服务器返回文件，并将cache-controls="no-cache"，并且带上文件标识ETag和Last-Modified文件更新时间
3. 将ETag、Last-Modified存入缓存表
3. 再次请求b.js，将ETag、Last-Modified的值赋给if-None-Match、if-Modified-Since发给服务器，服务端和最新资源做对比
4. 如果资源没更改，返回304，浏览器读取本地缓存。
5. 如果资源有更改，返回200，返回最新的资源，并将新的ETag、Last-Modified存入缓存表。

*配置缓存规则在后端或者nginx代理服务器上配置*

**强缓存和协商缓存的区别在于：**
1. 强缓存和协商缓存使用到的响应头信息不同，前只需要检测Cache-controls，后需要检测Cache-controls、ETag、Last-Modified
2. 强缓存直接到缓存中取，协商缓存每次都要发送请求让服务器告知是否在缓存中取
3. 从缓存中取的状态码：强缓存200，协商缓存304

**用户操作对缓存的影响：**

用户操作         Expires/Cache-controls      Last-Modified/ETag

地址栏回车				有效           			有效

页面链接跳转             有效			            有效

新开窗口                 有效                    有效

前进后退                 有效                    有效

F5刷新                  无效                    有效

ctrl+F5强制刷新          无效                    无效

注意：
F5刷新会跳过强缓存规则，直接走协商缓存
ctrl+F5刷新会跳过所有缓存规则，相当于首次请求文件

### 浏览器缓存的最佳实践 ###

1）index.html 不做缓存，每次请求都获取最新版本
2）使用 webpack 等 build 后的其他所有资源文件（包括 js、css 和图片等），都做强缓存（一个月打底，可以设置一年）

如何实现：
index.html不做缓存，由于build后的资源文件的文件名称不一样，所以发版后新的html文件就会引入新的资源文件（js、css、jpg...）


## 6.如何实现图片懒加载 ##

使用API:getBoundingClientRect （返回元素大小和其相对于视口的位置）

    function inInSight(el){
		const bound = el.getBoundingClientRect();
		const clientHeight = window.innerHeight;
		//若只考虑向下滚动
		//bound.top是元素距离视口顶部高度，window.innerHeight是视口高度，+100是提前显示
		return bound.top <=clientHeight+100
	}
	//增加节流：1000才判断一次inInSight


## 7.flex布局有使用过吗？ 有父子模块，如何让子模块在父模块水平垂直居中##
问题答案：只要父节点样式为:
{
display:flex;
justify-content:center;
align-items:center;
}

一劳永逸学习flex布局（https://juejin.im/post/58e3a5a0a0bb9f0069fc16bb）
*CSS布局发展：*
1. 使用table来布局
2. web语义化之后使用标准文档流（使用元素自带布局h1、p、div）、浮动布局（float）、定位布局（margin、padding）
3. 现在有了flex布局

### flex基本概念： ###
1. 轴
  主轴 main axis（主轴就是父容器水平方向中间的轴线，默认）
  交叉轴 cross axis（交叉轴轴就是父容器垂直方向中间的轴线，默认）
2. 容器
  父容器 container
  子容器 item

> 容器具有这样的特点：父容器可以统一设置子容器的排列方式，子容器也可以单独设置自身的排列方式，如果两者同时设置，以子容器的设置为准。

### 容器：**(这四个属性最常用)** ###
1. 父容器
  justify-content
  align-items
2. 子容器
  flex
  align-self

### 父容器： ###

*父容器控制子容器水平位置(设置子容器沿主轴排列，主轴就是父容器水平方向中间的轴线)：*
justify-content✔✔✔✔✔
1. 位置排列
flex-start(水平：左)
flex-end(水平：右)
center(水平：居中)
2. 分布排列
space-between(最中间子沿主轴均匀分布，最左右两边的子贴着父)
space-around(最中间子沿主轴均匀分布，最左右两边的子距离父的距离*2 = 距离旁边子的距离)

*父容器控制子容器垂直位置：*
align-items✔✔✔✔✔
位置排列
1. flex-start(垂直：上)
2. flex-end(垂直：下)
3. center(垂直：中)
基线排列
1. baseline(子容器内首行文字就是基线，以这条线为中心)（所有子容器向基线对齐，交叉轴起点到元素基线距离最大的子容器将会与交叉轴起始端相切以确定基线。）
拉伸排列
1. stretch(垂直拉伸，让子容器和父容器一样高)

### 子容器： ###
*伸缩：*
flex✔✔✔✔✔
1. flex值可以是无单位数字1，2，3
2. 可以是有单位数字10px
3. 可以是none（为none则不伸缩）

另外flex可以是单值、双值、三值、none

*子容器控制子容器垂直位置：*
align-self✔✔✔✔✔
1. flex-start垂直：上)
2. flex-end垂直：下)
3. center垂直：中)
4. baseline(子容器内首行文字就是基线，以这条线为中心)（所有子容器向基线对齐，交叉轴起点到元素基线距离最大的子容器将会与交叉轴起始端相切以确定基线。）
5. stretch(垂直拉伸，让子容器和父容器一样高)


### 轴： ###

说明：
justify-content是沿主轴方向
align-items和子容器的align-self都是沿交叉轴方向

**控制主轴方向（交叉轴由主轴方向逆时针90°获取）：**
flex-direction:
1. row(向右)
2. row-reverse(向左)
3. column(向下)
4. column-reverse(向上)


### 进阶知识： ###

*父容器控制子容器是否换行*
flex-warp
1. warp（换行）
2. nowarp（不换行）
3. warp-reverse(反着换行)

*flex-direction(轴向)与flex-warp(换行)组合设置：*
flex-flow
1. 可只设轴向
2. 可只设换行
3. 可以一起设置


还有几个不经常用到的：
1. align-content多行沿交叉轴对齐（使用跟align-items一样）
2. flex-basis设置子容器的基准
3. flex-grow设置子容器的扩展比例
4. flex-shrink设置子容器的收缩比例
5. order设置子容器的排列顺序


## git，同时有两条分支，a分支commit了5次并且提交了，b分支如何获取a分支的第三次commit ##
> 键入p退出文本编辑模式
> 扩展（linux语言）：wq保存退出 wq!强制保存退出 q退出 q!强制不保存退出


				--------------             --------------              --------------
  工作区： 		|			 |             |			|              |            |
   				|	暂存区	 |             |  待push区  |               |  remote    |
新增文件 git add |			 |  git commit |			|   git push   |  远程仓库   |
修改文件 ----->  |			 |   ----->    |			|  --------->  |   github   |
删除文件		    |			 |             |			|              |     or     |
				|			 |             |			|              |   gitlab   |
				--------------             --------------              --------------


												HEAD（当前所在commit位置）
												  👇
一般你有三条分支：								      👇
master主分支------->2d23a4c------>c64df16---->512535c
   \							/merge新功能 /
   dev(新功能开发)------->6253f2e			   /
										  /修复bug
   issue-<nickname>(处理bug)------->6253f2e 
   feature-<nickname>
分支一般有4个：
master主分支 要push
dev 新功能分支 要push
bug bug分支 一般不push，除非老板想统计多少个bug
feature 合作分支 取决于自己


# 启动一个工作区 #
git init (在本地创建新的项目)
git clone xxx (克隆项目)✔

# 操作文件内容 #
git add xx(增加某个文件到暂存区)
git add .(增加所有新文件)✔
git commit -m'<message>'(提交所有更改，并注释message)✔
git checkout -- <file>(让文件回到最近一次add或者commit状态下，回到无修改状态，此时还没add或者commit)✔
git reset HEAD <file>(让文件退回到工作区，文件已经add到暂存区)✔
git rm <file> (commit之后将文件删除，用git rm file是确认删除的意思，此处用git add file或者git add .也一样，确认修改)

# 查看commit、文件情况、项目分支合并情况 #
git log (查看commit记录)
git log --pretty=oneline(查看commit记录，一行一条commit记录) ✔
git reflog (可以查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）)✔
git log --graph --abbrev-commit --pretty=oneline (查看项目所有分支情况)✔
git status (查看文件版情况)✔

# 操作commit退回 #
git reset --hard <commit number> (commit number为对应commit记录的版本号前几位(一般前7位))✔
git reset --hard HEAD~<number> (x为回退第几个版本，一般很少用)

# 分支 #
git branch <branch> (创建分支branch)
git branch -d <branch> (删除分支branch)
git branch -D <branch> (强行删除未合并的分支branch，分支未合并的时候使用)
git branch (查看分支)✔
git checkout <branch> (切换分支branch)
git checkout -b <branch>（创建并切换到该分支）✔
git merge <branch> (合并别的分支到当前分支上，合并的是commit内容)✔
git merge --no-ff -m'<message>'(合并别的分支到当前分支上，新创建一个commit，并输入message，--no-ff可以添加内容到)✔
git branch --set-upstream-to=origin/<branch> <branch>(指定本地分支和远程分支链接)✔
git cherry-pick <commit num> 分支要拉去别的分支上的commit，然后再打包到测试去测√
merge方法由几种：
1. Fast-forward (merge之后，删除分支后，回丢掉分支信息)
2. 非Fast-forward (merge之后，当前分支回新增一条commit)这种模式用git log ..... 可以看到项目分支修改的缩略图

# 保存临时（未add/commit）状态 #
git stash (保存代码状态，当前还没有add/commit代码的分支)✔
git stash list (查看代码状态保存情况)✔
git stash apply <stash name> (切换某个stash状态，stash name 一般是类似stash@{0}的。知识切换stash状态，不会删除当前stash分支)
git stash drop <stash name> (删除某个stash状态)
git stash pop (获得最新的stash状态并删除该记录)✔


git remote (查看远程信息，远程库名称(一般为origin))
git remote -v (查看远程库 推送拉取地址)

git push origin master (推送该分支的所有commit)✔
git pull (拉取当前分支的远程库代码)✔

合并分支应用场景：
版本增加新功能，自己新创一个分支写代码，功能写好之后merge回主分支master，然后delete多余分支即可

删除分支场景：
新功能不需要了，git branch -D <branch>

开发冲突场景：
与同事一起开发同一个功能，push的显示不成功
git pull （拉取一下远程）
(如果：git pull不成功提示no tracking information用git branch --set-upstream-to=origin/<branch> <branch>)✔
修改了代码
重新git add . && git commit 一下
git push


# 记录到4.7 #

## 网站攻防：XSS/CSRF ##

## XSS ##
*跨站脚本攻击* cross site scripting

三种方式：
1. 反射型
2. 存储型DB
3. 基于DOM

反射型场景：
比如页面有个小弹窗，**诱使用户点击恶意链接或者进入一个网站**（该页面获取用户cookie <document.cookie> ），此时用户是登录的，浏览器包含着cookie，
黑客挟持用户的登录态，重定向到攻击者预先准备的页面，注入恶作剧脚本或者获取用户隐私数据

存储型场景：
用户在社区或者论坛下写了一篇带有恶意代码的文章，保存在**服务端**。文章发表后，所有访问该文章的人都会执行这段恶意代码。

基于DOM场景：
通过恶意脚本修改页面的 DOM 结构，设置一张引诱图片，下方设置个按钮，点击按钮会执行预先设置好的恶意脚本。

XSS攻击的防范：

1. HttpOnly，设置cookie时，将其属性设为HttpOnly。浏览器将禁止页面的Javascript 访问cookie
2. 输入检查 如果输入带 script 标签、<、>、的内容，会直接过滤掉
3. 输出过滤 

## CSRF ##
*跨站请求伪造* cross site request forgery

CSRF场景：
当用户登录了a网站，并保存了cookie在浏览器，然后再次期间用户访问了黑客的b网站
比如a网站的删除账号请求是`http://www.a.com:8002/content/delete/87343`
在用户访问b网站的时候，b网站发送请求`http://www.a.com:8002/content/delete/87343`并使用a网站的cookie，此时即算CSRF攻击

注意CSFR攻击无法获取cookie内容，但是可以挟持cookie来对用户进行攻击


CSRF攻击防范：

1. 验证码（验证码被认为是对抗 CSRF 攻击最简洁而有效的防御方法）
2. 添加token验证，前端发送请求的时候随机发送一个参数为token，后端检验是否有token。由于恶意网站不知道token，所以他的攻击会被屏蔽掉
3. Referer Check（未了解）


## 首屏优化 ##

1. 使用缓存文件html,css,js,图片：强缓存和协商缓存
2. css优化：
使用scss，less写成cssdom树，更快渲染
压缩css
3. 使用cdn请求
4. 图片处理


## 项目中遇到什么难点？怎么解决？有什么收获 ##

文件上传！！！！！


## webpack了解吗？如何优化？ ##

1. mode选择production，有助于压缩文件
2. 安装polyfill，高阶ES语法，按需引入
3. 缩⼩⽂件范围 Loader：(1)include指定loader使用区域;(2)resolve.modules+resolve.alias指定第三方去module对应文件夹里面查找
4. 压缩optimize-css-assets-webpack-plugin + html-webpack-plugin文件
5. 使用glob-all purify-css purifycss-webpack将不使用的css不打包
6. 剪切文件optimization：{splitChunks:{}},webpack自带配置
