const socket = require('socket.io')
const controllers = require("./controllers/socketControllers");

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
    },

    initListeners: () => {
        io.on('connection', controllers.socketConnectionHandler)
    }
}