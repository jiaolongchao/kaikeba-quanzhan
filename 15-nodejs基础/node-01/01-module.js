const os = require('os');
// const mem = os.freemen() / os.totalmen() * 100  //报错 目前node版本8.11.3
// console.log(`内存占用率${men}%`)

// getState()
// function getState(params) {
//     const cpuStat = require('cpu-stat')
//     cpuStat.usagePercent((err,percent)=>{
//         console.log(`cpu占用${percent}%`);
//     }) 
// }

//setInterval(getState, 1000);


const {getState} = require('./state');  //模块引入操作
//setInterval(getState, 1000);