




//es6的块级作用域
function f() {console.log('I am outside!');}
(function() {
    if(false) {
        //重复声明一次函数f
        function f() { console.log('I am outside!'); }
    }
    f();
})();