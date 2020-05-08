const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.index = async (request, response) => {
  const responseJson = {
    pagetitle: 'Home',
    posts: [],
    tags: [],
    tag: ''
  }
  responseJson.tag = request.query.t
  const postFilter = (typeof responseJson.tag !== 'undefined') ? { tags: responseJson.tag } : {}

  const tagsPromise = Post.getTagsList()
  const postsPromise = Post.find(postFilter)

  const [tags, posts] = await Promise.all([tagsPromise, postsPromise])

  for (const i in tags) {
    if (tags[i]._id === responseJson.tag) {
      tags[i].class = 'selected'
    }
  }
  responseJson.tags = tags
  responseJson.posts = posts

  response.render('home', responseJson)
}
