const express = require('express')
const upload = require('express-fileupload')
const fs = require('fs')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const random = require('./utils/generateString')
const updateCache = require('./utils/updateCache')
const credentials = require('./credentials.json')
const app = express()
require('dotenv').config()

if (!credentials.password || !credentials.password.startsWith('$2b$10$')) {
    const randomPassword = random(16)
    console.log(`Admin password: ${randomPassword}`)
    bcrypt.hash(randomPassword, 10, function (err, hash) {
        if (err) return console.log(err)
        credentials.password = hash
        fs.writeFileSync('./credentials.json', JSON.stringify(credentials, null, "\t"))
    });
}

app.use(upload())
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.disable('x-powered-by')

const indexRouter = require('./routes/index')
const uploadRouter = require('./routes/upload')
const viewRouter = require('./routes/view')
const rawRouter = require('./routes/raw')
const dlRouter = require('./routes/dl')
const deleteRouter = require('./routes/delete')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const renameRouter = require('./routes/rename')
const dashboardRouter = require('./routes/dashboard')

app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/dashboard', dashboardRouter)
app.use('/', indexRouter)
app.use('/', viewRouter)
app.use('/', uploadRouter)
app.use('/raw', rawRouter)
app.use('/dl', dlRouter)
app.use('/delete', deleteRouter)
app.use('/rename', renameRouter)

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})

updateCache()