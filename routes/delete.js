const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

router.get('/:file', (req, res) => {
    const { file } = req.params
    const { key } = req.query
    const imagesPath = `${path.dirname(require.main.filename)}/uploads/images/${file}`
    const textPath = `${path.dirname(require.main.filename)}/uploads/text/${file}`
    const videosPath = `${path.dirname(require.main.filename)}/uploads/videos/${file}`
    const uncategorizedPath = `${path.dirname(require.main.filename)}/uploads/uncategorized/${file}`
    let finalPath

    if (fs.existsSync(imagesPath)) {
        finalPath = imagesPath
    } else if (fs.existsSync(textPath)) {
        finalPath = textPath
    } else if (fs.existsSync(videosPath)) {
        finalPath = videosPath
    } else if (fs.existsSync(uncategorizedPath)) {
        finalPath = uncategorizedPath
    } else return res.status(404).render('404')

    const fileData = require(`../uploads/data/${file}.json`)

    if (fileData.key === key) {
        fs.unlinkSync(finalPath)
        fs.unlinkSync(`${path.dirname(require.main.filename)}/uploads/data/${file}.json`)
        res.send('File sucessfully deleted.')
    } else return res.status(401).send('Invalid deletion key.')
})

module.exports = router