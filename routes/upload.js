const router = require('express').Router()
const path = require('path')
const fs = require('fs')

router.post('/', (req, res) => {
    const { secret, onlyURL } = req.query
    const { file } = req.files

    if (secret !== process.env.SECRET) {
        return res.status(401).send('Invalid secret key')
    }

    if (!file) {
        return res.status(400).send('No file was uploaded.')
    }

    const generateString = require('../utils/generateString')
    const fileName = `${generateString(5)}${path.extname(file.name)}`
    const deletionKey = generateString(8)
    const date = new Date()

    let uploadPath
    const extension = require('../utils/checkExtension')

    if (extension(file.name) === 'image') {
        uploadPath = `${path.dirname(require.main.filename)}/uploads/images/${fileName}`
    } else if (extension(file.name) === 'text') {
        uploadPath = `${path.dirname(require.main.filename)}/uploads/text/${fileName}`
    } else if (extension(file.name) === 'video') {
        uploadPath = `${path.dirname(require.main.filename)}/uploads/videos/${fileName}`
    } else {
        uploadPath = `${path.dirname(require.main.filename)}/uploads/uncategorized/${fileName}`
    }

    file.mv(uploadPath, function (err) {
        if (err) {
            console.error(err)
            return res.status(500).send('There was an error. Please try again later.')
        }

        const buildData = {
            date: date.toLocaleString(),
            key: deletionKey
        }

        const data = JSON.stringify(buildData)
        fs.writeFileSync(`./uploads/data/${fileName}.json`, data)

        if (onlyURL == '1') {
            return res.send(`${process.env.URL}/${fileName}`)
        }
        res.send({
            url: `${process.env.URL}/${fileName}`,
            deletionUrl: `${process.env.URL}/delete/${fileName}?key=${deletionKey}`
        })

    })
})

module.exports = router