# 对象的扩展

## 属性的简洁表示法
`ES6`允许直接写入变量和函数，属性名为变量名, 属性值为变量的值。
```javascript
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}
// 等同于
const baz = {foo: foo};

const o = {
  method() {
    return "Hello!";
  }
};
// 等同于
const o = {
  method: function() {
    return "Hello!";
  }
};
```
这种写法用来返回一组变量非常方便。  
**注意**：简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果。
```javascript
const obj = {
  class () {}
};
// 等同于
var obj = {
  'class': function() {}
};
```
上面代码中，`class`是字符串，所以不会因为它属于关键字，而导致语法解析报错。


## 属性名表达式
在使用字面量定义对象时，可以将表达式放在方括号里表示变量。  
表达式还可以用来定义方法名。
```javascript
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123,
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.foo;
obj.abc;
obj.hello();
```
属性名表达式与简洁表示法，**不能同时使用**，会报错。
```javascript
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```
**注意**：属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`。
```javascript
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}
```
以上代码最后只会留下一个`[object Object]`属性。


## 方法的name属性
`bind`方法创造的函数，`name`属性返回`bound`加上原函数的名字；  
`Function`构造函数创造的函数，`name`属性返回`anonymous`。
```javascript
(new Function()).name // 构造函数创建的函数返回"anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // 绑定的函数返回"bound doSomething"
```

如果对象的方法是一个 `Symbol` 值，那么`name`属性返回的是这个 `Symbol` 值的描述。
```javascript
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```
上面代码中，`key1`对应的 `Symbol` 值有描述，`key2`没有。

## Object.is
与`===`不同之处只有以下两个：
```javascript
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

## Object.assign()
用于合并对象，将第二个及之后的参数的可枚举属性复制到第一个参数对象上。  
目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。  
```javascript
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
`Object.assign`拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（`enumerable: false`）。  
`Object.assign`方法实行的是**浅拷贝**，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

### 数组的处理

`Object.assign`可以用来处理数组，但是会把数组视为对象。
```javascript
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```
上面代码中，`Object.assign`把数组视为属性名为0、1、2的对象，因此源数组的0号属性4覆盖了目标数组的0号属性1。

### 为对象添加属性
```javascript
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```

### 为对象添加方法
```javascript
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```


##属性的可枚举性
尽量不要用`for...in`循环，而用`Object.keys()`代替。  
目前有四个操作会忽略`enumerable`为`false`的属性。  
- `for...in`循环：只遍历对象自身的和继承的可枚举的属性。
- `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
- `JSON.stringify()`：只串行化对象自身的可枚举的属性。
- `Object.assign()`： 忽略`enumerable`为`false`的属性，只拷贝对象自身的可枚举的属性。
