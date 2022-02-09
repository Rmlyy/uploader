module.exports = function () {
    process.env.TOTAL = require('./totalUploads')()
    process.env.SIZE = require('./totalSize')()
    console.log(`Cache updated. ${process.env.TOTAL}:${process.env.SIZE}`)
}