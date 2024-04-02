const { Artist }  = require('../server/model/artists')
const express = require("express")
const router = express.Router()

router.get('/', async (req, res) => {
  const artists = await Artist.find()
  res.render('index', { artists })
})

module.exports = router