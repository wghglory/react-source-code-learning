// https://react.docschina.org/ 找到 LIVE JSX EDITOR 可以进行测试

/* 1. 什么是JSX 语法糖

React 使⽤ JSX 来替代常规的 JavaScript。 JSX 是⼀个看起来很像 XML 的 JavaScript 语法扩展。

2. 为什么需要JSX ？

开发效率：使⽤ JSX 编写模板简单快速。
执⾏效率：JSX编译为 JavaScript 代码后进⾏了优化，执⾏更快。
类型安全：在编译过程中就能发现错误。

3. 原理：babel-loader会预编译JSX为 React.createElement(...)

4. 与vue的异同：
（1）react中虚拟dom+jsx的设计⼀开始就有，vue则是演进过程中才出现的
（2）jsx本来就是js扩展，转义过程简单直接的多；vue把template编译为render函数的过程需要复杂的编译器转换字符串-ast-js函数字符串

*/

import React from 'react';
import ReactDOM from 'react-dom';

// JSX预处理前：
class HelloMessage extends React.Component {
  render() {
    return (
      <div className="a b" style={{ color: 'red' }}>
        Hello {this.props.name}. My age is {2 + 2}
      </div>
    );
  }
}

ReactDOM.render(<HelloMessage name="Taylor" />, document.getElementById('hello-example'));

/* 处理后：
class HelloMessage extends React.Component {
  render() {
    return React.createElement(
      'div',
      { className: 'a b', style: { color: 'red' } },
      'Hello ',
      this.props.name,
      '. My age is ',
      2 + 2
    );
  }
}

ReactDOM.render(
  React.createElement(HelloMessage, { name: 'Taylor' }),
  document.getElementById('hello-example')
); */
