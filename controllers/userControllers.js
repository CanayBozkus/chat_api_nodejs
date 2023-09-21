const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const UserSchema = require('../models/userModel')

exports.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    let user
    try {
        user = await UserSchema.findOne({email: email})
    }

    catch (err){
        return res.status(500).json({success: false, msg: "Please try again later"})
    }

    if(!user){
        return res.status(400).json({success: false, msg: "User does not exists"})
    }

    const result = await bcrypt.compareSync(password, user.password)

    if(!result){
        return res.json({success: false, msg: "Invalid credentials"})
    }

    const authToken = jwt.sign(
        {
            id: user.id,
            email,
            date: Date.now()
        },
        process.env.JWT_TOKEN
    )

    const cookieConfig = {
        httpOnly: true,
        //secure: true // for https requests,
        maxAge: 86400000
    }

    //TODO (optional): change 'authKey' key to a secret key
    res.cookie('authKey', authToken, cookieConfig)

    res.json({success: true, userId: user.id})
}

exports.register = async (req, res) => {
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

    const passwordHash = bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT))

    const user = new UserSchema({
        name: name,
        email: email,
        password: passwordHash
    })

    try {
        const result = await user.save()

        if(Object.keys(result).length === 0){
            return res.status(500).json({success: false, msg: "Please try again later"})
        }

        return res.json({success: true})
    }

    catch (e){
        console.log(e)
        return res.status(500).json({success: false, msg: "Please try again later"})
    }
}