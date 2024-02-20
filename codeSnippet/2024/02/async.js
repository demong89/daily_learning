// async 函数的实现原理  就是将Generator函数和自动执行器，包装在一个函数里。

async function fn(params) {
    // todo ...
}
// 等价于
function fn(arg){
    return spawn(function* () {
        // todo ...
    });
}

// Generator 函数就是一个封装的异步任务 或者说是异步任务的容器 。 异步操作需要暂停的地方，都用yield语句标识出来。
// 调用Generator函数，返回的是指针对象。调用指针对象的next方法，会移动内部指针。
// next方法的作用是分段执行Generator函数。每次调用next方法，会返回一个对象，包含两个属性：value和done。value 属性是 yield 语句后面表达式的值，表示当前阶段的值；
// done 属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。


function* gen(){
    yield  1;
    yield Promise.resolve(2);
    yield Promise.resolve(3);
    return 4;
}
let g = gen();

g.next(); // {value: 1, done: false}


// Generator实现 async 函数、

function spawn(generator) {
    
    return function(){
        const gen = generator.apply(this, arguments);
        return new Promise(function(resolve, reject) {
            function step(key, arg){
                let result;
                try {
                    result = gen[key](arg)
                } catch (error) {
                    return reject(error)
                }
                const {value, done} = result;
                if (done) {
                    return resolve(value)
                }else{
                    return Promise.resolve(value).then(val=>step("next", val),(err)=>step('throw', err))
                }
            }
            step('next')
        });
    }
}

