const router = require('express').Router()

const fs = require('fs')
const path = require('path')
const imgSize = require('image-size')
const placeholder = require('string-placeholder')

router.get('/:file', (req, res) => {
    const { file } = req.params
    const extension = require('../utils/checkExtension')
    const color = require('../utils/color')
    const getSize = require('../utils/getSize')

    if (extension(file) === 'image') {
        const imagePath = `${path.dirname(require.main.filename)}/uploads/images/${file}`

        if (fs.existsSync(imagePath)) {
            const dimensions = imgSize(imagePath)
            const imageData = require(`../uploads/data/${file}.json`)

            const header = placeholder(process.env.IMAGE_HEADER, {
                name: file,
                size: getSize(imagePath),
                width: dimensions.width,
                height: dimensions.height
            })

            const cardTitle = placeholder(process.env.IMAGE_CARD_TITLE, {
                name: file,
                size: getSize(imagePath),
                width: dimensions.width,
                height: dimensions.height
            })

            const cardDescription = placeholder(process.env.IMAGE_CARD_DESCRIPTION, {
                uploadedAt: imageData.date
            })

            res.render('view', {
                image: true,
                text: false,
                video: false,
                header: header,
                cardTitle: cardTitle,
                cardDescription: cardDescription,
                appName: process.env.NAME,
                name: file,
                color: `${color()}`,
                uploadedAt: imageData.date,
                rawurl: `${process.env.URL}/raw/${file}`,
                dlurl: `${process.env.URL}/dl/${file}`
            })
        } else res.status(404).render('404')

    } else if (extension(file) === 'text') {
        const filePath = `${path.dirname(require.main.filename)}/uploads/text/${file}`

        if (fs.existsSync(filePath)) {
            const filter = require('../utils/filterTags')
            const fileData = require(`../uploads/data/${file}.json`)
            const fileContent = fs.readFileSync(`./uploads/text/${file}`, 'utf-8')
            const words = fileContent.length

            const header = placeholder(process.env.TEXT_HEADER, {
                name: file,
                size: getSize(filePath),
                words: words
            })

            const cardTitle = placeholder(process.env.TEXT_CARD_TITLE, {
                name: file,
                size: getSize(filePath),
                words: words
            })

            const cardDescription = placeholder(process.env.TEXT_CARD_DESCRIPTION, {
                uploadedAt: fileData.date
            })

            res.render('view', {
                text: true,
                image: false,
                video: false,
                header: header,
                cardTitle: cardTitle,
                cardDescription: cardDescription,
                appName: process.env.NAME,
                name: file,
                size: getSize(filePath),
                color: `${color()}`,
                uploadedAt: fileData.date,
                content: filter(fileContent),
                url: `${process.env.URL}/${file}`,
                rawurl: `${process.env.URL}/raw/${file}`,
                dlurl: `${process.env.URL}/dl/${file}`
            })
        } else res.status(404).render('404')
    } else {
        const filePath = extension(file) === 'video' ? `${path.dirname(require.main.filename)}/uploads/videos/${file}` : `${path.dirname(require.main.filename)}/uploads/uncategorized/${file}`

        if (fs.existsSync(filePath)) {
            const fileData = require(`../uploads/data/${file}.json`)
            const header = placeholder(process.env.UNCATEGORIZED_HEADER, {
                name: file,
                size: getSize(filePath)
            })

            const cardTitle = placeholder(process.env.UNCATEGORIZED_CARD_TITLE, {
                name: file,
                size: getSize(filePath)
            })

            const cardDescription = placeholder(process.env.UNCATEGORIZED_CARD_DESCRIPTION, {
                uploadedAt: fileData.date
            })

            res.render('view', {
                text: false,
                image: false,
                video: extension(file) === 'video' ? true : false,
                header: header,
                cardTitle: cardTitle,
                cardDescription: cardDescription,
                appName: process.env.NAME,
                name: file,
                size: getSize(filePath),
                color: `${color()}`,
                uploadedAt: fileData.date,
                url: `${process.env.URL}/${file}`,
                rawurl: `${process.env.URL}/raw/${file}`,
                dlurl: `${process.env.URL}/dl/${file}`
            })
        } else res.status(404).render('404')
    }
})

module.exports = router