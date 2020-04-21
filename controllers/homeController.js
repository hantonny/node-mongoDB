exports.userMiddleware = (request, response, next) => {
  const info = { name: 'Hantonny', id: 123 }
  request.userInfo = info
  next()
}

exports.index = (request, response) => {
  const obj = {
    pagetitle: 'Home',
    userInfo: request.userInfo
  }
  response.render('home', obj)
}
