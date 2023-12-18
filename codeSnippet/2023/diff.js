const diff = (oldNode, newNode) => {
  let difference = {}; // 保存两个节点之间的差异
  getDiff(oldNode, newNode, 0, difference);
  return difference;
};

const REMOVE = "remove";
const MODIFY_TEXT = "modify_text";
const CHANGE_ATTRS = "change_attrs";
const TAKEPLACE = "replace";

let initIndex = 0;

const getDiff = (oldNode, newNode, index, difference) => {
  let diffResult = [];
  if (!newNode) {
    // 新节点不存在 说明节点被删除了
    diffResult.push({ type: REMOVE, index });
  } else if (typeof newNode === "string" && typeof oldNode === "string") {
    // 如果是文本节点 直接替换
    if (newNode !== oldNode) {
      diffResult.push({ type: MODIFY_TEXT, index, value: newNode });
    }
  } else if (newNode.tagName === oldNode.tagName) {
    // 如果 节点 类型相同 继续比较属性是否相同
    let storeAttrs = {};
    for (let key in oldNode.attrs) {
      if (oldNode.attrs[key] !== newNode.attrs[key]) {
        storeAttrs[key] = newNode.attrs[key];
      }
    }
    for (let key in newNode.attrs) {
      if (!oldNode.attrs.hasOwnProperty(key)) {
        storeAttrs[key] = newNode[key];
      }
    }
    if (Object.keys(storeAttrs).length > 0) {
      // 判断是否有不同
      diffResult.push({ type: CHANGE_ATTRS, index, value: storeAttrs });
    }
    oldNode.children.forEach((child, i) => {
      // 深度遍历
      getDiff(child, newNode.children[i], ++initIndex, difference);
    });
  } else if (oldNode.tagName !== newNode.tagName) {
    // 如果节点类型不同 直接替换
    diffResult.push({ type: TAKEPLACE, index, value: newNode });
  }
  if (!oldNode) {
    diffResult.push({ type: TAKEPLACE, newNode });
  }
  if (diffResult.length) {
    difference[index] = diffResult;
  }
};

// update
const fixPlace = (node, difference) => {
  // node 一个真实的dom（需要更新的节点） difference 差异数组
  let pacer = { index: 0 };
  pace(node, pacer, difference);
};

const pace = (node, pacer, difference) => {
  // 递归 对当前节点的差异用doFix进行更新
  let currentDifference = difference[pacer.index];
  let childNodes = node.childNodes;
  childNodes.forEach(function (child) {
    pacer.index++;
    pace(child, pacer, difference);
  });
  if (currentDifference) {
    doFix(node, currentDifference);
  }
};

const doFix = (node, difference) => {
  difference.forEach(function (item) {
    switch (item.type) {
      case REMOVE:
        node.parentNode.removeChild(node);
        break;
      case MODIFY_TEXT:
        node.textContent = item.value;
        break;
      case CHANGE_ATTRS:
        const attrs = item.value;
        for (let key in attrs) {
          if (node.nodeType !== 1) return;
          const value = attrs[key];
          if (value) {
            SetVdToDom(node, key, value);
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case TAKEPLACE:
        let newNode =
          item.newNode instanceof Element
            ? item.newNode.render(item.newNode)
            : document.createTextNode(item.newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      default:
        break;
    }
  });
};

// 原文： https://mp.weixin.qq.com/s/eHaQr8ZsSvwbIwGv-IJqVg
