## vue2 的diff 算法
+ 1、找到对应的真实dom，（el）
+ 2、判断Vnode和oldVnode是否完全相同，如果是，直接return
+ 3、如果他们都有文本节点并且不相等，则更新el的文本节点
+ 4、如果oldValue有子节点，而Vnode没有，则删除el子节点。
+ 5、如果oldValue没有子节点，而Vnode有，则将Vnode的子节点真实化之后添加到el
+ 6、如果两者都有子节点，则执行updateChildren函数比较子节点

