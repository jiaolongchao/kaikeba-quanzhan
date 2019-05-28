const initial = {
  isLogin: false, // 当前用户是否登录
  loading: false // 是否正在登录中
}

export const user = (state = initial, action) => {
  switch (action.type) {
    case 'requestLogin':
      return {
        isLogin: false,
        loading: true
      }
    case 'login':
      return {
        isLogin: true,
        loading: false
      }
    default:
      return state
  }
}

// action creator

export const login = () => dispatch => {
  dispatch({ type: 'requestLogin' })
  setTimeout(() => {
    dispatch({ type: 'login' })
  }, 2000)
}
