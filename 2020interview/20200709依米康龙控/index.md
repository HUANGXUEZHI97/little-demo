# 问题统计：
1. 说一下http协议？
2. tcp和udp？
3. 页面卡顿原因如何分析？
4. url从输入到页面渲染？
5. 页面优化？
6. css优先级？
7. 如何检查是否是内存泄漏？
8. get和post请求的区别？

## http协议

1. 请求方式：get，post，delete，put，options，head，connect，trace
2. 状态码：200，304，40x,50x。依次是成功，请客户端使用本地缓存，请求有误，服务器异常
3. 请求头：
  userAgent
  cookie
  origin
  max-age
  expires
  connection
  host
  If-None-Match
  cache-control
  content-type
  accept
  Referer
  If-Modified-Since
4. 响应头
  Access-Controls-Allow-Origin
  Access-Controls-Allow-Header
  Access-Controls-Allow-Methods
  Content-type
  date
  cache-controls
  max-age
  expires
  etag
  Set-cookie
  Keep-alive
  Server
  Last-Modified
5. 强缓存和协商缓存


## get和post请求的区别？

双方本质都是tcp/ip请求，但是get只有一个tcp数据包，post有两个

1)get请求的时候，直接headers和data一起发送
2)post请求的时候先发送headers，服务器响应100，浏览器再发送data，服务器响应200

题目：

```javascript
var obj = [
  {id:1,name:'dad'},
  {id:3,name:null},
  {id:2,name:'gg'}
];

实现一个函数，让上面的数组转为：
var o = {
  obj:{
    id:1,
    name:'dad',
    child:{
      id:2,
      name:'gg',
      child:{
        id:3,
        name:null
      }
    }
  }
}
答案:


function arrayList1(arr){
  if(!arr.length)return null
  const sortArr = arr.sort((a,b)=>{return a.id-b.id});
  const header = {id:sortArr[0].id,name:sortArr[0].name,child:null}
  let obj = header
  for(let i=1;i<sortArr.length;i++){
    if(i<sortArr.length-1){
      obj.child = {id:sortArr[i].id,name:sortArr[i].name,child:null};
      obj = obj.child
    }else{
      obj.child = {id:sortArr[i].id,name:sortArr[i].name}
      obj  = obj.child
    }
  }
  return header
}


function arrayList2(list){
  const hash = []
  for (let i = 0, len = list.length; i < len; ++i) {
    hash[list[i].id] = {
      id: list[i].id,
      name: list[i].name
    }
  }
  const result = hash.reduceRight((prev, cur) => ({
    ...cur,
    child: {
      ...prev
    }
}))
}
```

