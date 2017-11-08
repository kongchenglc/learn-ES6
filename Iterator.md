# Iterator（遍历器）

对象的预定义属性`[Symbol.iterator]`是一个函数，调用会返回一个遍历器对象。  
遍历器对象：如果**自行**编写遍历器对象生成函数，`next`方法是必须部署的。遍历器对象每次调用`next`方法返回下一个成员。  
`next`方法的返回值类似于：`{done: false, value: "a"}`或者`{done: true, value: undefined}`。其中`done: false`和`value: undefined`可省略。  

为对象添加一个`Iterator`:
```javascript
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (var i of obj){
  console.log(i); // "hello", "world"
}
```

## 对于对象的遍历

对于**类数组**的对象，部署遍历器接口直接使用数组的接口就可以：
```javascript
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

[...document.querySelectorAll('div')] // 可以执行了
```

普通的对象不能使用`for of`遍历。  
可以使用`for(value of Object.values(obj))`遍历对象。