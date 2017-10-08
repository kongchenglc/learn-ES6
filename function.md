# 函数的扩展

## 函数参数的默认值
参数默认值是惰性求值的。
```javascript
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```
上面代码中，参数p的默认值是`x + 1`。这时，每次调用函数`foo`，都会重新计算`x + 1`，而不是默认`p`等于 `100`。

### 可以配合解构赋值默认值使用

```javascript
function foo({x, y = 5}) {   //只用到了对象的结构赋值
  console.log(x, y);
}
foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // Error 不提供参数的时候报错

//提供函数的默认值来避免出错的情况
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5
```

### 触发默认值
如果传入undefined，将会触发该参数等于默认值，null则没有这个效果。
```javascript
function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null
```

### 函数的length属性
指定了默认值以后，函数的`length`属性，不包含指定了默认值的参数。以及后边的`rest`参数（扩展运算符），也不会计入`length`值。
```javascript
(function (a = 5) {}).length; // 0
(function (a, b, c = 5) {}).length; // 2
```
length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，后文的 rest 参数也不会计入length属性。  
如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。  
```javascript
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```

### 默认值的作用域
一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。