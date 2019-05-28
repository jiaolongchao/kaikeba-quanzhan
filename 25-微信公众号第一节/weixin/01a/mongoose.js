const mongoose = require('mongoose')
const {
    Schema
} = mongoose
mongoose.connect('mongodb://58.87.88.188:27017/weixin', {
    useNewUrlParser: true
}, () => {
    console.log('Mongodb connected..')
})
exports.ServerToken = mongoose.model('ServerToken', {
    accessToken: String
});