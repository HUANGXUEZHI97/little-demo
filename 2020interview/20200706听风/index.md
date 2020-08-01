# 问题统计：

1. TCP和UDP的区别
2. 网络七层协议
3. vue的router的两种传值方式
4. vue中父组件可以监听子组件的生命周期吗？

（面试官：公司老板、技术（可能是后端））

问的问题很浅


## vue中父组件可以监听子组件的生命周期吗？

可以

方法一：使用$on和$emit
```javascript
// dad:
<Child  @mounted="doSomething"/>

// son:
mounted(){
  this.$emit("mounted")
}
```

方法二：（这方法在vue源码中可以知道）
```javascript
// vue hook:
<Child  @hook:mounted="doSomething2"/>

// son:
mounted(){
  // do something1
}

//顺序
do something1
do Something2
```

## 讲讲网络七层协议√√√√√

协议从底往上：
1. 物理层
2. 数据链路层
3. 网络层
4. 传输层
5. 会话层
6. 表示层
7. 应用层

## 为什么TCP有三次握手和四次挥手，为啥挥手多一次？

三次握手让双方都确定关系：
1. 服务器-->客户端（我要发信息了）
2. 客户端-->服务器-（我收到信息了）
3. 服务器-->客户端（我知道你收到信息了）

** 为了防止服务器开启一些无用的连接增加服务器开销以及防止以失效的连接请求报文又传输回服务端 **

四次挥手等传输完成双方断开关系：
1. 服务器-->客户端（我准备断开连接了）
2. 客户端-->服务器-（等一会儿，我还没接受完数据）
3. 客户端-->服务器-（OK，我接受了所有数据了，可以断开了）
3. 服务器-->客户端（好，拜拜）

为啥连接是三次握手，断开却是四次？

因为连接时客户端不需要任何准备即可接收（SYN和ACK报文）；
断开时要等全部数据接收完（服务器先返回ACK确认收到报文）才可断开（返回FIN释放连接报文）；


## 防抖与节流 ##

    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    
    <body>
      <input type="text" name="" id="" oninput="handle1(111)">
      <input type="text" name="" id="" oninput="handle2(111)">
      <script>
    // 原理：闭包 每次调用throttle和debounce的时候
    // 内部function仍然可以访问到上一次的timer是否存在
    // throttle节流每过一秒执行函数并清空timer，一秒之后又可以继续执行函数
    // debounce防抖每过一秒执行函数但不会清空timer，如果时间到了没有继续执行该函数就会清空timer，否则又重新延时

    // 函数防抖：用户输入校验
    // 将若干函数调用合成为一次

    // 函数截流：页面滚动和resize
    // 当达到了一定的时间间隔就会执行一次


    // 两者区别：截流是每隔一段时间执行一次，防抖是只执行一次，比如用户输入了5秒钟，如果wait都是1000，截流会执行5次，防抖只会执行一次

    function throttle(fn, wait, immediate) {
      let timer = null;
      return function () {
        let context = this
        let args = arguments
        if (immediate) {
          fn.apply(context, args)
        } else {
          if (!timer) {
            timer = setTimeout(() => {
              fn.apply(context, args)
              timer = null
            }, wait);
          }
        }
      }
    }
    function debounce(fn, wait, immediate) {
      let timer = null;
      return function () {
        let context = this
        let args = arguments
        if (immediate) {
          fn.apply(context, args)
        } else {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            fn.apply(context, args)
          }, wait);
        }
      }
    }
    let handle1 = throttle(checkVal, 1000, false)
    let handle2 = debounce(checkVal, 1000, false)
    function checkVal() {
      console.log('sss')
      console.log(arguments)
    }
      </script>
    </body>
    
    </html>


