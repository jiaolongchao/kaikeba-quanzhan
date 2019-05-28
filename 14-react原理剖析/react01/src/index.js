// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// import React from 'react';
// import ReactDOM from 'react-dom';

// import React, { Component } from './kreact'
// import ReactDOM from './kreact-dom'

// function Comp (props) {
//   return <h2>hi</h2>
// }

// class Comp2 extends Component {
//   render () {
//     return <div>hi{this.props.name}</div>
//   }
// }
// const jsx = (
//   <div id='demo' style={{ color: 'blue' }} onClick={() => alert('click')}>
//     <span>hi</span>
//     <Comp name='函数组件' />
//     <Comp2 name='类组件' />
//   </div>
// )

// console.log(jsx)

// ReactDOM.render(jsx, document.getElementById('root'))

import React, { Component } from './jlcreact'
import ReactDOM from './jlcreact-dom'

function Comp () {
  return <h1>this is function</h1>
}

class Comp2 extends Component {
  render () {
    return <p>this is class {this.props.name}</p>
  }
}

const jsx = (
  <div id='warp' style={{ color: 'blue' }} onClick={() => alert('click')}>
    <span>this is spanTag</span>
    <Comp name='函数组件' />
    <Comp2 name='类组件' />
  </div>
)

ReactDOM.render(jsx, document.getElementById('root'))
