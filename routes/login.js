const router = require('express').Router()
const bcrypt = require('bcrypt')
const credentials = require('../credentials.json')
const isLoggedIn = require('../utils/isLoggedIn')
const random = require('../utils/generateString')

router.get('/', (req, res) => {
  if (!isLoggedIn(req)) {
    res.render('login', {
      name: process.env.APP_NAME,
      url: process.env.URL,
      msg: null
    })
  } else {
    res.redirect('/')
  }
})

router.post('/', (req, res) => {
  const user = req.body.user
  const password = req.body.password

  if (user !== credentials.user) return res.status(401).render('login', {
    name: process.env.NAME,
    msg: 'Invalid username or password.'
  })
  bcrypt.compare(password, credentials.password, function (err, result) {
    if (!result) return res.status(401).render('login', {
      name: process.env.NAME,
      msg: 'Invalid username or password.'
    })
    const options = {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
    }
    res.cookie('session', random(32), options)
    res.redirect('/dashboard')
  });
})

module.exports = router