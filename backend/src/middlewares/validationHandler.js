const { validationResult } = require('express-validator');

const validationHandler = (req , res , next) => {
    const errors = validationResult(req) ; 
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0]; // { msg, param, ... }
        res.error(400 , firstError.msg) ; 
        return ; 
    }
    next() ; 
}

module.exports = {validationHandler} ; 