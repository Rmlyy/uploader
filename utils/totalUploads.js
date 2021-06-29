const fs = require('fs')

module.exports = function() {
    let counter = 0

    fs.readdirSync('./uploads').forEach(dir => {
        fs.readdirSync(`./uploads/${dir}`).forEach(file => {
            if (file.endsWith('.json')) return
            if (file.endsWith('.md')) return
            counter++
        })
    })

    return counter
}