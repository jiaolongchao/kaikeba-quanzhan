const state = {
    count: 1,
    cup: { name: '玻璃杯', color: 'white' }
}
const mutations = {
    add(state) {
        state.count++
    },
    minus(state) {
        state.count--
    },
    modifyColor: (state, obj) => { 
        if(obj.color){
            state.cup.color = obj.color
        }else{
            state.cup.color = 'red'
        }
    }
}
const actions = {
    add: ({ commit }) => {
        commit('add')
    },
    minus: ({ commit }) => {
        commit('minus')
    },
    modifyColor: ({ commit },obj) => {
        commit('modifyColor',obj)
    }
}

const getters = {
    count: state => state.count,
    cup: state => state.cup
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}