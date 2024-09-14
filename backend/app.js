require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express();
const errorHandlerMiddleware = require('../backend/middleware/errorHandler.js')
const notFound = require('../backend/middleware/notFound.js')


app.use(errorHandlerMiddleware)
app.use(notFound)

module.exports = app