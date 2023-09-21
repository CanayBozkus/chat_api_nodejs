const redis = require('redis')

let client

module.exports = {
    init: async () => {
        client = await redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
        await client.connect()
        client.on('connection', () => console.log('Redis Connected'))
        client.on('error', (err) => console.log("redis error", err))
    },
    getClient: () => {
        return client
    }
}
