const express = require('express')
const { body } = require('express-validator')

const controllers = require('../controllers/userControllers')
const { checkValidationResult } = require('../middlewares/validationMiddlewares')
const {checkLogin} = require("../middlewares/userMiddlewares");

const router = express.Router()

router.post("/api/login",
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 8}),
    checkValidationResult,
    controllers.login
)

router.post("/api/register",
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 8}),
    body('name').trim().isLength({min:1}), // is not empty
    checkValidationResult,
    controllers.register
)


router.get('/api/find-customer-support-agent',
    checkLogin,
    controllers.findCustomerSupportAgent
)

module.exports = router