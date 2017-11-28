# Promise对象

## Promise解决了什么问题
- 传统异步回调函数的不确定性会产生**竞态条件**。（两个回调执行时间的不确定性，比如返回结果入栈操作就会产生竞态的bug）  
- 一个函数的回调有些情况下是异步，**有些情况同步执行**，会使得代码难以理解。（比如一个请求的缓存如果命中将会以同步执行，如果这种回调在关键步骤之前执行，将会出现调用过早的现象）  
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

## Promise的具体用法

Promise对象代表一个异步操作，有3种状态：
- Pending：进行中。
- Resolved(fulfilled)：已完成。
- Rejected：已失败。

其状态的改变只会有两种情况：  
1. 从pending变为Resolved。
2. 从pending变为rejected。

### catch和then的链式操作
`catch`返回的`Promise`一直是成功状态的 `{[[PromiseStatus]]: "resolved", [[PromiseValue]]: "error"}`。  
`catch`返回的`Promise`和上一个`Promise`状态相同。
```javascript
let errorMessage = "It's error";
const promise = new Promise(
    (resolve, reject)=> {
        setTimeout(reject, 3000, errorMessage);
    }
);

//Promise的链式操作
let result = promise
    .catch( a => console.log("catch" + a) );

console.log(result);
```

### Promise的一些方法

#### all方法
其参数不一定要是数组，只要具有遍历器接口且每项都是`Promise`实例。  
 - 返回的`Promise`对象状态由数组所有的项决定，全部项的状态变为`resolve`才会返回状态为`resolved`的`Promise`对象。`PromiseValue`的值为所有项的返回值组成的数组。
 - 有一项被`reject`，就会返回`rejectd`的`Promise`对象，`PromiseValue`的值为那个被拒绝的对象的返回值。
```javascript
let p1 = new Promise((resolve, reject) => {
	resolve("1resolved");
});
let p2 = new Promise((resolve, reject) => {
	reject("2resolved");
});
let p3 = new Promise((resolve, reject) => {
	resolve("3resolved");
});

var p = Promise.all([p1, p2, p3]);
console.log(p);
```

#### race方法
谁先返回谁决定`Promise`状态
```javascript
const p = Promise.race([
    new Promise(function (resolve, reject) {
    setTimeout(() => resolve('request resolved'), 3000)
    }),
    new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 4000)
    })
]);
p.catch(error => {
    console.log(error);
    return "error";
})
.then(response => console.log(response)) 

console.log(p);
```

#### Promise.reject和Promise.resolve
创建一个状态确定的`Promise`对象。