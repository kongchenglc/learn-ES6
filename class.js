//class继承
	//函数实现构造函数
		// function Student(name) {
		//     this.name = name;
		// }
		// Student.prototype.hello = function () {
		//     console.log(('Hello, ' + this.name + '!'));
		// }
		// var xiaoming = new Student('小明');
		// xiaoming.hello();
		// console.log(xiaoming);
	//class关键字实现构造函数
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
	//class继承
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