# 问题统计

1. 请简述下CSS选择器的权重与优先规则
2. promise和setTimeout的区别
3. 用css写一个三角形
4. JS有几种类型的值？存储位置在哪？null和undefined有什么不同
5. ['1','2','3'].map(parseInt)输出什么
6. 实现数组的随机排序，var arr = [1,2,3,4,5,6,7,8,9,10]
7. 请写出输出结果:
```javascript
// 1  2，2，2 我答对了
var a=b=c={};
a.val = 1;
b.val = 2;

alert(a.val);
alert(b.val);
alert(c.val);

// 2 undefined 我答对了
var x = 1;
(function(){
  alert(x);
  var x = 2;
  x++;
})()
```
8. 请介绍一下JS之事件节流和防抖，并手写一个节流或者防抖的函数
9. 现有格式为YYYY-MM-DD的日期数组:['2013-08-09','2014-05-01','2012-11-22','2013-08-09']，实现数组并按升序重新排列后输出结果
10. 什么是跨域，如何解决跨域问题（3钟以上）？
11. 什么是ajax，浏览器是怎样完成一次ajax请求并执行其回调函数？
12. 请写出react的组件生命周期函数名称，并说明发出异步请求应该在哪个函数内进行，为什么？
13.react内如何进行组件间的通信？


## 1. 请简述下CSS选择器的权重与优先规则
important>行内>id>内联>外联

## 2. promise和setTimeout的区别
promise 是微任务
setTimeout 是宏任务

## 3. 用css写一个三角形
```css
.up{
  width: 0;
  height:0;
  border:100px solid black;
  border-color:#fff #fff #000 #fff;
}
```

## 4. JS有几种类型的值？存储位置在哪？null和undefined有什么不同
JS六种布尔值为false：
1. ''
2. null
3. undefined
4. 0
5. false
6. NaN

null和undefined有什么不同：
1. 类型不一样：typeOf undefined = undefined;typeOf null = object
2. 转化值不一样:Number(undefined) = NaN; Number(null) = 0
3. undefined==null;//true；undefined===null;//false

## 6. 实现数组的随机排序，var arr = [1,2,3,4,5,6,7,8,9,10]
```javascript
function toRandom(arr){
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

注意：
1. Math.random()要加括号运行该函数
2. reduce每次都要把prev给return一下
```

## 8. 请介绍一下JS之事件节流和防抖，并手写一个节流或者防抖的函数
节流：一段时间内执行一次
```javascript
function throttle(fn,times,immediate){
  let timer = null;
  return function(){
    let context = this;
    let args = arguments;
    if(immediate){
      fn.apply(context,args)
    }else{
      if(!timer){
        timer = setTimeout(()=>{
          fn.apply(context,args);
          timer = null;
        },1000)
      }
    }
  }
}

function debounce(fn,times,immediate){
  let timer = null;
  return function(){
    let context = this;
    let args = arguments;
    if(immediate){
      fn.apply(context,args);
    }else{
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=>{
        fn.apply(context,args)
      },1000)
    }
  }
}
```

## 9. 现有格式为YYYY-MM-DD的日期数组:['2013-08-09','2014-05-01','2012-11-22','2013-08-09']，实现数组并按升序重新排列后输出结果
考验排序，随便一种即可，此处用冒泡
```javascript
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
```

## 10. 什么是跨域，如何解决跨域问题（3钟以上）？
因为被请求地址和原地址的协议、域名或者端口不同而产生跨域。
解决：
1. proxy
2. websocket
3. postMessage
4. Access-controls-allow-origin

## 11. 什么是ajax，浏览器是怎样完成一次ajax请求并执行其回调函数？
异步数据请求