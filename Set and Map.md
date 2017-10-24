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
- WeakSet 中的对象都是弱引用。


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

