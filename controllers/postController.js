const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.add = (requeste, response) => {
  response.render('postAdd')
}
exports.addAction = async (request, response) => {
  const post = new Post(request.body)
  await post.save()

  request.flash('success', 'Post salvo com sucesso!')

  response.redirect('/')
}
