const User = require('../models/User')
exports.login = (request, response) => {
  response.render('login')
}

exports.register = (request, response) => {
  response.render('register')
}
exports.registerAction = (request, response) => {
  const newUser = new User(request.body)
  User.register(newUser, request.body.password, (error) => {
    if (error) {
      console.log('Erro ao registrar:', error)
      response.redirect('/')
      return
    }
    response.redirect('/')
  })
}
