const router = require('express').Router()
const path = require('../utils/path')

router.get('/:file', (req, res) => {
    const { file } = req.params

    if (path(file)) {
        res.set("Content-Disposition", `attachment;filename=${file}`)
        res.sendFile(path(file))
    } else res.status(404).render('404')
})

module.exports = router