
import us from '@/service/user'
export default {
  state: {
    isLogin: localStorage.getItem('token') ? true : false //对当前登录状态的一个保存
  },
  mutations: {
    setLoginState(state, b) { //b就是将来要传进来的值
      state.isLogin = b;
    }
  },
  actions: {
    login({ commit }, user) {
      return us.login(user).then(res => {
        const { code, token } = res.data;
        if (code) { //在这里只关心登录成功的问题 最后返回token是因为view层 要用code做一些重定向的工作
          commit('setLoginState', true);
          localStorage.setItem('token', token)
        }
        return code;
      });
    },
    logout({ commit }) {
      // 清缓存
      localStorage.removeItem("token");
      // 重置状态
      commit("setLoginState", false);
    }
  }
}
