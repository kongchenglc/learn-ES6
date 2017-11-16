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
`next`参数的值指定的是上一个`yield`语句的值。
```javascript
function* a(val = 0) {
  let d = (yield val);
  let e = (yield d) + d;
  return e;
}
let c = a(1);
console.log(c[Symbol.iterator]().next());       //{done: false, value: 1}
console.log(c[Symbol.iterator]().next(3));      //{done: false, value: 3}
console.log(c[Symbol.iterator]().next(4));      //{done: true, value: 7}
```

