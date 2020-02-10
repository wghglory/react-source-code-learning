import React, { Component } from '../my-react/';

function FuncCmp(props) {
  return <div>name: {props.name}</div>;
}
/*
function FuncCmp(props) {
  return React.createElement(
    'div',
    null,
    'name: ',
    props.name
  );
} */

class ClassCmp extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  clickHandle() {
    console.log('clickHandle');
  }
  render() {
    const { counter } = this.state;
    return (
      <div>
        name: {this.props.name}
        <p>counter: {counter}</p>
        <button onClick={this.clickHandle}>点击</button>
        {[0, 1, 2].map(item => {
          return <FuncCmp name={'我是function组件' + item} key={item} />;
        })}
      </div>
    );
  }
}
/*
class ClassCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  clickHandle() {
    console.log('clickHandle');
  }

  render() {
    const { counter } = this.state;

    return React.createElement(
      'div',
      null,
      'name: ',
      this.props.name,
      ' ',
      React.createElement(
        'p',
        null,
        'counter: ',
        counter
      ),
      React.createElement(
        'button',
        { onClick: this.clickHandle },
        '点击'
      ),
      [0, 1, 2].map(item => {
        return React.createElement(FuncCmp, { name: '我是function组件' + item, key: item });
      }),
      '      '
    );
  }
}
*/

export const jsx = (
  <div className="app">
    <h2>
      哈哈哈<span>我是内容</span>
    </h2>
    <FuncCmp name="我是function组件" />
    <ClassCmp name="我是class组件" />
  </div>
);
/* const jsx = React.createElement(
  "div",
  { className: "app" },
  "    ",
  React.createElement(
    "h2",
    null,
    "      哈哈哈",
    React.createElement(
      "span",
      null,
      "我是内容"
    ),
    "    "
  ),
  "    ",
  React.createElement(FuncCmp, { name: "我是function组件" }),
  "    ",
  React.createElement(ClassCmp, { name: "我是class组件" }),
  "  "
); */

// console.log('jsx', jsx);
/*
type: "div",
props: { className: "app", children: Array[3] 3 objects }
...
*/
