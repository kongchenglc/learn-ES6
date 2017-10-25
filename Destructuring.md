# 变量的解构赋值
> 只要等号右边的值不是对象或数组，就先将其转为对象。  

## 数组解构赋值

解构赋值属于模式匹配，按照对应关系对变量赋值  

```javascript
    let [a, b, c] = [1, 2, 3];
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    let [x, ,y] = [1, 2, 3];
    let [head, ...tail] = [1, 2, 3, 4];
```

1. 解构不成功，变量值为undefined
```javascript
    let [x, y, ...z] = ['a'];
```

2. 不完全解构
```javascript
    let [x, y] = [1, 2, 3];
```

3. 报错的情况
```javascript
    //等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式）  
    //要么本身就不具备 Iterator 接口（最后一个表达式）。
    let [foo] = 1;
    let [foo] = false;
    let [foo] = NaN;
    let [foo] = undefined;
    let [foo] = null;
    let [foo] = {};
```

4. 具有Iterator接口的数据结构都可以使用解构赋值
```javascript
//set的解构也可以使用解构赋值
let [x, y, z] = new Set(['a', 'b', 'c']);

//生成器函数生成一个迭代器
    function* fibs() {
        let a = 0;
        let b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    let [first, second, third, fourth, fifth, sixth] = fibs();
    sixth // 5
```

5. 解构赋值允许默认值。
```javascript
    let [foo = true] = [];
    let [x, y = 'b'] = ['a'];
    let [x, y = 'b'] = ['a', undefined];

    //如果数组成员不严格等于undefined，默认值不会生效
    //null不严格等于undefined
    let [x = 1] = [undefined];      // 1
    let [x = 1] = [null];           // null

    //默认值可以是一个表达式，表达式是惰性求值，只有在用到的时候，才会求职，下边的代码不会调用f
    function f() {
        alert('调用了');
    }
    let [a = f()] = [1];

    //默认值可以引用解构赋值的其他变量，但变量必须以及声明
    //函数的参数是具有块级作用域的，默认参数也可以这样理解
    let [x = 1, y = x] = [];     // x=1; y=1
    let [x = 1, y = x] = [2];    // x=2; y=2
    let [x = 1, y = x] = [1, 2]; // x=1; y=2
    let [x = y, y = 1] = [];     // ReferenceError
```

## 对象的解构赋值
```javascript
    var { foo, bar } = { foo: "aaa"};
    var { bar, foo } = { foo: "aaa", bar:"bbb" };
```
对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```javascript
    let { y } = { y: 1 };
```
相当于下边这句，定义了一个变量y，可以在外边访问到y
```javascript
    let { y: y } = { y: 1 };
```
而这句只能在外边访问到a变量，不能访问y。
```javascript
    let { y: a } = { y: 1 };
```
此处f是变量，而first只是模式，按照模式来寻找如何赋值，被赋值的是变量
```javascript
    let obj = { first: 'hello', last: 'world' };
    let { first: f, last: l } = obj;
    f // 'hello'
    l // 'world'
```

如果要将一个已经声明的变量用于解构赋值，要小心
```javascript
    // 错误的写法，{x}引擎会将大括号开头的代码理解为代码块
    let x;
    { x } = { x: 1 };
    // 正确的写法
    let x;
    ({ x } = { x: 1 });
```
内置对象也可以进行解构赋值
```javascript
    let { log, sin, cos } = Math;
```

## 字符串的解构赋值
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```javascript
    const [a, b, c, d, e] = 'hello';
    a // "h"
    b // "e"
    c // "l"
    d // "l"
    e // "o"
```
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
```javascript
    let { length: len } = 'hello';
    len // 5
```


## 数字和布尔值会被转成对象然后解构
```javascript
    let { toString: s } = 123;
    s === Number.prototype.toString // true

    let { toString: s } = true;
    s === Boolean.prototype.toString // true
```

## 函数参数的解构赋值
```javascript
    [[1, 2], [3, 4]].map(([a, b]) => a + b);
    // 返回[ 3, 7 ]

    //不传入参数时使用默认值传入{}，再默认传入x=0，y=0
    function move({ x = 0, y = 0 } = {}) {
        return [x, y];
    }
    console.log(move({ x: 3, y: 8 })); // [3, 8]
    console.log(move({ x: 3 })); // [3, 0]
    console.log(move({})); // [0, 0]
    console.log(move()); // [0, 0]

    //undefined就会触发函数参数的默认值。
    [1, undefined, 3].map((x = 'yes') => x);
    // [ 1, 'yes', 3 ]
```


解构赋值中可以使用圆括号的情形只有一种   
**赋值语句**的**非模式部分**，可以使用圆括号。  
赋值语句：没有let或者别的来定义，不是声明语句  
```javascript
    [(b)] = [3]; // 正确
    ({ p: (d) } = {}); // p是模式，正确
    [(parseInt.prop)] = [3]; // 正确
```


## 解构赋值的用途
1. 交换变量的值
```javascript
    let x = 1;
    let y = 2;
    [x, y] = [y, x];
```

2. 从函数返回多个值
```javascript
//返回一个数组
    function example() {
        return [1, 2, 3];
    }
    let [a, b, c] = example();
    //返回一个对象
    function example() {
        return {
            foo: 1,
            bar: 2
        };
    }
    let { foo, bar } = example();
```
3. 函数参数的定义
将对象解构赋值用来对应一组参数和变量名  
参数是一组无次序的值  
```javascript
    function f({ x, y, z }) { ... }
    f({ z: 3, y: 2, x: 1 });
```

4. 提取JSON数据
```javascript
    let jsonData = {
        id: 42,
        status: "OK",
        data: [867, 5309]
    };

    let { id, status, data: number } = jsonData;
```
5. 函数参数的默认值
```javascript
    let a = 2;
    function fun(a, { b = 4 }) {
        console.log(a, b);
    }
    fun(a, { b: 5 });
```
避免了在函数体内部再写var foo = config.foo || 'default foo'; 这样的语句。

6. 遍历Map结构
```javascript
    //map结构每次迭代返回一个两项的数组[key,value]
    // 单独获取键名
    for (let [key] of map) {
        // ...
    }

    // 单独获取键值
    for (let [, value] of map) {
        // ...
    }
```
7. 输入模块的指定方法
```javascript
    const { SourceMapConsumer, SourceNode } = require("source-map");
```
