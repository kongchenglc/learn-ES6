# Generator 函数

推荐`function* name()`这种写法。这还是一个遍历器对象生成函数。  
一个对象的`[Symbol.iterator]`属性就是遍历器对象生成函数，返回一个遍历器。  
而遍历器对象本身也具有`[Symbol.iterator]`方法，返回它自己。  

生成器函数调用时并**不会执行**里面的代码，而是返回一个遍历器对象。
在遍历器对象调用`next()`方法时才会执行代码。

## yield 语句
- 每个`yield`相当于一次返回。
- `yield`语句不能写在非生成器函数里，否则会报错。
- 如果`yield`语句要写在一个表达式里，要带括号。
- `yield`语句的值为`undefined`，或者由`next`方法设置**上一个**`yield`语句的值，其值与`yield`后的表达式**没有关系**。

## next 方法
`next`的参数可以在生成器函数代码执行的过程中**注入值**。
`next`参数的值指定的是上一个`yield`语句的值。所以第一个`next`的参数是没有用的，这个`next`是用来**启动遍历器对象**的。
```javascript
function* a(val = 0) {
  let d = (yield val);
  let e = (yield d) + d;
  return e;
}
let c = a(1);
console.log(c[Symbol.iterator]().next());       //{done: false, value: 1}   启动遍历器对象
console.log(c[Symbol.iterator]().next(3));      //{done: false, value: 3}
console.log(c[Symbol.iterator]().next(4));      //{done: true, value: 7}
```

## for...of方法
`for...of`用来遍历遍历器对象时，只要返回对象的`done`属性是`true`就不会再返回了。  
所以说生成器函数的`return`语句之后的内容不会在`for...of`时返回。
  
由于**解构赋值**、**扩展运算符（...）**、**Array.from**方法内部调用的都是遍历器接口，所以`Generator`函数的返回值可以作为这些方法的参数。  
不具有遍历器接口的原生对象可以用以下方法添加遍历器接口：
```javascript
function* objectEntries() {var g = function* () {
  while (true) {
    try {
      yield;
    } catch (e) {
console.log('内部捕获', e);

      if (e != 'a') throw e;
      console.log('内部捕获', e);
    }
  }
};

var i = g();
i.next();

try {
  throw new Error('a');
  throw new Error('b');
} catch (e) {
  console.log('外部捕获', e);
}
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
```

## Generator.prototype.throw()
遍历器对象都有一个`throw`方法，在函数外部抛出错误，在生成器内部捕获。  
全局的`throw`方法和遍历器对象方法是有区别的，全局的`throw`只能在函数体外用`catch`捕获。  
遍历器对象的`throw`方法，如果遍历器内部已经没有`catch`，也可以由外部的`catch`来捕获。  
`throw`方法被捕获以后，会附带执行下一条`yield`表达式。也就是说，会附带执行一次`next`方法。

## Generator.prototype.return()
结束遍历，之后`next`方法返回的`done`属性都为`true`。

## yield* 语句
`yield*`语句后面跟另一个生成器对象，将这个对象的遍历插入当前遍历。  
只要由遍历器接口的对象都可以跟在`yield*`语句后面。  
`yield*`语句的**返回值**可以由被代理的生成器函数的`return`语句返回。
```javascript
function* foo() {
  yield 'aa';
  yield 'ba';
  return "nnn";
}

function* bar() {
  let n = yield* foo();
  yield* ["a","b","c"];
  yield 'y';
  yield n;
}	
let c = bar();
console.log(c.next().value);
```
`yield`语句可以用来实现**数组扁平化**。  
同样的，还能用来遍历树结构。
```javascript
let arr = [1,2,1,[9,5,[2,7]],3,8,]
function* flat(arr) {
  for(let item of arr) {
    if(Array.isArray(item)) {
      yield* flat(item);
    } else {
      yield item;
    }
  }
}
for(let a of flat(arr)){
  console.log(a);
}
```

## Generator函数的this
`Generator`函数不能作为构造函数。但是返回的遍历器对象，继承自`Generator`的`prototype`。  
想在`Generator`函数内部为遍历器对象添加方法可以使用绑定`this`的方法，使`this`指向`Generator`的`prototype`。
再包装一层普通函数，就可以当作构造函数使用了。
```javascript
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

## 用生成器函数实现状态机
这种实现比使用一个变量保存状态更简洁，更安全（不会被篡改状态变量）。
```javascript
var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
```

## 用于异步任务的封装
可以将异步操作简洁的表示为类似于同步的写法。只是多一个`yield`。  
用协程来理解：在遇到异步操作之后把执行权移出`Generator`函数，外部的`promise`会在异步任务完成之后将控制权重新交回到`Generator`函数中。
```javascript
//封装一个fetch请求
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);    //将异步操作简洁表示
  console.log(result.bio);
}

//执行异步函数
var g = gen();
var result = g.next();
console.log(result);
//{ value: Promise { <pending> }, done: false }
result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```



## Generator函数的流程管理
可以自动接收和交还程序的控制权。可以基于**回调函数**，也可以基于**Promise对象**。  
1. Thunk（回调函数）。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
2. Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。

### 1 回调函数实现
#### 1.1 Thunk函数
本质是利用函数柯里化将回调函数（callback）抽离。当传入第一部分参数时不会执行，当传入回调函数时才执行。
```javascript
//一个Thunk函数转换器
var Thunk = function(fn) {
  return function() {                                     //返回fn对应的Thunk函数
    var args = Array.prototype.slice.call(arguments);     //将所有参数装在args数组
    return function(callback) {                           //Thunk函数执行后会返回一个接收callback的函数
      args.push(callback);                                //在得到所有参数之后再执行fn
      return fn.apply(this, args);
    } 
  }
}

//使用转换器转换fs.readFile函数
var readFileThunk = Thunk(fs.readFile);
readFileThun(fileA)(callback);    //Thunk函数的执行
```
用于生产环境的转换器，建议使用`Thunkify`模块。下面是使用`Thunkify`模块转换一个`Thunk`函数。  
```javascript
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};
```

#### 1.2 Thunk函数的自动流程管理
基于 `Thunk` 函数的 `Generator` 执行器，用来执行上边的`gen`函数:
```javascript
function run(fn) {
  var gen = fn();   //返回遍历器对象

  function next(err, data) {
    var result = gen.next(data);    
    //result的value是一个只接收回调函数的函数，接收到回调函数将开始执行异步任务。
    if(result.done) return;
    result.value(next);
  }

  next();
}
run(gen);
```
> &emsp;&emsp;自动执行的核心在于递归，在`Generator`函数中的`Thunk`函数被调用时将执行权释放，只接收回调函数的函数，执行器中的`result`接收到这个`Thunk`函数（result.value）。如果`done`属性不为真，传入回调函数`callback`执行异步任务，回调函数就是会执行下一个`yield`的`next`函数。  
&emsp;&emsp;`next`函数的第二个参数就是异步任务执行返回的结果，通过调用`gen.next(data)`，将控制权交还给`Generator`函数，并将`data`返回。



### 1 Promise对象实现
#### 1.1 包装异步任务到Promise对象
类似的，把`fs`模块的`readFile`方法包装成一个 `Promise` 对象。
```javascript
var fs = require('fs');
var readFile = function(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if(error) return rejcect(error);
      resolve(data);
    });
  });
}

var gen = function* (){
  var f1 = yield readFile('/ect/fstad');
  var f2 = yield readFile('/ect/shells');
}
```

#### 1.2 Promise对象的自动执行器
```javascript
function run(gen) {
  var g = gen();

  function next(data) {
    var result = g.next(data);
    if(result.done) return result.value;
    result.value.then(function(data) {
      next(data);
    })
  }

  next();
}
run(gen);
```



## co模块
`co` 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 `co` 的前提条件是，`Generator` 函数的yield命令后面，只能是 `Thunk` 函数或 `Promise` 对象。
```javascript
var co = require('co');
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});
```

### co 模块源码
  检查是否是`promise`或者`thunk`函数，然后进行相应操作
#### co 支持并发的异步操作
#### 处理Stream