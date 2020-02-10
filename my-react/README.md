# 总结

1. webpack+babel 编译时，替换 JSX 为 React.createElement(type,props,...children)

2. 所有 React.createElement()执⾏结束后得到⼀个 JS 对象即 vdom，它能够完整描述 dom 结构

3. ReactDOM.render(vdom, container)可以将 vdom 转换为 dom 并追加到 container 中

4. 实际上，转换过程需要经过⼀个 diff 过程，⽐对出实际更新补丁操作 dom
