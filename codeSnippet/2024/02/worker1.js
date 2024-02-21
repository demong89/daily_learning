// self.addEventListener('message', function(e) {
//     console.log('接收到来自主线程的数据', e.data);
// });

// 监听消息
self.addEventListener('message', function(e) {
    const num = e.data;
    console.log('接收到来自主线程的数据', e.data);
    // 计算斐波那契数列的第 num 项
    const result = fibonacci(num);
  
    // 向主线程发送消息
    self.postMessage(result);
  });
  
  // 计算斐波那契数列的第 n 项
  function fibonacci(n) {
    if (n === 1 || n === 2) {
      return 1;
    }
  
    return fibonacci(n - 1) + fibonacci(n - 2);
  }