//等待下一个事件队列
(new Promise(resolve =>{
    console.log('resolve')
    resolve()
})).then(
    ()=> console.log('promise then...')
)

setImmediate( ()=>{
    console.log('set setImmediate...')
})

setTimeout(() => {
    console.log('setTimeout ...')
}, 0);

process.nextTick(()=> console.log('nextTick...'))

//resolve
// nextTick...
// promise then...
// setTimeout ...
// set setImmediate...