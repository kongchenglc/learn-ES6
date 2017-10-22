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

