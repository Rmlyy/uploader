module.exports = function() {
    const totalUploads = require('./totalUploads')
    const totalSize = require('./totalSize')

    process.env.TOTAL = totalUploads()
    process.env.SIZE = totalSize()
}