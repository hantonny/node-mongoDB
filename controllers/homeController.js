exports.index = (request, response) => {
  const obj = {
    pagetitle: 'Home',
    userInfo: request.userInfo
  }
  response.render('home', obj)
}
