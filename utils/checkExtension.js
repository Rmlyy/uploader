const path = require('path')

module.exports = function(file) {
    const extension = path.extname(file)

    if (extension === '.png') return 'image'
    else if (extension === '.jpg') return 'image'
    else if (extension === '.gif') return 'image'
    else if (extension === '.jpeg') return 'image'
    else if (extension === '.txt') return 'text'
    else if (extension === '.mp4') return 'video'
}