const cpuStat = require('cpu-stat')

module.exports.getState = function(){
    cpuStat.usagePercent((err,percent)=>{
        console.log(`cpu占用${percent}%`);
    }) 
}