const fs = require('fs')
const filesize = require("filesize");

module.exports = function (path) {
    const stats = fs.statSync(path)
    return filesize(stats.size, { round: 0 });
}