# ES6学习笔记

## ES6编程风格

### [块级作用域](https://github.com/kongchenglc/learn-ES6/blob/master/let%20and%20const.js)
- `let`完全代替`var`，不使用`var`。
- `const`优先使用，编译器会对`const`进行优化，提升程序运行效率。

### [字符串]()
- 静态字符串使用单引号或反引号，不使用双引号。
- 动态字符串使用反引号，即模板字符串。

### [解构赋值]()
- 使用数组成员对变量赋值时，优先使用结构赋值。
```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```
- 函数的参数如果是对象的成员，优先使用解构赋值。
```javascript
// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}

// best
function getFullName({ firstName, lastName }) {
}
```
- 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
```javascript
// good
// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// good
function processInput(input) {
  return { left, right, top, bottom };
}

const { left, right } = processInput(input);
```

### [对象]()

### [数组]()
- 使用扩展运算符（…）深拷贝数组。
```javascript
const itemsCopy = [...items];
```
- 使用Array.from方法，将类似数组的对象转为数组。
```javascript
const foo = document.querySelectorAll('.foo');      //不具有数组的方法
const nodes = Array.from(foo);
```

