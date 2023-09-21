const fs = require('fs')

module.exports = (api, error) => {
    fs.writeFileSync(`./logs/log_${Date.now()}.txt`, `In API ${api}: ${error}`)
}