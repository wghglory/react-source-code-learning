// index.js中从未使⽤React类或者其任何接⼝，为何需要导⼊它？
// JSX编译后实际调⽤React.createElement⽅法，所以只要出现JSX的⽂件中都需要导⼊React类

/**
 * jsx 解析: createElement被调⽤时会传⼊标签类型type，标签属性props及 若⼲⼦元素children。return vNode!
 * @param {*} type div, Function, Class
 * @param {*} props className, style
 * @param  {...any} children type 里面的内容：文本，div, Function, Class
 */
function createElement(type, props, ...children) {
  props.children = children;

  //判断组件类型： undefined文本 1原生 2Function 3Class
  let vtype;

  if (typeof type === 'string') {
    // 原⽣标签
    vtype = 1;
  } else if (typeof type === 'function') {
    // 类组件、函数组件 type 都是 function，在class 组件中加入isReactComponent 作区分
    vtype = type.isReactComponent ? 3 : 2;
  }
  return { vtype, type, props }; // vnode
}

export class Component {
  static isReactComponent = {};
  constructor(props) {
    this.props = props;

    this.state = {};
  }

  setState = () => {};
}

const React = { createElement, Component };

export default React;
