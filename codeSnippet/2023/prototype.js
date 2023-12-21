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