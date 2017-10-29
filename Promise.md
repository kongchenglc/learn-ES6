# Promise对象
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

