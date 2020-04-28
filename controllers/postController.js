const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.view = async (request, response) => {
  const post = await Post.findOne({ slug: request.params.slug })

  response.render('view', { post })
}

exports.add = (requeste, response) => {
  response.render('postAdd')
}
exports.addAction = async (request, response) => {
  request.body.tags = request.body.tags.split(',').map(t => t.trim())
  const post = new Post(request.body)

  try {
    await post.save()
  } catch (error) {
    request.flash('error', 'Erro: ' + error.message)
    return response.redirect('/post/add')
  }

  request.flash('success', 'Post salvo com sucesso!')

  response.redirect('/')
}
exports.edit = async (request, response) => {
  const post = await Post.findOne({ slug: request.params.slug })

  response.render('postEdit', { post })
}
exports.editAction = async (request, response) => {
  request.body.slug = require('slug')(request.body.title,
    { lower: true })
  request.body.tags = request.body.tags.split(',').map(t => t.trim())

  try {
    await Post.findOneAndUpdate(
      { slug: request.params.slug },
      request.body,
      {
        new: true,
        runValidators: true
      })
  } catch (error) {
    request.flash('error', 'Erro: ' + error.message)
    return response.redirect('/post/' + request.params.slug + '/edit')
  }

  request.flash('success', 'Post atualizado com sucesso!')

  response.redirect('/')
}
