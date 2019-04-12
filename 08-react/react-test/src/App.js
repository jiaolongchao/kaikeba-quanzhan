import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Welcome1, Welcome2} from './components/CompType';
import Clock from './components/Clock';
import StateTest from './components/StateTest';
import CartSample from './components/CartSample';
import ScrollingList from './components/ScrollingList';
import AntdTest from './components/AntdTest';
import CommentList from './components/CommentList';
import Hoc from './components/Hoc';
import Composition from './components/Composition';
import HookTest from './components/HookTest';
import ContextTest from './components/ContextTest';
function formatName(params) {
    return params.firstName + " " + params.lastName; 
}

class App extends Component {
  render() {
    const name = 'jerry';
    const user = {firstName : "tom" , lastName :"jerry"}
    const jsx = <p>hello jerry</p>;
    return (
      <div className="App">
        {/* 创建上下文 */}
        <ContextTest />

        {/* hook */}
        {/* <HookTest /> */}

        {/* 复合组件  */}
        {/* <Composition/> */}
        {/* 高阶组件 */}
        {/* <Hoc /> */}

        {/* <CommentList /> */}

        {/* <AntdTest/> */}

        {/* 表达式 */}
        {/* <h1>{name}</h1>
        <h1>{formatName(user)}</h1> */}

        {/* 属性 */}
        {/* <img src={logo} style={{width:'100px'}} /> */}

        {/* jsx也是表达式 */}
        {/* {jsx} */}
        {/* <Welcome1 name='some content'/>
        <Welcome2 name='some content'/> */}

        {/* <Clock /> */}

        {/* 直接修改state是无效的 */}
        {/* <StateTest />

        <CartSample title="购物车"/>

        <ScrollingList /> */}

      </div>
    );
  }
}

export default App;
