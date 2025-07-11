const express = require('express')
const cors = require('cors') ; 
// Middlewares 
const responseHandler = require('@/middlewares/responseHandler') ; 
const errorHandler = require('@/middlewares/errorHandler') ; 

//Router 
const userRoutes = require("@/routes/user.routes") ; 

const app = express() ; 
app.use(express.json()) ;
app.use(cors({
    origin:'http://localhost:5173' ,
    credentials : true
}))
app.use(responseHandler) ;

app.use('/api/user' , userRoutes)


app.use(errorHandler)
module.exports = app ; 

    