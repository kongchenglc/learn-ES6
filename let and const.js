//let和const具有暂时性死区(TDZ)，不存在变量提升，而且不允许重复声明。
//暂时性死区：可以理解为只要进入当前作用域，该变量就存在，不过不可以获取，只有声明后才可以使用。
var tmp = 123;
if(true) {
    tmp = 'bcd';    //报错，由于TDZ的存在
    let tmp;
}


//const指向对象地址
const foo = {};
foo = {a:1,b:2,c:3};    //报错
foo.a = 2;


//es6具有块级作用域
function f() {console.log('I am outside!');}
(function() {
    if(false) {
        //重复声明一次函数f
        function f() { console.log('I am outside!'); }
    }
    f();
})();

//以上代码在es5运行时输出"I am inside!"
//        在es6运行时输出"I am outside!"，因为块级作用域的限制