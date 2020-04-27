const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.index = async (request, response) => {
  const responseJson = {
    pagetitle: 'Home',
    posts: []
  }
  const posts = await Post.find()
  responseJson.posts = posts

  response.render('home', responseJson)
}
