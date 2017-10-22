# Symbol
这是`JavaScript`语言的第七种数据类型，用来表示独一无二的值。  
`Symbol`函数前不能使用`new`命令。 
如果 `Symbol` 的参数是一个对象，就会调用该对象的`toString`方法，将其转为字符串，然后才生成一个 `Symbol` 值。  

## 唯一性
**Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。**
```javascript
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```


## 作为属性名
`Symbol` 值作为对象属性名时，不能用点运算符，**因为点运算符后面总是字符串**。  
在对象的内部，使用 `Symbol` 值定义属性时，`Symbol` 值必须放在方括号之中。  
```javascript
let s = Symbol();

let obj = {
  [s]: function (arg) { ... },
  [s](arg) { ... }      //或者
};

obj[s](123);
```
上面代码中，如果`s`不放在方括号中，该属性的键名就是字符串`s`，而不是`s`所代表的那个 `Symbol` 值。  


## 属性名的遍历
`Symbol` 作为属性名，一般的方法不会遍历这个属性。  
有一个`Object.getOwnPropertySymbols`方法，返回一个数组，成员是当前对象的所有用作属性名的 `Symbol` 值。  
还有`Reflect.ownKeys`方法可以返回所有类型的键名，包括常规键名和 `Symbol` 键名。  
```javascript
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

console.log(Object.keys(obj));          //["enum", "nonEnum"]
console.log(Reflect.ownKeys(obj));      //["enum", "nonEnum", [object Symbol] { ... }]
console.log(Object.getOwnPropertySymbols(obj));     //[[object Symbol] { ... }]
```
利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。


## Symbol.for()，Symbol.keyFor()
`Symbol()` 和 `Symbol.for()` 是两种不同的机制。  
`Symbol.for()`的`key`会被登记在全局变量，如果后边生成时有相同的`key`则返回同一个，不然新登记。
```javascript
let s1 = Symbol('foo');
let s2 = Symbol.for('foo');
let s3 = Symbol.for('foo');

console.log(s1 === s2);     //false
console.log(s2 === s3);     //true
```

`Symbol.keyFor()`返回登记过的 `Symbol` 类型值的`key`，也就是和`Symbol.for()`对应起来使用的。
```javascript
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

## 内置的Symbol值
有11个内置的 `Symbol` 值，支持一些语言自带的方法。