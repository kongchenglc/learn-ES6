# 数组的扩展

## 扩展运算符
一般用来将一个数组转为参数序列。  

扩展运算符后还可以放置表达式。
```javascript
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];
```

### 替代数组apply方法
`ES5`的时候利用`apply`的传入参数可以是数组的特点，用来给`max`方法传参，有了扩展运算符之后就可以直接使用。
```javascript
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])
```

### 搭配push使用拼接两个数组
```javascript
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);
```

### 扩展运算符的应用
#### 复制数组
`ES5`复制数组
```javascript
const a1 = [1, 2];
const a2 = a1.concat();
```
`ES6`提供了简便写法
```javascript
const a1 = [1, 2];
const a2 = [...a1];
const [...a2] = a1;
```
#### 合并数组
```javascript
[...arr1, ...arr2, ...arr3]
```

#### 与解构赋值结合
```javascript
[a, ...rest] = list
```

#### 注意放到最后
如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
```javascript
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

#### 实现了 Iterator 接口的对象都可以使用
将具有`Iterator`接口的类数组转为数组
```javascript
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
```
没有`Iterator`接口的对象使用扩展运算符会报错。

#### Map, Set 和 Generator
```javascript
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
let arr = [...map.keys()];  // [1, 2, 3]
let arr = [...map];         // [[1, "one"], [2, "two"], [3, "three"]]
```
`Generator`函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
```javascript
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};
[...go()] // [1, 2, 3]
```


## Array.from()
常见的类似数组的对象是`DOM`操作返回的`NodeList`集合，以及函数内部的`arguments`对象。`Array.from`都可以将它们转为真正的数组。  
任何有`length`属性的对象，都可以通过`Array.from`方法转为数组，而此时扩展运算符就无法转换。
```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

### 第二个参数
这个方法还可以接受第二个参数，类似于`map`，将每个元素处理之后再返回。
```javascript
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

下面的例子是取出一组DOM节点的文本内容。
```javascript
let spans = document.querySelectorAll('span.name');
// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);
// Array.from()
let names2 = Array.from(spans, s => s.textContent)
```

### 其他的用法
`Array.from()`的另一个应用是：将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免`JavaScript`将大于`\uFFFF`的`Unicode`字符，算作两个字符的`bug`。*这一功能类似与扩展运算符*。
```javascript
function countSymbols(string) {
  return Array.from(string).length;
}
```


## Array.of()
`Array.of`基本上可以用来替代`Array()`或`new Array()`，并且不存在由于参数不同而导致的重载。它的行为非常统一。
```javascript
Array() // []
//一个参数时会认为是设置数组长度
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```


## copyWithin()
会改变原数组

## find() 和 findIndex()
`find`找出一个回调函数返回为`true`的成员。未找到返回`undefined`。
回调函数的三个参数分别为：当前的值，当前下标，数组本身。
```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```
`findIndex`和`find`类似，返回的是下标。未找到返回`-1`。

## fill()
该方法用第一个参数填充数组，覆盖原来的值。第二个参数是覆盖开始位置，第三个参数是覆盖结束位置。
```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

## entries(), keys(), values()
遍历数组的键、值、键值对：
```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

## includes
和`indexOf`类似，但是不会对`NaN`误判，返回布尔值。
```javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

## 数组的空位
空位不是`undefined`，可以用`in`来说明这一点。
ps: `in`用来判断一个对象是否有一个属性，返回布尔值。
```javascript
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```
`ES5` 对空位处理可能会跳过，表现不一致。
`ES6` 则是明确将空位转为`undefined`。
尽量避免空位，使得处理变得统一。