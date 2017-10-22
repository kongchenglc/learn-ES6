# ES6学习笔记

## ES6编程风格

### [块级作用域](https://github.com/kongchenglc/learn-ES6/blob/master/let%20and%20const.js)
- `let`完全代替`var`，不使用`var`。
- `const`优先使用，编译器会对`const`进行优化，提升程序运行效率。

### [字符串]()
- 静态字符串使用单引号或反引号，不使用双引号。
- 动态字符串使用反引号，即模板字符串。

### [解构赋值](https://github.com/kongchenglc/learn-ES6/blob/master/Destructuring.js)
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
- 单行定义的对象，最后一个成员不以逗号结尾。  
- 多行定义的对象，最后一个成员以逗号结尾。  
```javascript
// bad
const a = { k1: v1, k2: v2, };
const b = {
  k1: v1,
  k2: v2
};

// good
const a = { k1: v1, k2: v2 };
const b = {
  k1: v1,
  k2: v2,
};
```

- 对象尽量静态化，一旦定义不要随意添加属性，实在要添加，使用`Object.assign`方法。
- 对象的属性和方法，最好使用简洁表达法，易于描述和书写。
- 对象的属性如果时动态的，使用属性表达式定义。
```javascript
// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```


### [数组]()
- 使用扩展运算符（…）深拷贝数组。
```javascript
const itemsCopy = [...items];
```
- 使用Array.from方法，将类似数组的对象转为数组。
```javascript
const foo = document.querySelectorAll('.foo');      //NodeList不具有数组的方法
const nodes = Array.from(foo);
```

### [函数]()
- 立即执行函数写成箭头函数形式。
```javascript
(() => {
  console.log('Welcome to the Internet.');
})();
```
- 不要在函数内使用`arguments`变量，使用拓展运算符代替，这可以显式表明你想要获取参数，而且取到的不会是一个类数组。
```javascript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```
- 使用默认值语法设置函数参数的默认值。
```javascript
// bad
function handleThings(opts) {
  opts = opts || {};
}

// good
function handleThings(opts = {}) {
  // ...
}
```