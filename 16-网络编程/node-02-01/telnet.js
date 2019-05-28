//sokect协议的小demo

const net = require('net')
const chatServer = net.createServer()
const clientList = []
chatServer.on('connection',client=>{ //当它收到一个事件的时候
    client.write('Hi\n')
    clientList.push(client)
    client.on('data',data=>{
        console.log('receive',data.toString()) //收到二进制buffer数据
        clientList.forEach(v => { //广播出去
            v.write(data)
        });
    })
})
chatServer.listen(9000)
