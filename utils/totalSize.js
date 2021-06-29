const fs = require('fs')
const path = require('path')
const bytesToSize = require('../utils/bytesToSize')

module.exports = function() {
    const a = []

    fs.readdirSync('./uploads').forEach(dir => {
        fs.readdirSync(`./uploads/${dir}`).forEach(file => {
            if (file.endsWith('.json')) return
            if (file.endsWith('.md')) return

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
            }

            a.push(fs.statSync(finalPath).size)
        })
    })

    for (var i = 0, sum = 0; i < a.length; sum += a[i++]);

    return bytesToSize(sum)
}