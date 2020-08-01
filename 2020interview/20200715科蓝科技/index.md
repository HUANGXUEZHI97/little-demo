# 问题统计

1. 项目遇到的难点？
2. 基础类型和引用类型有哪些？
3. symbol如何使用？
4. 基础类型和引用类型的不同？
5. 基础类型和引用类型分别保存在哪里？
6. 
```javascript
  var a = 10;
  var b = a;
  b = 20;
  console.log(a) // 10  因为是基本类型的引用，是值的引用
  var obj = { name : '张三'};
  var copy = obj;
  // question 1
  copy.name = '李四';
  // question 2
  function setName(obj){
    obj.name = '张麻子'
  }
```
6.1. 修改obj.name，copy的name会被改变吗？
6.2. 函数setName可以修改obj的name吗？为什么？
7. obj.name和obj['name']哪种比较快？为什么？
8. 如何使用css来设置变量，从而完成定义不同主题颜色的功能？
9. html5中有什么标签？
10. typeOf(null)等于什么？
11. 为什么typeOf(null)是object？
12. 如何检测类型是哪种类型？
13. 如何实现instanceOf？
14. 怎么判断对象是否是空对象？
15. 如何将'4'转换成数字？
16. vue的生命周期
17. vue的路由传参方式
18. 实现自定义组件，往组件上添加v-model，组件内部怎么接收？
19. 什么是继承链？
20. 如何实现继承？
21. 解释一下闭包？
22. 什么叫回调地狱？
23. 什么是浅拷贝和深拷贝？
24. 用什么方法来完成浅拷贝和深拷贝？
25. 0.1+0.2等不等于0.3？为什么，怎么处理
26.
```javascript
  var i = 1
  var a = i++ // 1
  var b = ++i // 3 (上面a那里也加了一次)
```

问题答案总结：


## 4.基础类型和引用类型的不同？ ##

> 同时回答问题5

基础类型：
1. 存放在栈中
2. 存储空间小
3. string,number,boolean,null,undefined,symbol

引用类型：
1. 存放在堆中
2. 因为引用值的大小会改变，所以不能放在栈中，降低速度
3. 存放的是指针，不是值
4. object,array,function,data,set,map

堆和栈的对比：

栈为自动分配的内存空间，它由系统自动释放；
堆则是动态分配的内存，大小不定也不会自动释放


## 6. ##
6.1  
copy的name会被改变，因为用的是同一个指针，引用的是同一个对象
6.2
可以修改obj的name，因为function传入的是对象的值，而不是对象本身


## 7. obj.name和obj['name']哪种比较快？为什么？ ##

这个问题问的太sb了，不知道msg怎么想的


## 8. 如何使用css来设置变量，从而完成定义不同主题颜色的功能？ ##

css设置变量：
用伪类在最顶层设置样式(--main-color)，然后用var获取样式：
:root{
  --main-color:black;
}
.one{
  background:var(--main-color)
}
.two{
  background:var(--main-color)
}

sass使用变量：

$color:red;
.one{
  background:$color;
}
.two{
  background:$color;
}


## 9. html5中有什么标签？ ##

canvas
svg
article
area
map
base
del
ins
progress
sub
sup
thead
tbody
tfoot
nav
等等


## 10. typeOf(null)等于什么？ ##

同时解决11问题

'object'

原型中typeof判断前三小位000则为object，刚好null是0000 0000
所以就成了object


## 12. 如何检测类型是哪种类型？ ##

1. typeof (typeof(obj))
2. instanceof (A instanceof B)
3. constructor A.constructor === object ? return true : return 
4. toString (Object.prototype.toString.call(2) // [object number])



## 13. 如何实现instanceOf？ ##

var newInstanceof = (obj, ctor) => {
   let objProto = obj.__proto__;
   while(objProto) {
      if (objProto === ctor.prototype) {
        return true;
      }
      objProto = objProto.__proto__;
   }
   return false;
}
newInstanceof(meat, Food) // true

判断obj的__proto__（或者obj.__proto__.__proto__,一直往上找）是否等于ctor.prototype如果等于return true


## 14. 怎么判断对象是否是空对象？ ##

1. 用JSON.stringify()转为JSON字符串然后判断是否为{}
2. for...in判断，如果进了循环则return true 否则false
3. jQuery的$.isEmptyObject方法
4. Object.getOwnPropertyName(obj)获得对象的key的数组，然后再判断长度
5. Object.keys再判断长度


## 15. 如何将'4'转换成数字？ ##

1. Number('4')
2. '4'/1除于自然数1
3. parseInt,parseFloat转换


## 18. 实现自定义组件，往组件上添加v-model，组件内部怎么接收？ ##

[https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model "自定义组件上的v-model")

父组件：
<b v-model="lovingVue"/>

子组件:
Vue.component('b',{
  model:{
    prop:'checked',
	event:'change'
  },
  props:{
    checked:Boolean
  },
  template:`
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change',$event.target.checked)"
  `
})

这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 <base-checkbox> 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的 property 将会被更新。


## 19. 什么是继承链？ ##

基本思想就是：利用原型让一个引用类型继承另一个引用类型的属性和方法


## 20. 如何实现继承？ ##

使用prototype


## 21. 解释一下闭包？ ##

只要在某个内部作用域内使访问在当前作用域外定义的变量，就会生成闭包


## 22. 什么叫回调地狱？ ##

回调：作为参数或选项传递给某个方法的普通js函数。它是一个函数，在另一个函数完成执行后执行，因此称为回调

回调地狱，多个回调层层叠加。

解决回调地狱：promise


## 23. 什么是浅拷贝和深拷贝？ ##

先明白：JS是不能改变基本类型的，实际上返回的是一个新的字符串值。
    var str = "abc";

    console.log(str[1]="f");    // f

    console.log(str);           // abc
基本数据类型值不可变！！！
引用类型是可以直接改变其值的！！！

基本数据类型的比较是值的比较
引用类型的比较是引用的比较


在了解了基本类型和引用类型的传参之后，就可以认识赋值、浅拷贝和深拷贝了

    var obj1 = {
        'name' : 'zhangsan',
        'age' :  '18',
        'language' : [1,[2,3],[4,5]],
    };

    var obj2 = obj1;


    var obj3 = shallowCopy(obj1);
    function shallowCopy(src) {
        var dst = {};
        for (var prop in src) {
            if (src.hasOwnProperty(prop)) {
                dst[prop] = src[prop];
            }
        }
        return dst;
    }

    obj2.name = "lisi";
    obj3.age = "20";

    obj2.language[1] = ["二","三"];
    obj3.language[2] = ["四","五"];

    console.log(obj1);  
    //obj1 = {
    //    'name' : 'lisi',
    //    'age' :  '18',
    //    'language' : [1,["二","三"],["四","五"]],
    //};

    console.log(obj2);
    //obj2 = {
    //    'name' : 'lisi',
    //    'age' :  '18',
    //    'language' : [1,["二","三"],["四","五"]],
    //};

    console.log(obj3);
    //obj3 = {
    //    'name' : 'zhangsan',
    //    'age' :  '20',
    //    'language' : [1,["二","三"],["四","五"]],
    //};


--      和原数据是否指向同一对象       第一层数据为基本数据类型         原数据中包含子对象

赋值              是                  改变会使原数据一同改变        改变会使原数据一同改变

浅拷贝            否                  改变不会使原数据一同改变       改变会使原数据一同改变

深拷贝            否                  改变不会使原数据一同改变      改变不会使原数据一同改变


那么如何进行深拷贝，如何浅拷贝呢？

```javascript
// 数组
var arr1 = [1,2,[3,4]];

// 浅拷贝：
// slice、concat、Array.from()
var arr2 = arr1.slice();


// 对象

var obj1 = {a:1,b:[1,2]}

//赋值：
var obj2 = obj2

//浅拷贝：
// Ojbect.assign()
var obj3 = Ojbect.assign({},obj1)

//解构赋值：
var obj4 = [...obj1]


// 自己实现深拷贝：
function deepCopy(obj,parent=null){
  // 创建一个新对象
  let result = {},
  keys = Ojbect(obj).keys,
  key = null,
  temp = null,
  _parent = parent;
  // 该字段有父级则需要追溯该字段的父级
  while(_parent){
    // 如果该字段引用了它的父级则为循环引用
    if(_parent.originalParent === obj){
	  // 循环引用直接返回同级的新对象
	  return _parent.currentParent;
    }
  }
  for(let i = 0;i < keys.length;i++){
    key = keys[i];
    temp = obj[key];
    // 如果字段的值也是一个对象
    if(temp && typeof temp === 'object'){
      // 递归执行深拷贝 将同级的待拷贝对象与新对象传递给 parent 方便追溯循环引用
      result[key] = deepCopy(temp,{
        originParent:obj,
        currentParent:result,
        parent:parent
      });
    }else{
      result[key] = temp
    }
  }
  return result;
}

jquery的$.extend和lodash的_.cloneDeep来解决深拷贝（对象和数组都可以）

```






## 25. 0.1+0.2等不等于0.3？为什么，怎么处理 ##


因为浮点数运算的精度问题。

判断是否相等：

function numberSequal(a,b){
  return Math.abs(a-b) < Number.EPSION
}

Number.EPSION是最小 2^-52次方

Math.abs是绝对值

解决：
```javascript
  var a = 0.1 + 0.2;
  a.toFixed(1)
```

