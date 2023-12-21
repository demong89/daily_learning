// 1.new Date().__proto__ == Date.prototype？

// 2.new Date().constructor == Date？

// 3.Date.__proto__ == Function.prototype？

// 4.Function.__proto__ == Function.prototype？

// 5.Function.prototype.__proto__== Object.prototype？

// 6.Object.prototype.__proto__ == null？

/**
 * 构造函数
 */

// 除箭头函数外的所有函数都可以作为构造函数被new
// 函数内this指向问题
// 构造函数return问题

// 构造函数是不需要 return 的，函数中的 this 就是创建并返回的新对象了。

// 但当 new 一个有 return 的构造函数时，如果 return 的是基本类型，则 return 的数据直接被抛弃。

// 如果 return 一个对象，则最终返回的新对象就是 return 的这个对象，这时原本 this 指向的对象就会被抛弃。


/**
 * 原型
 */

// 构造函数
function Person(name) {
    this.name = name;
}
// 对象
let person = new Person("张三");

// 通过对象拿到原型（2种方法）
let proto1 = Object.getPrototypeOf(person);
let proto2 = person.__proto__;

// 通过构造函数拿到原型
let proto3 = Person.prototype;

// 验证一下
// true
console.log(proto1 == proto2);
// true
console.log(proto1 == proto3);


/**
 * new 
 */

function _new (fn,...args){
    var obj = Object.create(fn.prototype); // 通过Object.create指定原型，更加符合规范
    let result = fn.apply(obj,args); // 指定this为obj对象，执行构造函数
    // 判断构造函数的返回值是否是对象  
    return result instanceof Object ? result : obj;
}


// instanceOf 的原理是判断构造函数的 prototype 属性是否在对象的原型链上。

// array的原型链：Array.prototype → Object.prototype
// let array = [];
// // true
// console.log(array instanceof Array);
// // true
// console.log(array instanceof Object);
// // false
// console.log(array instanceof Function);


function _instanceOf(obj, fn){
    while (true) {
        obj = obj.__proto__;
        if(obj == fn.prototype){  // 匹配上了
            return true;
        }
        if(obj == null){  // 到达原型链的尽头了
            return false;
        }
    }
}


