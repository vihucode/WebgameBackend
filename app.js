const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const usersRouter = require('./controllers/users')
const categoriesRouter = require('./controllers/categories')
const cors = require('cors')

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/categories', categoriesRouter)

module.exports = app