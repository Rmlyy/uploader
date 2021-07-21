const express = require('express')
const upload = require('express-fileupload')
const app = express()
require('dotenv').config()

app.use(upload())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.disable('x-powered-by')

const indexRouter = require('./routes/index')
const uploadRouter = require('./routes/upload')
const viewRouter = require('./routes/view')
const rawRouter = require('./routes/raw')
const dlRouter = require('./routes/dl')
const deleteRouter = require('./routes/delete')

app.use('/', indexRouter)
app.use('/', viewRouter)
app.use('/', uploadRouter)
app.use('/raw', rawRouter)
app.use('/dl', dlRouter)
app.use('/delete', deleteRouter)

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})

const updateCache = require('./utils/updateCache')
updateCache()