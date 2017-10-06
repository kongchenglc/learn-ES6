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
```javascript
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]，剩余为'_aa_a'

r1.exec(s) // ["aa"]
r2.exec(s) // null      //由于上次匹配完之后第一个字符是`_`，所以匹配不到
```