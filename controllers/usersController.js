const User = require('../models/User')
const crypto = require('crypto')
const mailHandler = require('../handlers/mailHandlers')
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

exports.profileAction = async (request, response) => {
  try {
  const user = await User.findOneAndUpdate(
    { _id: request.user._id },
    { name: request.body.name, email: request.body.email },
    { new: true, runValidators: true }
  )

  } catch (e) {
    request.flash('error', 'Ocorreu algum erro: ' + e.message)
    response.redirect('/profile')
    return
  }
  request.flash('success', 'Dados atualizados com sucesso!')
  response.redirect('/profile')
}

exports.forget = (request, response) => {
  response.render('forget')
}

exports.forgetAction = async (request, response) => {
  const user = await User.findOne({ email: request.body.email }).exec()

  if (!user) {
    request.flash('error', 'E-mail não cadastrado')
    response.redirect('/users/forget')
    return
  }

  user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  user.resetPasswordExpires = Date.now() + 3600000

  await user.save()

  const resetLink = `http://${request.headers.host}/users/reset/${user.resetPasswordToken}`

  const to = `${user.name} <${user.email}>`
  const html = `Resetar sua senha:<br/><a href="${resetLink}">Clique aqui</a>`
  const text = `Resetar sua senha: ${resetLink}`

  mailHandler.send({
    to,
    subject: 'Resetar sua senha',
    html,
    text
  })

  request.flash('success', 'Enviamos um e-mail com instruções.')
  response.redirect('/users/login')

}

exports.forgetToken = async (request, response) => {
  const user = await User.findOne({
    resetPasswordToken: request.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  }).exec()
  if (!user) {
    request.flash('error', 'Token expirado!')
    response.redirect('/users/forget')
    return
  }

  response.render('forgetPassword')
}
exports.forgetTokenAction = async (request, response) => {
  const user = await User.findOne({
    resetPasswordToken: request.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  }).exec()
  if (!user) {
    request.flash('error', 'Token expirado!')
    response.redirect('/users/forget')
    return
  }
  if (request.body.password !== request.body['password-confirm']) {
    request.flash('error', 'Senhas não são iguais!')
    response.redirect('back')
  }

  user.setPassword(request.body.password, async () => {
    await user.save()
    request.flash('success', 'Senha alterada com sucesso!')
    response.redirect('/')
  })
}
