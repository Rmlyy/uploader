const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const getPath = require('../utils/path')
const extension = require('../utils/checkExtension')

router.get('/:file', (req, res) => {
  const { file } = req.params
  const { key, name } = req.query
  const root = path.dirname(require.main.filename)

  if (getPath(file)) {
    if (!name) return res.send('Please specify the new name for this file.')
    const fileData = require(`../uploads/data/${file}.json`)

    if (fileData.key === key) {
      let newPath

      if (extension(name) === 'image') {
        newPath = `${root}/uploads/images/${name}`
      } else if (extension(name) === 'text') {
        newPath = `${root}/uploads/text/${name}`
      } else if (extension(name) === 'video') {
        newPath = `${root}/uploads/videos/${name}`
      } else {
        newPath = `${root}/uploads/uncategorized/${name}`
      }
      
      fs.renameSync(`${getPath(file)}`, `${newPath}`)
      fs.renameSync(`${root}/uploads/data/${file}.json`, `${root}/uploads/data/${name}.json`)
      
     res.send(`<script>window.location = "${process.env.URL}/${name}"</script>`)
    } else res.status(401).send('Invalid key.')
  } else res.status(404).render('404')
})

module.exports = router