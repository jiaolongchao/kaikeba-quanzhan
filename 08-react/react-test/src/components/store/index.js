// import { createStore } from 'redux';

// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'add':
//       return state + 1;
//     case 'minus':
//       return state - 1;
//     default:
//       return state;
//   }
// }

// const store = createStore(counterReducer)
// export default store

// 应用中间件redux-thunk redux-logger

import { applyMiddleware, createStore, combineReducers } from 'redux'
import { counterReducer } from "./count.redux";
import { user } from "./user.redux";


import logger from 'redux-logger'
import thunk from 'redux-thunk'

const store = createStore(
  combineReducers({ counter: counterReducer , user}),
  applyMiddleware(logger, thunk)
)
export default store
