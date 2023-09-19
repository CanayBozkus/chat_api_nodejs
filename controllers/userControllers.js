const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const validationErrors = validationResult(req)

    if(!validationErrors.isEmpty()){
        return res.json({success: false, msg: validationErrors.array()})
    }

    const email = req.body.email
    const password = req.body.password

    //TODO: Send request to your necessary APIs to check if credentials okay
    const result = true

    if(!result){
        return res.json({success: false, msg: "Invalid credentials"})
    }

    const authToken = jwt.sign(
        {
            id: 1,
            email,
            date: Date.now()
        },
        process.env.JWT_TOKEN
    )

    const cookieConfig = {
        httpOnly: true,
        //secure: true // for https requests,
        maxAge: 36000
    }

    //TODO: change 'authKey' key to a secret key
    res.cookie('authKey', authToken, cookieConfig)

    res.json({success: true})
}