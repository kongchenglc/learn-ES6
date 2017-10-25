# Set 和 Map

## Set
`Set`的成员都是**唯一**的。  
通过`add`方法向`Set`结构添加成员，`Set`可以接收一个数组（或者具有 iterable 接口的其他数据结构）来初始化。  
**注意**：  
- `add`方法只接收一个参数。
- 在 `Set` 内部，两个`NaN`是相等的。
- 两个对象总是不相等的。
```javascript
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5  返回Set实例的成员总数
```

数组去重的新方法：
```javascript
//1
[...new Set(array)]

//2
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

### Set的操作方法
- add(value)：添加某个值，返回Set结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

### Set的遍历方法
- keys()：返回键名的遍历器，键和值相同。
- values()：返回键值的遍历器，键和值相同。
- entries()：返回键值对的遍历器，返回数组两项相同。
- forEach()：使用回调函数遍历每个成员，没有返回值。

**注意**：`Set`中键名和键值是同一个值，所以`keys`方法和`values`方法的行为完全一致。

#### 遍历的应用
扩展运算符内部使用`for...of`循环，所以也可以用于`Set`结构。  
数组的`map`和`filter`方法也可以用于 `Set` 。  
  
`Set`结构很容易实现`交集`、`并集`和`差集`。
```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```
在遍历操作中，同步改变原来的 `Set` 结构，目前没有直接的方法，但有两种变通方法。
```javascript
//转换为数组映射出新数组再转换
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));

//使用from方法
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val *2));
```

### WeakSet
类似于Set，有两个区别：
- WeakSet 的成员只能是对象，而不能是其他类型的值。
- WeakSet 中的对象都是**弱引用**。


## Map

`JS`的对象本质上是键值对的集合，但是只能用字符串当作键（所以`obj[]`才会转字符串）。  
在`ES6`中，如果要使用`键值对`的数据结构，`Map`比对象更合适。

```javascript
const m = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
const o = {p: 'Hello Map'};

m.set(o, 'content');
m.get(o);     //"content"

m.has(o);     //true
m.delete(o);  //true
m.has(o);     //false
```

`Map`构造函数的实现：
```javascript
const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);
```
所以说，具有遍历接口的、每个成员都是一个双元素的数组的结构都可以作为`Map`构造函数的参数。  
`Map` 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键，所以看起来一样的两个引用类型是不同的键。  
如果键是简单类型的，当两个键的值严格相等时，就认为是相同的键。  

### Map的操作方法
- size属性：返回成员总数。
- set方法：生成或替换成员（可以使用链式写法）。
- get方法：读取键对应的键值。
- has方法：返回布尔值，判断是否存在**键**。
- delete方法：用键来删除，返回布尔值。
- clear方法：清除所有成员，无返回值。

### Map的遍历方法
`Map`的遍历顺序就是插入顺序：
- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历 Map 的所有成员。

`Map` 结构的默认遍历器接口（`Symbol.iterator`属性），就是`entries`方法。
```javascript
// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
```
`Map`和对象、数组、`JSON`都可以相互转换。

### weakMap
`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。  
`WeakMap`的键名所指向的对象，不计入垃圾回收机制。当所指向的对象被删除，`WeakMap`的记录会被自动删除。