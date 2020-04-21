const express = require('express')
const router = require('./routes/index')
const mustache = require('mustache-express')
const path = require('path')
const helpers = require('./helpers')
const app = express()

app.use((request, response, next) => {
  response.locals.h = helpers
  response.locals.teste = '123'
  next()
})

app.use(express.json())

app.use('/', router)

app.engine('mst', mustache(path.join('Views/Partials')))

app.set('view engine', 'mst')

app.set('views', path.join('Views'))

module.exports = app
