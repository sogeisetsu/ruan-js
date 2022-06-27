console.log("three.js");
console.log("箭头函数的一些问题");
console.log("this的指向问题");
// 箭头函数不会创建自己的this，它只会从自己的作用域链的上一层继承 this。
var funA = () => {
    console.log(this == window); //true
    return this;
    /**
     * return value: window
     * this:undefined
     */
};
function funB() {
    return this;
    /**
     * return value:window
     * this:window
     */
}
var funC = () => {
    "use strict";
    return this;
    /**
     * 鉴于 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略。
     * return value: window
     * this:undefined
     */
};
function funD() {
    "use strict";
    return this;
    /**
     * 严格模式下，this不指向对象
     * return value: undefined
     * this:undefined
     */
}
console.log(funA() == window); //true
funA();
funB();
funC();
funD();
