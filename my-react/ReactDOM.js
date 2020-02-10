// 需要实现⼀个render函数，能够将vdom渲染出来，这⾥先打印vdom 结构

// jsx 解析运行 React.createElement 返回对象就是 vnode

function render(vnode, container) {
  // console.log('render', vnode); // { vtype: 1, type: "div", props: { className: 'app', children: Array[3] } }

  //vnode-> node
  mount(vnode, container);
  // container.appendChild(node)
}

// vnode-> node
function mount(vnode, container) {
  const { vtype } = vnode;

  if (!vtype) {
    mountTextNode(vnode, container); //处理文本节点
  }
  if (vtype === 1) {
    mountHtml(vnode, container); //处理原生标签
  }

  if (vtype === 2) {
    //处理函数组件
    mountFunc(vnode, container);
  }

  if (vtype === 3) {
    //处理class组件
    mountClass(vnode, container);
  }
}

//处理文本节点
function mountTextNode(vnode, container) {
  const node = document.createTextNode(vnode);
  container.appendChild(node);
}

//处理原生标签, only vtype=1 被处理
function mountHtml(vnode, container) {
  const { type, props } = vnode; // type: div
  const node = document.createElement(type);

  const { children, ...rest } = props; // rest: { className: 'app' }

  // children: [
  //   { vtype: 1, type: 'h2', props: {children: ['哈哈哈', {vtype: 1, type: "span", props: {children: ['我是内容']}}]} },
  //   { vtype: 2, type: function FuncCmp() {}, props: {name: '我是 function 组件, children: []} },
  //   { vtype: 3, type: function ClassCmp() {}, props: {name: '我是 class 组件, children: []} },
  // ]

  children.forEach(item => {
    /* class 组件 render 中假设包涵: {[0, 1, 2].map(item => {
      return <FuncCmp name={'我是function组件' + item} key={item} />;
    })}

    [
      { vtype: 2, type: function FuncCmp() {}, props: { key: 0, name: "我是function组件0", children: [] } },
      { vtype: 2, type: function FuncCmp() {}, props: { key: 1, name: "我是function组件1", children: [] } },
      { vtype: 2, type: function FuncCmp() {}, props: { key: 2, name: "我是function组件2", children: [] } }
    ] */
    if (Array.isArray(item)) {
      item.forEach(c => {
        mount(c, node);
      });
    } else {
      // item is vnode object
      mount(item, node);
    }
  });

  // className, style, onClick, etc
  Object.keys(rest).forEach(item => {
    if (item === 'className') {
      node.setAttribute('class', rest[item]);
    }
    // 假设所有 on 开头都是 click 事件，这里不做匹配了
    if (item.slice(0, 2) === 'on') {
      node.addEventListener('click', rest[item]);
    }
  });

  container.appendChild(node);
}

function mountFunc(vnode, container) {
  const { type, props } = vnode;
  // vnode: { vtype:2, type: function FuncCmp(), props: {name: "我是function组件", children:[] } }

  const vnodeInProps = new type(props);
  // { vtype:1, type: 'div', props: {children: ["name: ", "我是function组件"]} }

  mount(vnodeInProps, container);
}

function mountClass(vnode, container) {
  const { type, props } = vnode;
  // vnode: { vtype:3, type: function ClassCmp(), props: {name: "我是class组件", children:[] } }

  const cmp = new type(props);
  /* ClassCmp {
    props: {
      name: "我是class组件",
      children: [],
    }
    state: { counter: 0 }
  } */

  const vnodeInRender = cmp.render();
  /* vtype: 1
  type: "div"
  props:
    { children: [
      "name: ",
      "我是class组件",
      { vtype: 1, type: "p",  props: { children: ["counter: ", 0] }
      { vtype: 1, type: "button",  props: { onClick: function clickHandle(), children: ["点击"] },
      [
        { vtype: 2, type: function FuncCmp() {}, props: { key: 0, name: "我是function组件0", children: [] } },
        { vtype: 2, type: function FuncCmp() {}, props: { key: 1, name: "我是function组件1", children: [] } },
        { vtype: 2, type: function FuncCmp() {}, props: { key: 2, name: "我是function组件2", children: [] } }
      ]
    ]
  } */

  mount(vnodeInRender, container);
}

export default {
  render
};
