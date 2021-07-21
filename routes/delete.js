const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const getPath = require('../utils/path')
const updateCache = require('../utils/updateCache')

router.get('/:file', (req, res) => {
    const { file } = req.params
    const { key } = req.query

    if (getPath(file)) {
        const fileData = require(`../uploads/data/${file}.json`)

        if (fileData.key === key) {
            fs.unlinkSync(getPath(file))
            fs.unlinkSync(`${path.dirname(require.main.filename)}/uploads/data/${file}.json`)
            res.send('File sucessfully deleted.')
            updateCache()
        } else res.status(401).send('Invalid deletion key.')
    } else res.status(404).render('404')
})

module.exports = router