require('dotenv').config()
require('express-async-errors')

//Server
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//Netlify Serverless
const serverless = require('serverless-http');

//Router
const ipRouter = require('./routes/checkIpRoute');

//Middlewares
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

//Security dependencies declaration
const cors = require('cors');
const helmet = require('helmet')
const rateLimiter = require('express-rate-limit')

//Enable json objects use
app.use(express.json())

//Security packages
app.use(cors());
app.use(helmet());
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))

//Routes
app.get('/.netlify/functions/app/', (req, res) => {
    res.send('<h1>IpChecker</h1>')
})
app.use('/.netlify/functions/app/api/v1/ip', ipRouter);
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})

module.exports.handler = serverless(app);