对象是最复杂的数据类型，又可以分成三个子类型。

- 狭义的对象（object）
- 数组（array）
- 函数（function）

`typeof`运算符可以返回一个值的数据类型。

```js
// typeof 运算符 获取数据类型
function funA() {
    console.log("一个函数");
    return 12;
}
console.log(typeof funA); //function
console.log(typeof funA()); // number
```

typeof中 数组和null都属于object

```js
typeof window // "object"
typeof {} // "object"
typeof [] // "object"
```

`instanceof`运算符可以区分数组和对象。

```js
console.log([] instanceof Array); // true

console.log({} instanceof Array); // false

console.log([] instanceof Object); // true
```

如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。转换规则是除了下面六个值被转为`false`，其他值都视为`true`。

- `undefined`
- `null`
- `false`
- `0`
- `NaN`
- `""`或`''`（空字符串）

`NaN`是 JavaScript 的特殊值，表示“非数字”（Not a Number），主要出现在将字符串解析成数字出错的场合。`null`是一个表示“空”的对象，转为数值时为`0`；`undefined`是一个表示"此处无定义"的原始值，转为数值时为`NaN`。

JavaScript 内部，**所有数字都是以64位浮点数形式储存**，即使整数也是如此。由于**浮点数不是精确的值**，所以涉及小数的比较和运算要特别小心。

```js
console.log(**0.1** + **0.2** == **0.3**); // false

console.log(**0.1** + **0.2** === **0.3**); //false
1 === 1.0 // true

```

正确的比较方法是使用JavaScript提供的最小精度值：

```javascript
console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);
```

检查等式左右两边差的绝对值是否小于最小精度，才是正确的比较浮点数的方法。这段代码结果就是 true 了。

在js中字符串可以看作是数组，可以通过index获取值，也可以获取长度。

**JavaScript 使用 Unicode 字符集。JavaScript 引擎内部，所有字符都用 Unicode 表示。**

> JavaScript 对 UTF-16 的支持是不完整的，由于历史原因，只支持两字节的字符，不支持四字节的字符。这是因为 JavaScript 第一版发布的时候，Unicode 的码点只编到`U+FFFF`，因此两字节足够表示了。后来，Unicode 纳入的字符越来越多，出现了四字节的编码。但是，JavaScript 的标准此时已经定型了，统一将字符长度限制在两字节，导致无法识别四字节的字符。上一节的那个四字节字符`𝌆`，浏览器会正确识别这是一个字符，但是 JavaScript 无法识别，会认为这是两个字符。
>
> ```
> '𝌆'.length // 2
> ```
>
> 上面代码中，JavaScript 认为`𝌆`的长度为2，而不是1。
>
> 总结一下，对于码点在`U+10000`到`U+10FFFF`之间的字符，JavaScript 总是认为它们是两个字符（`length`属性为2）。所以处理的时候，必须把这一点考虑在内，也就是说，JavaScript 返回的字符串长度可能是不正确的。

```js
// 字符串编码
var encodeAll = (strings) => {
    // 非ASCII字符转为utf-8
    let uni = encodeURIComponent(strings);
    // 转成可打印的BASE64编码
    return btoa(uni);
};

// 字符串解码
var decodeAll = (code) => {
    // 将base64 解码
    let uni = atob(code);
    // 解码
    return decodeURIComponent(uni);
};


console.log(encodeAll("的就哦离开火箭11xcsknc")); //JUU3JTlBJTg0JUU1JUIwJUIxJUU1JTkzJUE2JUU3JUE2JUJCJUU1JUJDJTgwJUU3JTgxJUFCJUU3JUFFJUFEMTF4Y3NrbmM=
console.log(decodeAll(encodeAll("的就哦离开火箭11xcsknc"))); //的就哦离开火箭11xcsknc

```

