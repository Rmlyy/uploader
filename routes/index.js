const router = require('express').Router()

const template = require('string-placeholder')

router.get('/', (req, res) => {
    const statistics = template(process.env.STATISTICS, {
        total: process.env.TOTAL,
        size: process.env.SIZE
    })

    res.render('index', {
        name: process.env.NAME,
        statistics: statistics
    })
})

module.exports = router