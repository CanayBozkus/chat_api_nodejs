const fs = require('fs')

module.exports = (api, error) => {
    try {
        fs.writeFileSync(`./logs/log_${Date.now()}.txt`, `In API ${api}: ${error}`)
    }
    catch (e) {
        
    }
   
}