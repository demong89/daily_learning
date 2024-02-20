async function name() {
    await Promise.reject(1);
    return await Promise.reject(2)
}
// 等价于、
function a(){
    return _awaiter(function* (){
        yield Promise.reject(1);
        return yield Promise.reject(2);
    });
}

a();

// __awaiter实际上就是用yield实现的async await语法糖。
// 就是用yield写一个自动执行器，并且返回一个Promise对象，Promise对象的状态由执行过程的情况而定。

function __awaiter(fun) {
    let resolveFn;
    let rejectFn;
    const generator = fun();
    const promise = new Promise((resolve, reject)=>{
        resolveFn = resolve;
        rejectFn = reject;
    })

     // 如果yield之后返回的是简单类型，则把它包装成Promise
     const adopt = val=> val instanceof Promise ? val : Promise.resolve(val);

     const step = (preValue)=>{
       try {
        const {val , done} = generator.next(preValue);
        adopt(val).then(nextVal=>{
            if(done){
                resolveFn(nextVal)
            }else{
                step(nextVal)
            }
        }, reason=>{
            if (done) {
                rejectFn(reason)
            }else{
                step(reason)
            }
        })
       } catch (error) {
        rejectFn(error)
       }
     };

     step();
    return promise;
}