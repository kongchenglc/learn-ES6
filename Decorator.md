# 修饰器
修饰器是一个对类进行处理的函数。在编译阶段执行。
## 类的修饰
给类添加静态属性。
```javascript
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
```
如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。
```javascript
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
```
通过修饰器对类的实例的原型属性进行操作
```javascript
function testable(target) {
  target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true
```

## 方法的修饰
方法的修饰器函数接收三个参数。  
1. `target`表示原型对象而不是类。
2. `name`表示修饰的方法的名字。
3. `descriptor`表示描述对象，描述对象用来描述被修饰的方法。

```javascript
class Math {
  @log              //方法的修饰器
  add(a, b) {
    return a + b;
  }
}
function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments);
    return oldValue.apply(null, arguments);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);
```

一个方法有多个修饰器时，先执行内层的修饰器。
```javascript
function dec(id){
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)         //得到修饰器
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

## 函数修饰器
函数不能使用修饰器，因为存在函数提升。