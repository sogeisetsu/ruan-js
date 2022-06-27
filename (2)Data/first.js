// typeof 运算符 获取数据类型
function funA() {
    console.log("一个函数");
    return 12;
}
console.log(typeof funA); //function
console.log(typeof funA()); // number
// typeof中 数组和null都属于object
console.log(typeof [1, 2]); // object
console.log(typeof {}); // object
console.log(typeof []); // object
console.log(typeof null); // object
console.log([] instanceof Array); // true
console.log({} instanceof Array); // false
console.log([] instanceof Object); // true