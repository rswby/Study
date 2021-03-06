var dgram = require('dgram');
//udp不是面向连接的,没有流,是一个封装了数据包函数功能的EventEmitter。
var udp = dgram.createSocket('udp4').
on('message', (data, info) => {
    console.log(data.toString(), info);
}).
on('error', err => {
    console.log(err.message);
}).
on('listening', function() {
    console.log('listening', arguments);
}).
on('close', function() {
    console.log('close', arguments); //调用udp.close时触发,而且不在触发message事件,想要再次接收数据需要udp.bind
});
//udp.bind绑定一个接口用于接手数据 udp.close关闭bind udp.send发送数据
udp.bind(2104, 'localhost', function() {
    console.log('正在监听2014端口', arguments);
});
var data = new Buffer('ni hao ma');
udp.send(data, /*offset*/ 0, /*bufferLength*/ data.length, 4012, 'localhost', function() {
    console.log('数据发送', arguments);
}); //除了data port 其他都是可选的.而且上面所写的都是默认值
//可以向多个端口传递数据 如果发送的端口没有别监听,数据会丢失
