const fs = require('fs')
const bytesToSize = require('../utils/bytesToSize')

module.exports = function (path) {
    return bytesToSize(fs.statSync(path).size)
}