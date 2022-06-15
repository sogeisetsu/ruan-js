console.log("first.js");
// 箭头函数无法绑定 arguments
var c = (n, ...args) => {
    console.log(args);
    console.log("n:" + n);
    console.log("args[0]:" + args[0]);
    if (args.length >= 1) {
        return args[0] + n;
    }
    return n;
};
console.log(c(1, 2, 3)); //3
console.log("=============");
console.log(c(10)); //10
/*
    会报错，因为箭头函数无法绑定 arguments
  var cone = (n) => {
  return arguments[0];
};
console.log(cone(1));
console.log(cone(1, 2)); */

/* var a = 1 + 3;
console.log(a);
for (let index = 0; index < 12; index++) {
  let c = a + index;
  console.log(c);
}
var b;
b = 14;
b = 120;
 */
