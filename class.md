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
需要注意的是，子类继承父类时，`new.target`会返回子类。
不是通过`new`调用的话返回`undefined`。
```javascript
class A {
  constructor() {
    console.log(new.target);
  }
}
new A();			//返回A的引用
class B extends A {
  
}
new B();			//返回B的引用
```




## class继承
子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工。如果不调用`super`方法，子类就得不到`this`对象。  
正因为如此，在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。
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

### super关键字
`super`这个关键字，既可以当作函数使用，也可以当作对象使用。使用`super`的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。  
作为函数时，`super()`只能用在子类的构造函数之中，代表父类的构造函数，用在其他地方就会报错。  
`super`作为对象时，在普通方法中，指向父类的**原型对象**；在**静态方法中**，指向父类。

#### 作为父类构造函数
子类构造函数必须调用父类构造函数后才能使用`this`。

#### 作为父类原型对象
`super`指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过`super`调用的。
```javascript
class A {
  constructor() {
    this.a = 1;
  }
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p); // 2
    console.log(super.a); // undefined
  }
}

let b = new B();
```

##### super 与 this
通过`super`调用父类的方法时，方法内部的`this`指向子类。  
就是说通过`super`调用父类原型属性的方法，方法中如果有使用`this`，它是指向子类实例的。
```javascript
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```
上边通过`super`调用的方法返回了子类实例的属性。   
类似的，如果使用`super`对某个属性赋值，则会赋值到子类实例的属性上。因为写属性的时候相当于`this.PropertyName = ""`。
```javascript
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
		//super指向父类原型对象，x属性不存在
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
```

#### 作为父类
`super`作为对象，用在静态方法之中，这时`super`将指向父类，而不是父类的原型对象。


### 类的原型链
`Class`作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。  
- 一条是自己作为对象对类的静态属性的继承，指向父类。
- 另一条是子类的原型对象，对方法的继承，指向父类的`prototype`属性。
```javascript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

### extends的继承目标
只要是一个有`prototype`属性的函数，就能被继承。由于函数都有`prototype`属性，所以任意函数都能被继承。  
