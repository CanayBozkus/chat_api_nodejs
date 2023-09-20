const express = require('express')
const { body } = require('express-validator')

const controllers = require('../controllers/userControllers')

const router = express.Router()

router.post("/api/login",
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 8}),
    controllers.login
)

router.post("/api/register",
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 8}),
    body('name').trim().isLength({min:1}), //
    controllers.register
)


module.exports = router