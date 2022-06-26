console.log("two.js");
console.log("变量提升");
console.log(a); //undefined
var a = 1;
/* 
console.log(b); // ReferenceError
let b = 1; 
*/

console.log("条件语句");
var aone = 1;
if ((aone = 1)) {
    var atwo = aone;
} else {
    aone = 1;
}

aone = 4;
switch (aone) {
    case 0:
        aone = 1;
        break;
    case 1:
        aone = 2;
        break;
    default:
        aone = 3;
}
console.log(aone);
