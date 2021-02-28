// 节流
function throttle(fn, times, immediate) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    console.log(context);
    console.log(arguments);
    if (immediate) {
      fn.apply(context, args)
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(context, args);
          timer = null;
        }, 1000)
      }
    }
  }
}
function conA(a) {
  console.log('con：' + a);
}
var useThrottle = throttle(conA, 1000, false)

// 防抖
function debounce(fn, times, immediate) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (immediate) {
      fn.apply(context, args);
    } else {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, 1000);
    }
  }
}
function conValue(context) {
  console.log(context);
  console.log(context.value);
}
var useDebounce = debounce(conValue, 1000, false);

// 打乱数组
function toRandom(arr) {
  return arr.reduce((prev, cur) => {
    if (Math.random() > 0.5) {
      prev.push(cur);
      return prev
    } else {
      prev.unshift(cur);
      return prev
    }
  }, []);
}

var date = ['2013-08-09', '2014-05-01', '2012-11-22', '2013-08-09'];
// 冒泡排序
function dateSort(date) {
  let len = date.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (date[i] > date[j]) {
        let exp = date[j];
        date[j] = date[i];
        date[i] = exp;
        exp = null;
      }
    }
  }
  return date
}

// 反转字符串
function reverse(str) {
  return str.split('').reverse().join('')
}

// 用JS编写函数从下面的URL串中解析出所有的参数：
var url = 'http://www.21fid.com/?user=fidnner&id=456&city=shenzhen';
function getQuery(url) {
  let query = url.split('?')[1].split('&');
  return query.reduce((prev, cur) => {
    prev[cur.split('=')[0]] = cur.split('=')[1];
    return prev;
  }, {})
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


// 实现bind
Function.prototype.MyBind = function (context) {

  let self = this;
  let args = [...arguments].slice(1);
  return function () {
    let newArg = [...arguments];
    console.log(this, context, args, newArg,args.concat(newArg))
    return self.apply(context, args.concat(newArg));
  }
}
let fn = Person.say.MyBind(Person1);
fn();
fn('你好', 1);
// fn('你好')(1);


// 利用构造函数，解决原型链问题
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


//函数传参的问题：到底是值传递还是引用传递？
// 答：都是值传递，如果是基础类型就直接传值，如果是引用类型就传内存地址（如果是传递引用对象，这才叫引用传递）；

var obj1 = {a:1}
var obj2 = {a:2}

function change(obj){
  obj.a = 3;
  obj = new Object();
  obj.a = 4;
  return obj;
}

obj3 = change(obj1)
console.log('[ obj1 ]', obj1)
console.log('[ obj2 ]', obj2)
console.log('[ obj3 ]', obj3)

// 如果obj1为{a:4的话，表明change的形参obj = 实参obj1，这叫引用传递，
// 如果obj1为{a:3的话，表明change的形参obj 复制了 实参obj1，这叫值传递，传递的是obj1的内存地址；