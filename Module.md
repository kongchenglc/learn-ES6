# 模块（Module）语法

## CommonJS、AMD、Model区别与联系
这些都是模块加载的方案。
- `CommonJS`用于服务器，`node.js`的模块系统就是`CommonJS`的实现。（require的代码在硬盘）
- `AMD`用于浏览器，由于浏览器端`require`的模块同步加载会阻塞后边的代码，诞生了异步加载的`AMD`规范。（require的代码在服务器）
- `CMD`类似于`AMD`，但是对于依赖的模块是尽可能延迟执行，`AMD`是尽可能早的执行。
- `Model`将成为通用的解决方案。

> `export`语句输出的接口，和其对应的值是动态绑定关系，可以取到模块内实时的值（动态只读引用）。 `CommonJS`模块输出的是值的缓存，不存在动态更新。

## export 命令
`export`用来指定对外部的接口。可以用来输出变量、函数和类。
输出必须按照下面的格式：
```javascript
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
//as用来重命名
```
上面规定了对外的接口`m`。其他脚本可以通过这个接口，取到值`1`。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。  
这样写会报错：
```javascript
// 报错 
export 1;

// 报错 
var m = 1; export m;
```
因为`export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。上面没有提供对外的接口。第一种写法直接输出`1`，第二种写法通过变量`m`，还是直接输出`1`。`1`只是一个值，不是接口。  
同样的，`function`和`class`的输出，也必须遵守这样的写法。

> `export`语句输出的接口，和其对应的值是动态绑定关系，可以取到模块内实时的值。 `CommonJS`模块输出的是值的缓存，不存在动态更新。

只要`export`命令在模块顶层就可以。如果出现在块级作用域中会报错。


## import 命令
一个文件`export`后，其他`JS`文件可以通过`import`命令加载这个模块。`import`命令具有提升效果，会提升到整个模块的头部，首先执行。  
```javascript
//as重命名
import { lastName as surname } from './profile';
console.log(surname);

//提升效果
foo();
import { foo } from 'my_module';
```

## 模块的整体加载
一个模块会把把所有输出值加载在同一个对象上，别的模块引入之后可以使用一个`*`表示这个对象。
```javascript
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```
一般的引入如下：
```javascript
// main.js

import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```
整体加载写法如下：
```javascript
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以**不允许运行时**改变。
```javascript
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

## export default命令
`export default`命令，为模块指定默认输出。在引入默认输出的时候不用写对应的接口名。
```javascript
//默认输出
// export-default.js
export default function() {
    console.log('foo');
}

//引入时不写大括号表示引入默认输出
// import-default.js
import customName from './export-default';      //customName可以任意命名
customName(); // 'foo'
```
从上边可以看出来，一个模块只能使用一次默认输出。默认输出和正常输出可以同时存在。接收时这样同时接收：
```javascript
// _是自定义默认输出
import _, { each, each as forEach } from 'lodash';
```
`export default a`的含义是将变量`a`的值赋给变量`default`。所以，下边最后一种写法会报错。
```javascript
// 正确
export var a = 1;

// 正确
export default 42;

// 报错
export 42;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```
它的原理其实是将输出的接口命名为`default`，输入时如果接口为`default`，就认为是默认输出。  
所以可以自行使用`as`进行接口的命名，使之成为默认输出：
```javascript
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

## export 与 import 复合写法
如果即要引入又要输出，可以用复合写法。
```javascript
//复合为一体
export { foo, bar } from 'my_module';

// 接口改名
export { foo as myFoo } from 'my_module';

//默认接口
export { default } from 'foo';

// 整体输出
export * from 'my_module';
```
**注意**：`export *`命令会忽略`circle`模块的`default`方法。


## 跨模块常量
如果有常量需要多个模块共享，可以用下面的写法：
```javascript
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```
如果要使用的常量非常多，可以建一个专门的`constants`目录，将各种常量写在不同的文件里面，保存在该目录下。


## 按需加载的提议：import()
为了兼容 Node 下 require ，有一个提议。  
import命令能够接受什么参数，import()函数就能接受什么参数，两者区别主要是后者为动态加载。  
不需要静态分析。  
import()返回一个 Promise 对象。

## Model 的加载实现

### 浏览器加载
由于脚本可能很大，造成浏览器假死，浏览器允许使用异步加载语法：
```javascript
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```
两种方法的区别在于：
- `defer`要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；
- `async`一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。

在加载模块的时候，要给`script`标签加入`type = "module"`属性，这样相当于开启了`defer`属性：
（然而真的用`type = "module"`的时候会报错）
```javascript
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```
这时模块会按照顺序依次执行，如果添加上`async`属性，就不会按照顺序执行了。  
需要注意的几点：
- 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
- 模块脚本自动采用严格模式，不管有没有声明use strict。
- 模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
- 模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
- 同一个模块如果加载多次，将只执行一次。

### Node 加载
#### ES6 模块加载 CommonJS 模块
Node 的import命令加载 CommonJS 模块，Node 会自动将module.exports属性，当作模块的默认输出，即等同于export default xxx。
#### CommonJS 模块加载 ES6 模块
使用 import() 。