const redis = require('redis')

let client

module.exports = {
    init: async () => {
        try {
            client = await redis.createClient({
                socket: {
                    host: process.env.REDIS_HOST,
                    port: process.env.REDIS_PORT
                },
                legacyMode: true
            }).connect()
        }

        catch (e){
            console.log("Redis connection error", e, process.env.REDIS_HOST)
        }
    },
    getClient: () => {
        return client
    }
}
