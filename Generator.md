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
```javascript
//封装一个fetch请求
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

//执行异步函数
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```