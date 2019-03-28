import gs from '@/service/goods'
export default {
    state: {
        slider: [],
        keys: [],
        goodsInfo: {}
    },
    mutations: {
        setGoodsInfo(state, { slider, keys, goodsInfo }) {
            state.slider = slider;
            state.keys = keys;
            state.goodsInfo = goodsInfo;
        }
    },
    getters: { //需要对数据进行处理的时候用getters  添加一个goods属性，转换对象形式为数组形式例于循环渲染
        goods: state => {
            return state.keys.map(key => state.goodsInfo[key])
                .reduce((prev, next) => prev.concat(next), []) //把二维数组的所有元素拼接成一个一维数据 
        }
    },
    actions: {
        getGoods({ state, commit }, user) {
            if (!state.keys.length != 0) {
                gs.getGoodsInfo().then(goodsInfo => {
                    commit('setGoodsInfo', goodsInfo)
                })
            }
        }
    }
}
