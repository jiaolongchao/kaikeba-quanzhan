// // 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();

// // 创建事件处理程序
// var connectHandler = function connected() {
//    console.log('连接成功。');

//    // 触发 data_received 事件
//    eventEmitter.emit('data_received');
// }

// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);

// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function(){
//    console.log('数据接收成功。');
// });

// // 触发 connection 事件
// eventEmitter.emit('connection');

// console.log("程序执行完毕。");


var events = require('events')
var emit = new events.EventEmitter()

var listener1 = function listener1(){
   console.log('监听器 listen1 执行')
}

var listener2 = function listener2(){
   console.log('监听器 list2 执行')
}

emit.addListener('connection',listener1)
emit.on('connection',listener2)

var eventListeners = emit.listenerCount('connection')
console.log(eventListeners + " 个监听器监听连接事件")

emit.emit('connection')

emit.removeListener('connection',listener1)
console.log("listener1 不再受监听。");

eventListeners = emit.listenerCount('connection')
console.log(eventListeners + " 个监听器监听连接事件。");

emit.emit('connection')


