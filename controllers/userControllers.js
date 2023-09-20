const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const UserSchema = require('../models/userModel')

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

exports.register = async (req, res) => {
    const validationErrors = validationResult(req)

    if(!validationErrors.isEmpty()){
        return res.json({success: false, msg: validationErrors.array()})
    }

    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    try {
        const existUser = await UserSchema.findOne({email: email})

        if(existUser){
            return res.status(400).json({success: false, msg: "Email is already used"})
        }
    }

    catch (err){
        return res.status(500).json({success: false, msg: "Please try again later"})
    }

    const passwordHash = bcrypt.hashSync(password, process.env.BCRYPT_SALT)

    const user = new UserSchema({
        name: name,
        email: email,
        password: passwordHash
    })

    try {
        const res = await user.save()
        return res.json({success: true})
    }

    catch (e){
        return res.status(500).json({success: false, msg: "Please try again later"})
    }
}