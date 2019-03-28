import axios from 'axios';
export default {
    getGoodsInfo(user) {
        return axios.get('/api/goods')
            .then(res => {
                const { code, data: goodsInfo, slider, keys } = res.data; //data:goodsInf对data的重命名
                //数据的处理
                if (code) {
                    return { goodsInfo, slider, keys }
                } else {
                    return null;
                }
            })
    }
}