require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const projectRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
// const userProfileRoutes = require('./routes/userProfile')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body)
  next()
})

// routes
app.use('/api/products', projectRoutes)
app.use('/api/user', userRoutes)
// app.use('/api/profile', userProfileRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
app.listen(process.env.PORT, () => {
  console.log('connected to db listening on port', process.env.PORT)
})
  })
  .catch((error) => {
    console.log(error)
  })
