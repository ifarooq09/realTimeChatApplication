require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const errorHandlerMiddleware = require('../backend/middleware/errorHandler.js')
const notFound = require('../backend/middleware/notFound.js')

const authRouter = require('../backend/routers/authRouter.js')
const contactRouter = require('../backend/routers/contactRouter.js')
const messagesRouter = require('../backend/routers/messagesRouter.js')
const groupRouter = require('../backend/routers/groupRoutes.js')

// middleware
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

  app.use("/uploads/profiles", express.static("uploads/profiles"))
  app.use("/uploads/files", express.static("uploads/files"))
  
  app.use(cookieParser());
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    next();
  });


//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contacts', contactRouter )
app.use('/api/v1/messages', messagesRouter)
app.use('/api/v1/groups', groupRouter)

app.use(errorHandlerMiddleware)
app.use(notFound)

module.exports = app