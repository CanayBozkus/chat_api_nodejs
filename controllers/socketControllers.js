const jwt = require("jsonwebtoken");
const redis = require('../redis')

exports.socketConnectionHandler = async (socket) => {
    const cookies = socket.request.headers.cookie

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

    const client = redis.getClient()

    //set user socket session
    await client.set(userId, socketId)
}