const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  const obj = {
    'nome': 'Hantonny',
    'idade': 24
  }
  response.render('home', obj)
})

module.exports = router
