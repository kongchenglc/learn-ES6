# 模块（Module）语法

## CommonJS、AMD、Model区别与联系
这些都是模块加载的方案。
- `CommonJS`用于服务器，`node.js`的模块系统就是`CommonJS`的实现。（require的代码在硬盘）
- `AMD`用于浏览器，由于浏览器端`require`的模块同步加载会阻塞后边的代码，诞生了异步加载的`AMD`规范。（require的代码在服务器）
- `CMD`类似于`AMD`，但是对于依赖的模块是尽可能延迟执行，`AMD`是尽可能早的执行。
- `Model`将成为通用的解决方案。

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
* as ...