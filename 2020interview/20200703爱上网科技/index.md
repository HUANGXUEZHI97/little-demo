# 问题统计：
1. vue的生命周期
2. 网络攻防XDD/CSRF
3. 有哪些优化性能的方法？
4. 对react有了解多少？


（面试官：应该是后端开发，问题比较简单）

```javascript
  function pipe(...fns){
    if(fns.length === 0){
      return val
    }
    if(fns.length === 1){
      return fns[0](val)
    }
    return fns.reduce((a,b)=>val=>b(a(val)))
  }
```