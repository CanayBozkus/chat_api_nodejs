const socket = require('socket.io')

let io

module.exports = {
    init: server => {
        io = socket(server, { cors: { origin : "*"} })
    },
    getIO: () => {
        if(!io){
            throw new Error('IO not initialized')
        }
        return io
    }
}