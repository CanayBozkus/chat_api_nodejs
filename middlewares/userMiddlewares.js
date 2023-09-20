const jwt = require('jsonwebtoken')

exports.checkLogin = (req, res, next) => {
    const authKey = req.cookies['authKey']

    if(!authKey){
        return res.status(401).json({success: false, msg: "Login Required"})
    }

    let decodedAuthKey

    try {
        decodedAuthKey = jwt.verify(authKey, process.env.JWT_TOKEN)
    }

    catch (e) {
        return res.json({ success: false, msg: "Invalid token"})
    }

    req.userId = decodedAuthKey.id
    req.email = decodedAuthKey.email
    next()
}