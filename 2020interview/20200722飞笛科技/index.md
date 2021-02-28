# 问题统计

1. 请描述出Array和String类型常用的方法和属性
2. 常用的http状态有哪些？http头部有哪些？
3. 写一个函数把字符串逆转（例如输入'abcd'，输出'dcba'）
4. 请写出下面脚本的输出：
```javascript
var x = 1;
function a(){
  alert(x);
  var x = 2;
  x++;
  alert(x);
}
function b(){
  alert(x);
  x++;
  alert(x);
}
a();
b();
// undefined 3    1  2 全对
```
5. 请给出下面这段代码的输出
```javascript
for(var i = 0;i<5;i++){
  setTimeout(function(){
    console.log(i);
  },1000)
}
console.log(i);
// 5     5 5 5 5 5
```
6. 给内建类型Array增加一个方法，实现的功能是将数组的元素去重
7. 什么是跨域？如何解决跨域问题？
8. 用多种方法实现div水平垂直居中，justify-content是沿着什么轴？
9. 用JS编写函数从下面的URL串中解析出所有的参数：
http://www.21fid.com/?user=fidnner&id=456&city=shenzhen
期望的返回结果格式如下：
```javascript
{
  user:'fidnner',
  id:'456',
  city:'shenzhen'
}
```
10. https和http有什么区别？了解http2吗？http2增加了哪些内容？tcp的三次握手传递了啥？为什么要第三次握手？
11. null==undefined? null==0? null==false? null==''?
12. 了解apply和call吗？他们区别是啥？写一下call
13. 原型和原型链？
14. 继承
15. 隐式转换有哪些步骤？
16. 手写一下new
17. 知道哪些排序方法？写出来

## 2. 常用的http状态有哪些？http头部有哪些？expires和max-age有什么区别？
200 301 304 40x 50x
200请求成功/301永久移动/304未修改，请求本地资源/40x请求有误/50x服务器异常

http请求头：
useAgent
cookie
content-type
origin
accept
host
max-age
expires
If-None-Match
If-Modified-Since
http响应头：
Access-Controls-Allow-Origin
Access-Controls-Allow-Header
Access-Controls-Allow-Methods
Content-type
date
cache-controls
expires
etag
Last-modified
keep-alive
set-cookie
max-age

expires和max-age的区别：
1. expires过期时间是最后访问时间和修改时间
2. max-age是从请求时间 

## 3. 写一个函数把字符串逆转（例如输入'abcd'，输出'dcba'）
```javascript
function reverse(str){
  return str.split('').reverse().join('')
}
```

## 7. 什么是跨域？如何解决跨域问题？
协议、域名、端口号不同而产生跨域。
proxy
postMessage
websocket
Access-Controls-Allow-origin

## 8. 用多种方法实现div水平垂直居中，justify-content是沿着什么轴？
1. display:flex;justify-content:center;align-items:center;
2. display:flex 配合 margin:auto;
3. position:fixed or absolute;top:50%;left:50%;transform:translate(-50%,-50%); //注意：如果使用translate得输入两个参数，否则只有X轴有移动
4. margin:0 auto; margin-top:50%;transform:translateY(-50%);
5. display:grid 配合 place-content:center(place-content是align-items和justify-content的合体)

## 9. 用JS编写函数从下面的URL串中解析出所有的参数：
```javascript
var url = 'http://www.21fid.com/?user=fidnner&id=456&city=shenzhen';
function getQuery(url){
  let query = url.split('?')[1].split('&');
  return query.reduce((prev,cur)=>{
    prev[cur.split('=')[0]] = cur.split('=')[1];
    return prev;
  },{})
}
```

## 10. https和http有什么区别？了解http2吗？http2增加了哪些内容？tcp的三次握手传递了啥？为什么要第三次握手？
1. http是超文本传输协议，信息是明文传输；https具有安全性的ssl加密协议
2. http和https的端口不同，前用80后用443
3. http连接是简单无状态的；https是ssl加https的加密传输

1. 减少头部的体积；
2. 添加请求优先级；
3. 服务器推送；
4. 多路复用。

## 12. 了解apply和call吗？他们区别是啥？写一下call
```javascript
// demo
let Person = {
  name: 'Tom',
  say(keys,num) {
    console.log(this)
    console.log(`我叫${this.name},${keys},${num}`)
  }
}

// 先看代码执行效果
Person.say('你好！',111) //我叫Tom 
Person1 = {
  name: 'Tom1'
}

//手写call
Function.prototype.MyCall = function (context) {
  // 如果没有传或者值为空，则指向window
  context = context || window;
  // 新建属性用于赋值对应方法
  let fn = Symbol(context);
  context[fn] = this;
  // arguments的第一个是对象内部的属性
  let args = [...arguments].slice(1);
  //在定义好的作用域中执行函数
  context[fn](...args);
  // 执行结束，删除方法
  delete context[fn];
}
Person.say.MyCall(Person1, '你好！', 1) //我叫Tom1


// 实现apply
Function.prototype.MyApply = function (context) {
  // 如果没有传或者值为空，则指向window
  context = context || window;
  // 新建属性用于赋值对应方法
  let fn = Symbol(context);
  // arguments的第一个是对象内部的属性
  context[fn] = this;
  //此处为解析第二参数，因为arguments是[context,['你好！',1]]
  // let args = [...arguments].slice(1); // [['你好！',1]] // no ok
  let args = [...arguments].slice(1)[0]; // ['你好！',1]
  //在定义好的作用域中执行函数
  context[fn](...args);
  // 执行结束，删除方法
  delete context[fn];
}
Person.say.MyApply(Person1, ['你好！', 1]) //我叫Tom1
```

## 14. 继承
```javascript
//TODO:finish it 
// 原型链有两个问题：
// 1. 原型链中包含引用类型值的原型时，该引用类型值会被所有实例共享；
// 2. 子类型不能向超类型的构造函数传递参数；

// 使用构造函数，解决以上问题：
function Fa(){
  this.colors = ["red","blue","green"];
}
function Son(){
  Fa.call(this);
}
let instance1 = new Son();
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
let instance2 = new Son();
console.log(instance2.colors);//"red,blue,green"

// 但是使用构造函数的话，超类型的方法，子类型不可见，所以构造函数的方法是少用的。

// 组合继承：

```

## 15. 隐式转换有哪些步骤？
问题问的就是隐式转换得规则：

比较运算x==y，其中x和y是值，产生true或false
比较步骤：
1. 先获取typeof x 和 typeof y
2. 如果类型相同，则开始判断：
  2.1. 如果type是undefined，则为true
  2.2. 如果type是null，则为true
  2.3. 如果type是number，则：
    2.3.1. 若x或者y为NaN，则为false（NaN为infinite的数值）
    2.3.2. 如果x和y值相等，则为true
    2.3.3. 如果x=-1,y=+1或者x=+1,y=-1，则为true
    2.3.4. 否则x和y值不等，则为false
  2.4. 如果type是string，则当x和y完全相同才返回true，否则false
  2.5. 如果x=undefined,y=null或x=null,y=undefined，则返回true
  2.6. 如果x和y有一方是string另一方是number，则将string那方转换Number为数字，在判断
  2.7. 如果x和y有一方是boolean另一方是number，则将boolean那方转换Number为数字，在判断
  2.8. 如果两方是boolean，则直接比较
  2.9. 如果x和y一方是string或number，另外一方是object、array或者function，则将是object、array或者function得另一方使用toString
  如果一方是number，则另一方还需要number一下再对比。
  注意:
  object.toString()="[ object Object ]"
  array.toString()为数组内值，([]).toString()='',([1,2,3]).toString()='1,2,3'
  function.toString()则直接把方法变为字符串，(function(){}).toString()='function(){}'
  
  