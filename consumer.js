const { io } = require('socket.io-client')
console.log(1)
const socket = io.connect('http://127.0.0.1:3000', {reconnect: true})
console.log(2)
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('CH01', 'me', 'test msg');

