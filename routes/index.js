const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', { name: process.env.NAME })
})

module.exports = router