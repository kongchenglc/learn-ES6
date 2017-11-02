# Promise对象

## Promise解决了什么问题
- 传统异步回调函数的不确定性会产生**竞态条件**。  
- 一个函数的回调有些情况下是异步，**有些情况同步执行**，会使得代码难以理解。
（比如一个请求的缓存如果命中将会以同步执行，如果这种回调在关键步骤之前执行，将会出现调用过早的现象）  
  ```javascript
  function result(data) {
      console.log(a);
  }
  var a = 0;
  ajax("url", result);
  a++;  //关键步骤
  ```
- 回调函数在第三方的控制下的**信任问题**。  
- 嵌套和缩进只是一些细枝末节  


而`Promise`使得：
- 链式调用的流程控制
- 规范化回调（永远看做是异步，不会出现调用过早的问题）
- 解决信任危机
- 等



Promise对象代表一个异步操作，有3种状态：
- Pending：进行中。
- Resolved(fulfilled)：已完成。
- Rejected：已失败。
其状态的改变只会有两种情况：
1. 从pending变为Resolved。
2. 从pending变为rejected。

```javascript
let errorMessage = "It's error";
const promise = new Promise(
    (resolve, reject)=> {
        setTimeout(reject(errorMessage), 3000);
    }
);

//Promise的链式操作
let result = promise
    .catch( a => console.log(a) )
    .then( a => console.log("resolve " + a) );

console.log(result);
```


Promise 的默认返回 {[[PromiseStatus]]: "resolved", [[PromiseValue]]: "error"}


race
```javascript
const p = Promise.race([
    new Promise(function (resolve, reject) {
    setTimeout(() => resolve('request resolved'), 3000)
    }),
    new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 2000)
    })
]);
const newPro = p
.catch(error => {
    console.log(error);
    return "error";
})
// .then(response => console.log(response))

console.log(newPro);
```

