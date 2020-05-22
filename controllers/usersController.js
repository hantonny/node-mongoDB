const User = require('../models/User')
exports.login = (request, response) => {
  response.render('login')
}

exports.loginAction = (request, response) => {
  const auth = User.authenticate()

  auth(request.body.email, request.body.password, (error, result) => {
    if (!result) {
      request.flash('error', 'Seu email e/ou senha estão errados')
      response.redirect('/users/login')
      return
    }
    
    request.login(result, () => {})

    request.flash('success', 'Você foi logado com sucesso!')
    response.redirect('/')
  })
}

exports.register = (request, response) => {
  response.render('register')
}
exports.registerAction = (request, response) => {
  const newUser = new User(request.body)
  User.register(newUser, request.body.password, (error) => {
    if (error) {
      request.flash('error', 'Ocorreu um erro, tente mais tarde')
      response.redirect('/users/register')
      return
    }
    request.flash('success', 'Registro efetuado com sucesso. Faça login.')
    response.redirect('/users/login')
  })
}

exports.logout = (request, response) => {
  request.logout()
  response.redirect('/')
}

exports.profile = (request, response) => {
  response.render('profile')
}
