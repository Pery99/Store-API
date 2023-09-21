require('dotenv').config();
const express = require('express');
const app = express();
require('express-async-errors')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productRouter = require('./routers/productRouter')

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('<h1>Shop API</h1><a href="api/vi/productd">product api</a>');
})


app.use('/api/v1/products', productRouter)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`app is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start();
