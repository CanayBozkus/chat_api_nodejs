const redis = require('redis')

let client

module.exports = {
    init: async () => {
        try {
            client = await redis.createClient({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
                socket: {
                    host: process.env.REDIS_HOST,
                    port: process.env.REDIS_PORT
                },
                legacyMode: true
            })
            await client.connect()
            client.on('connection', () => console.log('Redis Connected'))
            client.on('error', (err) => console.log("redis error", err))
        }

        catch (e){
            console.log("Redis connection error", e, process.env.REDIS_HOST)
        }
    },
    getClient: () => {
        return client
    }
}
