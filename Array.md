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
