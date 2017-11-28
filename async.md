# async 函数
`async`函数属于`ES7`，是一个`Generator`函数的语法糖。  
`async`函数可以自动执行`Generator`函数。  
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
    const f1 = readFile('/ect/f1');
    const f2 = readFile('/ect/f2');
}
co(gen);        //返回一个Promise对象

//用async函数实现
const asyncReadFile = async function() {
    const f1 = await readFile('/ect/f1');
    const f2 = await readFile('/ect/f2');
}
let result = asyncReadFile();   //返回一个Promise对象
```