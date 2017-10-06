# 正则的扩展

## 构造函数的参数
`es5`的构造函数参数如果是正则不是字符串，不允许再出现第二个参数设置修饰符，`es6`的则会覆盖。
```javascript
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
// 等价于
var regex = new RegExp(/xyz/i);   //es5不允许再出现参数
```

## u修饰符的Unicode模式

## y修饰符表示粘连
所谓粘连，类似于`g`，不同之处在于匹配的第一个字符必须是剩余字符串的开头。
实际上，y修饰符号隐含了头部匹配的标志^。
可以用正则对象的`sticky`属性查看是否设置了`y`修饰符
```javascript
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]，剩余为'_aa_a'

r1.exec(s) // ["aa"]
r2.exec(s) // null      //由于上次匹配完之后第一个字符是`_`，所以匹配不到
```

## flags属性
ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。

```javascript
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'
```

## 后行断言
JavaScript 语言的正则表达式，只支持先行断言（lookahead）和先行否定断言（negative lookahead），不支持后行断言（lookbehind）和后行否定断言（negative lookbehind）。目前，有一个提案，引入后行断言

## 具名组匹配的提案
为括号匹配添加命名：`(?<命名>)`，可以搭配对象的结构赋值使用