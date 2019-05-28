export const  counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

//action creator
export const add = () => ({ type: 'add' });
export const minus =  () => ({ type: 'minus' });
export const asyncAdd = () => dispatch => {
    setTimeout(() => {
      // 异步结束后，手动执行dispatch
      dispatch({ type: 'add' })
    }, 1000)
  }