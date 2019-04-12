import React, { Component } from 'react'

export default class StateTest extends Component {
    state = {
        counter:1 
    }
    componentDidMount() {
      //请不要直接修改state状态值 是无效
      //this.state.counter = 2;

      //批量执行

    //   this.setState({
    //       counter : this.state.counter + 1
    //   })
    //   this.setState({
    //       counter : this.state.counter + 1
    //   })
    //   this.setState({
    //       counter : this.state.counter + 1
    //   })
      //批量执行是无效 所有的执行会进入一个队列 进行一个合并操作，在进行更新之前，发现在counter的三次相同的操作是多余的 只会执行一次
     
     //如果需要批量执行则可以使用回调函数
     this.setState(prevState=>{
         return {
             counter : prevState.counter + 1
         }
     })

     this.setState(prevState=>{
         return {
             counter : prevState.counter + 1
         }
     })
     //这种写法也可以这样写
     this.setState(prevState=>({
         counter : prevState.counter + 1
     }))


     //批量执行
    //  this.setState(obj,cb)
    //  this.setState(fn,cb)
    }
    
  render() {
    return (
      <div>
        {this.state.counter}
      </div>
    )
  }
}
