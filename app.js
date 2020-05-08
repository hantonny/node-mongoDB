const express = require('express')
const router = require('./routes/index')
const mustache = require('mustache-express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const path = require('path')
const helpers = require('./helpers')
const errorHandlers = require('./handlers/errorHandlers')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join('Public')))

app.use(cookieParser(process.env.SECRET))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use((request, response, next) => {
  response.locals.h = helpers
  response.locals.teste = '123'
  response.locals.flashes = request.flash()
  next()
})
app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/User')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/', router)

app.use(errorHandlers.notFound)

app.engine('mst', mustache(path.join('Views/Partials')))

app.set('view engine', 'mst')

app.set('views', path.join('Views'))

module.exports = app
