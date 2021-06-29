const express = require('express')
const router = express.Router()

const template = require('string-placeholder')
const totalUploads = require('../utils/totalUploads')
const totalSize = require('../utils/totalSize')

router.get('/', (req, res) => {
    const statistics = template(process.env.STATISTICS, {
        total: totalUploads(),
        size: totalSize()
    })

    res.render('index', {
        name: process.env.NAME,
        statistics: statistics
    })
})

module.exports = router