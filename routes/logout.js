const router = require('express').Router()
const isLoggedIn = require('../utils/isLoggedIn')

router.get('/', (req, res) => {
  if (!isLoggedIn(req)) return res.status(401).send('You are not logged in!')
  res.clearCookie('session')
  res.redirect('/')
})

module.exports = router