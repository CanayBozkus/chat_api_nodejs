const express = require('express')
const { body } = require('express-validator')

const controllers = require('../controllers/messageControllers')
const { checkValidationResult } = require('../middlewares/validationMiddlewares')
const { checkLogin } = require('../middlewares/userMiddlewares')

const router = express.Router()

router.post('/api/send-message',
    checkLogin,
    body('from').isLength({min: 24, max: 24}), //Mongodb object id length is 24
    body('to').isLength({min: 24, max: 24}),
    body('message').notEmpty(),
    checkValidationResult,
    controllers.sendMessage
)

router.get('/api/get-messages',
    checkLogin,
    controllers.getMessages
)


module.exports = router