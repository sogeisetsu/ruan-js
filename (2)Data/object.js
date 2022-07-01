// js中的对象就是键值对，键名都是字符串，键在使用过程加不加引号都可以
var obj = {
    firstName: "Yuesheng",
    lastName: "Su",
    age: 22,
    sex: "man",
    printName: () => {
        console.log(obj.firstName + obj.lastName);
    },
};
if ("printName" in obj) {
    if (obj.hasOwnProperty("printName")) {
        console.log("存在");
    }
}
// for (let key in obj) {
//     console.log(key + "\t" + obj[key]);
// }

console.log("函数的属性和方法");

function f(a, b) {
    console.log(a + b);
}
console.log(f.name); //函数名称
console.log(f.length); // 函数参数个数
console.log(f.toString()); // 函数体转换为字符串
console.log("-=-============----------=========");
var a = 1;
var ftwo = () => {
    a = 2;
    console.log(a);
};
ftwo(); //2
console.log(a); //2

var x = 1;
var fthree = () => {
    var x = 2;
    console.log(x);
};
fthree();//2
console.log(x);//1
