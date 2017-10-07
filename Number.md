# 数值的扩展

## 二进制和八进制表示法
`ES6` 提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。

```javascript
0b111110111 === 503 // true
0o767 === 503 // true
```

## Number.isFinite(), Number.isNaN()
`ES6` 提供了判断一个数值是否为有限的方法。  
以及检查一个数是否为`NaN`。

## Number.parseInt(), Number.parseFloat()
`ES6` 将全局方法`parseInt()`和`parseFloat()`，移植到`Number`对象上面，行为完全保持不变。

```javascript
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```
这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

## Number.isInteger()
`Number.isInteger()`用来判断一个值是否为整数。需要注意的是，在 `JavaScript` 内部，整数和浮点数是同样的储存方法，所以`3`和`3.0`被视为同一个值。

## Number.EPSILON
用于最小误差范围。  
`ES6` 在`Number`对象上面，新增一个极小的常量`Number.EPSILON``。根据规格，它表示`1`与大于`1`的最小浮点数之间的差。
对于`64`位浮点数来说，大于`1`的最小浮点数相当于二进制的`1.00..001`，小数点后面有连续`51`个零。这个值减去`1`之后，就等于`2`的`-52`次方。
```javascript
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
```
上面的代码为浮点数运算，部署了一个误差检查函数。

## Math对象的扩展

### Math.trunc()
`Math.trunc`方法用于去除一个数的小数部分，返回整数部分。  

对于没有部署这个方法的环境，可以用下面的代码模拟。
```javascript
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};
```

### Math.sign()
`Math.sign`方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。  

它会返回五种值。  
参数为正数，返回+1；  
参数为负数，返回-1；  
参数为0，返回0；  
参数为-0，返回-0;  
其他值，返回NaN。  

### ...