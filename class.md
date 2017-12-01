# class
关键字是**小写**，大括号中的方法不用逗号分隔。

## ES5与ES6实现类的区别
### ES5函数实现构造函数
```javascript
	function Student(name) {
		this.name = name;
	}
	Student.prototype.hello = function () {
		console.log(('Hello, ' + this.name + '!'));
	}
	var xiaoming = new Student('小明');
	xiaoming.hello();
	console.log(xiaoming);
```
### ES6class关键字实现构造函数
```javascript
	class Student {
		constructor(name) {			//构造函数
			this.name = name;
		}
		hello() {					//原型对象上的函数
			console.log(('Hello, ' + this.name + '!'));
		}
	}
	var xiaoming = new Student('小明');
	xiaoming.hello();
	console.log(xiaoming);
```

## class表达式
下边这个类的名字是`MyClass`，不是`Me`，`Me`只在`Class`**内部**代表当前类。
```javascript
const MyClass = class Me {
	getClassName() {
		return Me.name;
	}
}
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```
类内部没有用到`Me`的话可以省略掉：
```javascript
const MyClass = class {
	//...
};
```
如果不需要多次构造，可以写成立即执行的`Class`：
```javascript
//没有类名，只有一个实例
let person = new class {
	constructor(name) {
		this.name = name;
	}
	sayName() {
		console.log(this.name);
	}
}('张三');
person.sayName();
```

## 不存在变量提升
类`class`不存在变量提升，必须先定义后使用，是因为继承的存在，防止出现继承时类未定义。

## class的私有属性和私有方法

## class的Generator方法
如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。  
下面这个例子是定义一个遍历器接口：
```javascript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

## Class的静态方法
表示是类的属性，不是实例的属性：
```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()   //实例访问不到
// TypeError: foo.classMethod is not a function
```
静态方法中的`this`指的是这个类而不是实例。
静态方法可以被子类继承，也可以在子类中通过`super`对象调用。
```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'

//或者像下边这样
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```
## Class的静态属性和实例属性
## new.target属性
可以判断类是通过`new`调用还是通过继承调用。




## class继承
子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工。如果不调用`super`方法，子类就得不到`this`对象。
```javascript
	class PrimaryStudent extends Student {		//用extends实现继承
		constructor(name, grade) {
			super(name); 		// 记得用super调用父类的构造方法!
			this.grade = grade;
		}
		myGrade() {
			console.log('I am at grade ' + this.grade);
		}
	}
	var xiaoming = new PrimaryStudent("小明", "三年级");
	xiaoming.myGrade();
	console.log(xiaoming);
```

