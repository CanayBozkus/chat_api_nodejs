const {validationResult} = require("express-validator");

exports.checkValidationResult = (req, res, next) => {
    const validationErrors = validationResult(req)

    if(validationErrors.isEmpty()){
        return next()
    }

    const missingFields = validationErrors.array().map(obj => obj.path).join(', ')

    return res.json({success: false, msg: `Missing fields: ${missingFields}`})
}