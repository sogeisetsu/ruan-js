console.log(0.1 + 0.2 == 0.3); // false
console.log(0.1 + 0.2 === 0.3); //false

// 字符串编码
var encodeAll = (strings) => {
    // 转成Unicode编码
    let uni = encodeURIComponent(strings);
    // 转成可打印的BASE64编码
    return btoa(uni);
};

// 字符串解码
var decodeAll = (code) => {
    // 将base64 解码，结果应该为unicode编码
    let uni = atob(code);
    // unicode 解码
    return decodeURIComponent(uni);
};


console.log(encodeAll("的就哦离开火箭11xcsknc")); //JUU3JTlBJTg0JUU1JUIwJUIxJUU1JTkzJUE2JUU3JUE2JUJCJUU1JUJDJTgwJUU3JTgxJUFCJUU3JUFFJUFEMTF4Y3NrbmM=
console.log(decodeAll(encodeAll("的就哦离开火箭11xcsknc"))); //的就哦离开火箭11xcsknc
