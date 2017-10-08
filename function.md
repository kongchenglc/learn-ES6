# 函数的扩展

## 函数参数的默认值
参数默认值是惰性求值的。
```javascript
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```
上面代码中，参数p的默认值是`x + 1`。这时，每次调用函数`foo`，都会重新计算`x + 1`，而不是默认`p`等于 `100`。

### 可以配合解构赋值默认值使用

```javascript
function foo({x, y = 5}) {   //只用到了对象的结构赋值
  console.log(x, y);
}
foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // Error 不提供参数的时候报错
```