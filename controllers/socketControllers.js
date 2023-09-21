const jwt = require("jsonwebtoken");
const redis = require('../redis')

exports.socketConnectionHandler = (socket) => {
    const cookies = socket.request.headers.cookie
    const client = redis.getClient()

    client.set("0", "0")
    if(!cookies){
        return socket.disconnect()
    }

    const authKey = cookies['authKey']

    if(!authKey){
        return socket.disconnect()
    }

    let decodedAuthKey

    try {
        decodedAuthKey = jwt.verify(authKey, process.env.JWT_TOKEN)
    }

    catch (e) {
        return socket.disconnect()
    }

    const userId = decodedAuthKey.id
    const socketId = socket.id

    //set user socket session
    redis.set(userId, socketId)
}