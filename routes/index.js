const router = require('express').Router()
const template = require('string-placeholder')
const isLoggedIn = require('../utils/isLoggedIn')

router.get('/', (req, res) => {
    const statistics = template(process.env.STATISTICS, {
        total: process.env.TOTAL,
        size: process.env.SIZE
    })

    res.render('index', {
        name: process.env.APP_NAME,
        statistics: statistics,
        loggedIn: isLoggedIn(req)
    })
})

module.exports = router