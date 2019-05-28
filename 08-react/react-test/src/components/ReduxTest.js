// import React, { Component } from 'react'
// export default class ReduxTest extends Component {
//   render () {
//     return (
//       <div>
//         <button onClick={() => store.dispatch({ type: 'add' })}>+</button>
//         {store.getState()}
//         <button onClick={() => store.dispatch({ type: 'minus' })}>-</button>
//       </div>
//     )
//   }
// }

// 使用react-redux

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add, minus, asyncAdd } from './store/count.redux'

const mapStateToProps = state => ({ num: state.counter }) // 做一个映射 把状态映射到我们的属性中
// const mapDispatchToProps = {
//   add: () => ({ type: 'add' }),
//   minus: () => ({ type: 'minus' }),
//   asyncAdd: () => dispatch => {
//     setTimeout(() => {
//       // 异步结束后，手动执行dispatch
//       dispatch({ type: 'add' })
//     }, 1000)
//   }
// }
// 代码重构 提出action redurce
const mapDispatchToProps = { add, minus, asyncAdd }

function ReduxTest ({ num, add, minus, asyncAdd }) {
  return (
    <div>
      <button onClick={add}>+</button>
      {num}
      <button onClick={minus}>-</button>
      <button onClick={asyncAdd}>asyncAdd</button>
    </div>
  )
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxTest)

// 使用装饰
// @connect(
//   mapStateToProps,
//   mapDispatchToProps
// )
// class ReduxTest extends Component {
//   render() {
//     const {num,add,minus,asyncAdd} = this.props
//     return (
//       <div>
//         <button onClick={add}>+</button>
//         {num}
//         <button onClick={minus}>-</button>
//         <button onClick={asyncAdd}>asyncAdd</button>
//       </div>
//     )
//   }
// }
// export default ReduxTest
