import io from 'socket.io-client' // 引入客户端

// 连接服务端,得到服务器的连接对象
const socket = io('ws://localhost:3000')

// 绑定监听，接收服务器发送的消息
socket.on('serve-sendMsg',function (data) {  
  console.log('客户端接收到服务端发的消息',data);
})

// 发送消息
socket.emit('client-sendMsg',{msg:'我是客户端发的消息'})
console.log('客户端向服务端发送消息',{msg:'我是客户端发的消息'});

