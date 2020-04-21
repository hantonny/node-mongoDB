const express = require('express')
const router = require('./routes/index')
const mustache = require('mustache-express')
const path = require('path')
const app = express()

app.use('/', router)

app.use(express.json())

app.engine('mst', mustache())

app.set('view engine', 'mst')

app.set('views', path.join('Views'))

module.exports = app
