const diff = (oldNode, newNode)=>{
    let difference = {}; // 保存两个节点之间的差异
    getDiff(oldNode, newNode,0,difference);
    return difference;
}



// 原文： https://mp.weixin.qq.com/s/eHaQr8ZsSvwbIwGv-IJqVg