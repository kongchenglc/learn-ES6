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


## 属性的可枚举性
尽量不要用`for...in`循环，而用`Object.keys()`代替。因为`for...in`会遍历继承的属性，和其他的遍历有所区别。  
目前有四个操作会忽略`enumerable`为`false`的属性。  
- `for...in`循环：只遍历对象自身的和继承的可枚举的属性。
- `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
- `JSON.stringify()`：只串行化对象自身的可枚举的属性。
- `Object.assign()`： 忽略`enumerable`为`false`的属性，只拷贝对象自身的可枚举的属性。


### 属性的遍历
1. `for...in`  
遍历自身和继承的可枚举属性。  
2. `Object.keys(obj)`  
遍历自身的可枚举属性。  
3. `Object.getOwnPropertyNames(obj)`  
返回一个数组，返回所有自身的键名（包括不可枚举属性，不包含Symbol属性）。  
4. `Object.getOwnPropertySymbols(obj)`
返回一个数组，包含对象自身的所有`Symbol`属性。
5. `Reflect.ownKeys(obj)`  
返回一个数组，包含对象自身的所有键名（Symbol和不可枚举的都会包含）。  

以上的5种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。  
- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。


## Object.getOwnPropertyDescriptor
返回指定对象所有自身属性（非继承属性）的描述对象。
```javascript
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```


## 关于对象的原型

### __proto___

### Object.setPrototypeOf
用来设置一个对象的`prototype`对象，返回**参数本身**。
```javascript
const o = Object.setPrototypeOf(obj, proto);
//该方法等同于下面的函数。
function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```
如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果，参数不能转为对象时报错。  

### Object.getPrototypeOf
```javascript
function Rectangle() {
  // ...
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
```


## super关键字
与`this`类似，指向当前对象的原型对象。  
只能用在对象的方法之中，用在其他地方都会报错。  
```javascript
// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}

//正确
const obj = {
  foo() {
    return super.foo
  }
}
```


## Object.keys()，Object.values()，Object.entries()
都是返回数组，不含继承的，所有可遍历（enumerable）的。
- Object.entries
返回一个数组，成员是对象的所有键值对数组。类似于下边。
```javascript
[ ["foo", "bar"], ["baz", 42] ]
```