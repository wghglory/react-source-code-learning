import React from '../my-react2/';

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

class ClassCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.clickHandle = this.clickHandle.bind(this);
  }

  clickHandle() {
    this.setState({ counter: this.state.counter + 1 }); // 异步
    console.log('counter + 1', this.state); // 执行顺序 1，{ counter: 0 }

    this.setState({ counter: this.state.counter + 2 }); // 异步
    console.log('counter + 2', this.state); // 执行顺序 2，{ counter: 0 }

    // 回调：同步
    this.setState({ counter: this.state.counter + 1 }, () => {
      console.log('counter + 1 回调', this.state); // 执行顺序 4，{ counter: 1 }
    });
    this.setState(nextState => {
      console.log('nextState', nextState); // 执行顺序 3，{ counter: 1 }， 取执行顺序 1 的结果
    });

    // 同步
    // setTimeout, setInterval
    setTimeout(() => {
      this.setState({ foo: 'bar' });
      console.log('setTimeout: ', this.state); // {counter: 1, foo: "bar"}
    }, 1000);
    // // 原⽣事件
    // button.addEventListener('click', () => {
    //   this.setState({ foo: 'bar' });
    // });
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
