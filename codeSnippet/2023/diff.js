const diff = (oldNode, newNode)=>{
    let difference = {}; // 保存两个节点之间的差异
    getDiff(oldNode, newNode,0,difference);
    return difference;
}


const REMOVE = 'remove';
const MODIFY_TEXT ='modify_text';
const CHANGE_ATTRS = 'change_attrs';
const TAKEPLACE = 'replace';

let initIndex = 0;


const getDiff = (oldNode, newNode,index,difference)=>{
    let diffResult = [];
}


// 原文： https://mp.weixin.qq.com/s/eHaQr8ZsSvwbIwGv-IJqVg