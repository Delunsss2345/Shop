const responseHandler = (req , res , next) => {
    res.success = (status , message , data = {}) => {
        return res.status(status).json({success : true ,message , data}) ; 
    }

    res.error = (status , message) => {
        return res.status(status).json({success : false , message})
    }
    next() ; 
}

module.exports = responseHandler ; 