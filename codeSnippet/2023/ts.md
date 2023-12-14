## never
never类型表示的是那些永不存在的值的类型。例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。

使用never类型时，你只能出现在返回语句的位置，当函数抛出异常或根本就不会有返回值时。

```typescript
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never

never 非常适合用于防止对联合类型有遗漏使用的情况，例如:
```js
type Shape = 'circle' | 'square';
let shape: Shape;
switch (shape) {
  case 'circle':
    console.log('circle');
    break;
  case'square':
    console.log('square');
    break;
  default: // 正常逻辑是走不到defalult的
    const val : nevel = shape; // 此时shape为 never类型
    break;
}

```

如果shape增加了类型star, 但是swtich忘记增加case,default就会报错,导致代码编译不通过.

## type & interface
type 通过 & 进行组合，interface 则是通过 extends 进行组合。

```typescript

type T0 = { a: string };
type T1 = { b: string };
type T2 = { c: string };
type T3 = { a: string, b: string, c: string };
type T4 = T0 & T1 & T2;

```
在TypeScript中，我们可以用type和interface来定义一些类型。

type是TypeScript中最常用的类型定义方式，它可以用来定义基本类型和复杂类型。

type用来定义基本类型，例如number，string，boolean等，它可以用来定义复杂类型，例如对象类型，数组类型，函数类型等。

interface用来定义复杂类型，它可以用来定义对象类型，接口类型，类类型等。

type是TypeScript的区别：

+ interface 只能声明对象类型，但 type 除了对象类型以外，还可以声明简单类型和 union 联合类型
+ interface 的重复声明可以合并，然而 type 不能重复声明
+ type 和 interface 实现类型扩展的方式不同


##  ts 的枚举和 js 的对象有什么区别？

+ 数字类型的枚举会生成 反向映射，可以通过枚举的值获取到对应的键 key
``` ts
enum NumericEnum {
    LEFT = 1,
    RIGHT = 2,
}

NumericEnum[NumericEnum.LEFT]; // 'LEFT'
NumericEnum[1]; // 'LEFT'

// 打印下 NumericEnum 的 key
for (const key of Object.keys(NumericEnum)) console.log(key)
// '1'
// '2'
// 'LEFT'
// 'RIGHT'
// 。。。不是很明白为什么要这样设计？
```

+ 枚举成员是只读类型


## 元组
TypeScript 里的元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string 和 number 类型的元组：

```typescript
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```
+ 可选元素：咱可以在元素类型后面增加 ? 表示其为可选元素
+ 扩展元素：和 js 语法一样，咱可以用在类型前添加 ... 表示它是一个扩展元素:
```ts
type StringNumberBooleans = [string, number, ...boolean[]]; // 表示前两个元素分别是字符和数字类型，剩下的元素都是布尔类型
type StringBooleansNumber = [string, ...boolean[], number]; // 表示第一个和最后一个元素分别是字符和数字类型，中间的元素都是布尔类型
type BooleansStringNumber = [...boolean[], string, number]; //  表示最后两个元素分别是字符和数字类型，前面的元素都是布尔类型
```

## 函数
### 函数重载

如果某个函数能够以不同的参数数量和参数类型来调用，那在 ts 里该如何对该函数进行类型声明呢？

定义多个函数签名
需要强调的是，如果能用 union 联合类型声明的，就不要用重载来声明。

### 函数泛型
```ts
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}
```
使用 extends 关键字 对泛型增加限制
```ts

function getLonger<T extends { length: number }>(a: T, b: T): T {
    if (a.length > b.length) {
        return a;
    }
    return b;
}
```
## 对象
