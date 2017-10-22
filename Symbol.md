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
