# 字符串扩展

## 1. 新增includes(), startsWith(), endsWith()
传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。

**includes()** ：返回布尔值，表示是否找到了参数字符串。  
**startsWith()** ：返回布尔值，表示参数字符串是否在原字符串的头部。  
**endsWith()** ：返回布尔值，表示参数字符串是否在原字符串的尾部。

```javascript
    let s = 'Hello world!';

    s.startsWith('Hello') // true
    s.endsWith('!') // true
    s.includes('o') // true
```
这三个方法都支持第二个参数，表示开始搜索的位置。
```javascript
    let s = 'Hello world!';

    s.startsWith('world', 6) // true
    s.endsWith('Hello', 5) // true
    s.includes('Hello', 6) // false
```
上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。


## 2. repeat()

`repeat`方法返回一个新字符串，表示将原字符串重复`n`次。

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

## 3. padStart() 和 padEnd()
`ES2017` 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全。

```javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

## 4. 模板字符串
就如它的名字一样，模板字符串输出`HTML`模板非常方便，不用再像传统的`JS`一样用加号拼接变量，在反引号中使用`${变量}`就可以了，如果其中的值不为变量，会调用`toString`方法。  

如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。  

```javascript
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack') // "Hello Jack!"
```