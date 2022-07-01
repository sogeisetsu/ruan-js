# 基本数据类型

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

# 对象

js中的对象就是键值对，键名都是字符串，键在使用过程加不加引号都可以。

对象的每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用。

`delete`命令只能删除对象本身的属性，**无法删除继承的属性**。

注意，删除一个不存在的属性，`delete`不报错，而且返回`true`。

只有一种情况，`delete`命令会返回`false`，那就是该属性存在，且不得删除。

`in`运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回`true`，否则返回`false`。**它的左边是一个字符串**，表示属性名，右边是一个对象。

可以使用对象的`hasOwnProperty`方法判断一下，**是否为对象自身的属性。**

```js
if("printName" in obj){
    if(obj.hasOwnProperty("printName")){
        console.log("存在");
    }
}
```

`for...in`循环有两个使用注意点。

- 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
- 它不仅遍历对象自身的属性，还遍历继承的属性。

举例来说，对象都继承了`toString`属性，但是`for...in`循环不会遍历到这个属性。

# 函数

JavaScript 语言将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。凡是可以使用值的地方，就能使用函数。比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。函数只是一个可以执行的值，此外并无特殊之处。

## 函数提升

函数也存在函数提升，和变量提升不同的是，`function`修饰的整个函数都会被提升到头部，所以在声明之前调用能得到正确的结果。

```js
f(); // 2
function f() {
    console.log("2");
}
```

**如果采用赋值语句定义函数，提升的只是变量**，如下所示

```js
f(); // TypeError TypeError: f is not a function
console.log(typeof f); // underfined
var f = function () {
    console.log("12345");
};
```

## 作用域

函数作用域，变量只在函数内部存在。对于顶层函数来说，函数外部声明的变量就是全局变量（global variable），它可以在函数内部读取。在函数内部定义的变量，外部无法读取，称为“局部变量”（local variable）。

**函数外部无法读取函数内部的变量，函数内部可以读取并修改函数外部的变量。**

```js
var a = 1;
var ftwo = () => {
    a = 2;
    console.log(a);
};
ftwo();//2
console.log(a);//2
```

**函数内部定义的变量，会在该作用域内覆盖同名全局变量。**

```js
var x = 1;
var fthree = () => {
    var x = 2;
    console.log(x);
};
fthree();//2
console.log(x);//1
```

上面代码中，变量`x`同时在函数的外部和内部有定义。结果，在函数内部定义，局部变量`x`覆盖了全局变量`x`。

**函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。**

```js
var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f() // 1
```

上面代码中，函数`x`是在函数`f`的外部声明的，所以它的作用域绑定外层，内部变量`a`不会到函数`f`体内取值，所以输出`1`，而不是`2`。解决办法是使用闭包或者使用参数传递变量。

```js
// 函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。
var a = 1;

function f() {
    var a = 2;
    function x() {
        // 此时函数x的作用域在函数f里面，x可以读取f定义的变量
        console.log(a);
    }
    // 使用闭包可以读取函数内部的变量
    return x;
}

var functionx = f();
functionx();//2
```

```js
// 参数传递变量
var a = 1;
var x = function (a) {
    console.log(a);
};

function f() {
    var a = 2;
    x(a);
}

f(); //2

```

## 闭包

闭包的最大用处有两个，一个是可以读取外层函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。

```js
function createIncrementor(start) {
  return function () {
    return start++;
  };
}

var inc = createIncrementor(5);

inc() // 5
inc() // 6
inc() // 7
```

注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成网页的性能问题。

## 参数传递

**函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是传值传递（passes by value）。**这意味着，在函数体内修改参数值，不会影响到函数外部。但是，**如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递（pass by reference）。**也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值。

## 立即调用函数表达式

[立即调用的函数表达式iife](https://wangdoc.com/javascript/types/function.html#立即调用的函数表达式iife)

通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：**一是不必为函数命名，避免了污染全局变量；二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。**

```javascript
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());
```

上面代码中，写法二比写法一更好，因为完全避免了污染全局变量。

## `eval`

[函数 - JavaScript 教程 - 网道 (wangdoc.com)](https://wangdoc.com/javascript/types/function.html#eval-命令)

`eval`命令接受一个字符串作为参数，并将这个字符串当作语句执行。

```javascript
eval('var a = 1;');
a // 1
```

缺点如下：

1. 没有自己的作用域，一般情况下使用的是当前作用域，有安全风险。
2. 即使是在严格模式下，`eval`中声明的变量不会被外部读取，**但是外部声明的变量仍然可以被`eval`读写。**
3. 不利于 JavaScript 引擎优化执行速度
4. 别名调用时，默认使用全局作用域。

```javascript
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
```

> 总之，`eval`的本质是在当前作用域之中，注入代码。由于安全风险和不利于 JavaScript 引擎优化执行速度，一般不推荐使用。
>
> ---
>
> 来源：[函数 - JavaScript 教程 - 网道 (wangdoc.com)](https://wangdoc.com/javascript/types/function.html#eval-命令)