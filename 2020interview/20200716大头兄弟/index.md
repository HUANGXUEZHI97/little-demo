# 问题统计

1. AMD,CMD,commonJS,es6
2. package.json和package-lock.json有什么区别
3. 对象如何继承

## 1. AMD,CMD,commonJS,es6 ##

commonJS(同步模块规范):
1. node就是用commonJS模块规范
2. 每个文件有自己独立的作用域
3. 所有代码都运行在模块作用域，不会污染全局作用域。
4. 模块可以多次加载，但是只运行一次
5. 运行时加载(先加载整个模块，生成一个对象，然后再读方法)
6. module,exports,require,global环境变量
7. module.exports输出，require导入

ES6：
1. 使用export输入，再用import输出
2. 默认使用严格模式
3. 编译时加载(import指定加载某个模块)

AMD(异步模块规范——RequireJs):
1. 异步模块规范
2. 依赖前置、提前执行（先引入所有模块）

CMD(普通模块规范——SeaJs):
1. 依赖就近、延迟执行（要使用的时候在当前语句上一句引用）

AMD和CMD:
1. require.config()指定引用路径
2. 用define()定义模块
3. require()导入模块


## 2. package.json、package-lock.json和yarn.lock ##

package.json:
1. 定义项目中需要依赖的包以及相关执行命令与附加信息

package-lock.json:
1. 在npm install 时候生成该文件，用以记录当前状态下实际安装的npm package的具体来源和版本号

yarn.lock:
1. 是js包管理工具
2. 安装中重要信息存储到yarn.lock文件中
3. 锁定你安装的每个依赖项的版本


## 3. 对象如何继承 ##

继承有两种：1.接口继承；2. 实现继承

### JS只支持实现继承 ###

```javascript
constructor1.prototype = instance2
function Father(){
	this.property = true;
}
Father.prototype.getFatherValue = function(){
	return this.property;
}
function Son(){
	this.sonProperty = false;
}
//继承 Father
Son.prototype = new Father();//Son.prototype被重写,导致Son.prototype.constructor也一同被重写
Son.prototype.getSonVaule = function(){
	return this.sonProperty;
}
var instance = new Son();
alert(instance.getFatherValue());//true
```
在当前方法中寻找方法，如果没有就在其构造函数的继承函数上找，依次网上找到类型原型如Object.prototype


### 如何确认原型和实例的关系 ###

#### instanceof() ####
```javascript
alert(instance instanceof Object);//true
alert(instance instanceof Father);//true
alert(instance instanceof Son);//true
```
#### inPrototypeOf() ####
```javascript
alert(Object.prototype.isPrototypeOf(instance));//true
alert(Father.prototype.isPrototypeOf(instance));//true
alert(Son.prototype.isPrototypeOf(instance));//true
```

### 原型链有个问题 ###

问题一: 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;

问题二: 在创建子类型(例如创建Son的实例)时,不能向超类型(例如Father)的构造函数中传递参数.

#### 解决：（借用构造函数） ####

```javascript
function Father(){
  this.colors = ['red','blue','green'];
}

function Son(){
 Father.call(this)//继承了Father,且向父类型传递参数
}
var instance1 = new Son();
instance.colors.push('yellow');
console.log(instance1.colors);//'red','blue','green','yellow'

var instance2 = new Son();
console.log(instance2.colors);//'red','blue','green' 可见引用类型值是独立的
```

然后由constructor引用出来的

题目：楼梯有n阶台阶，上楼可以一步上1阶，也可以一步上2阶，算出有多少种走法？