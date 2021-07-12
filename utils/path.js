const path = require('path')
const fs = require('fs')

module.exports = function(file) {
    const imagesPath = `${path.dirname(require.main.filename)}/uploads/images/${file}`
    const textPath = `${path.dirname(require.main.filename)}/uploads/text/${file}`
    const videosPath = `${path.dirname(require.main.filename)}/uploads/videos/${file}`
    const uncategorizedPath = `${path.dirname(require.main.filename)}/uploads/uncategorized/${file}`

    if (fs.existsSync(imagesPath)) {
        return imagesPath
    } else if (fs.existsSync(textPath)) {
        return textPath
    } else if (fs.existsSync(videosPath)) {
        return videosPath
    } else if (fs.existsSync(uncategorizedPath)) {
        return uncategorizedPath
    } else return false
}