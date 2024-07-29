const express = require ('express')
require('dotenv').config()
require('express-async-errors')

const connectDb = require('./db/connect')

const authRouter = require('./routes/authRoute')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const morgan = require('morgan')


const app = express()

app.use(morgan('tiny'))
app.use(express.json())

app.use('api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 5000
const start = async() => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => console.log(`server started on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()