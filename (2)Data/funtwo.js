// 参数传递变量
var a = 1;
var x = function (a) {
    console.log(a);
};

function f() {
    var a = 2;
    x(a);
}

// f(); //2

var b = 1; //全局作用域
var fEvalOne = () => {
    var b = 2; //函数作用域，名称相同的变量，覆盖全局作用域
    var evalB = eval;
    evalB("console.log('eval别名调用\t'+b);"); //eval 别名调用时，默认使用全局变量
    console.log("函数作用域\t" + b);
};
fEvalOne();
console.log("全局作用域\t" + b);
/* eval别名调用	1
函数作用域	2
全局作用域	1 */