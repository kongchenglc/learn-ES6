# async 函数
`async`函数属于`ES7`，是一个`Generator`函数的语法糖。  
`async`函数可以自动执行`Generator`函数。  
`async`函数的实现原理，就是将`Generator`函数和自动执行器，包装在一个函数里。  
```javascript
async function fn(args) {
    // ...
}

// 等同于

function fn(args) {
    //spawn函数是自动执行器
    return spawn(function* () {
    // ...
    });
}

//spawn函数的实现
function spawn(genF) {
    return new Promise((resolve, reject) => {
        let gen = genF();
        function step(nextF) {
            try {
                var next = nextF();
            } catch(e) {
                return reject(e);
            }
            if(next.done) {
                return resolve(next.value);
            }
            //使用Promise.resolve使其可以支持原始类型的值，保证返回一个Promise对象
            Promise.resolve(next.value)
            .then(v => step( () => gen.next(v) )  //调用后next.value作为结果返回
            , e => step( () => gen.throw(e) ));
        }
        //调用step进行递归执行gen
        step( () => gen.next(undefined) );
    });
}
```

与`co`模块使用的区别在于：
- `co`模块执行的`Generator`函数的`yield`语句后可以是`Promise`对象或者`Thunk`函数。
- `async`函数`await`后可以是`Promise`对象或者原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

```javascript
const fs = require('fs');
const co = require('co');

//将异步封装到Promise
const readFile  = function (fileName) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if(error) return reject(error);
            resolve(data);
        })
    });
};

//用生成器函数和co实现
const gen = function* (){
    const f1 = yield readFile('/ect/f1');
    const f2 = yield readFile('/ect/f2');
}
co(gen);        //返回一个Promise对象

//用async函数实现
const asyncReadFile = async function() {
    const f1 = await readFile('/ect/f1');
    const f2 = await readFile('/ect/f2');
}
let result = asyncReadFile();   //返回一个Promise对象
```

一个例子，指定多少毫秒后输出一个值。
```javascript
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

## async的错误处理机制
`async`函数的语法规则总体上比较简单，难点是错误处理机制。
### 返回Promise对象
`async`函数返回一个`Promise`对象。  
`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。  
`async`函数内部抛出错误，会导致返回的`Promise`对象变为`reject`状态。  
```javascript
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)   //被调用
)
// Error: 出错了
```
返回的`Promise`的状态，必须等到内部所有`await`命令后面的`Promise`对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。  
`await`命令后面的`Promise`对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到。
```javascript
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```