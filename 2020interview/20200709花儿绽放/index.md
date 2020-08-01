# 问题统计：

1. css渲染优先级？


## css渲染优先级？

important > 内联样式 > id > class > 外联

题目：
```javascript
  var a = 1
  var obj = {
    fn:function(){
      var a = 2
      return function(){
        a = 3
        window.a = 4
        console.log(this.a)
      }
    }
  }
  答案：4
```