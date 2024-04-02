const { Artist }  = require('../server/model/artists')
const { Album }  = require('../server/model/albums')
const { Single }  = require('../server/model/singles')
const express = require("express")
const router = express.Router()


// Artists Page
router.get('/', async (req, res) => {
  const artists = await Artist.find()
  res.render('artists', { artists })
})

// Artist Page
router.get('/:name', async (req, res) => {
  try {
    const artist = await Artist.findOne({ name: req.params.name })
    if(!artist) return res.status(404).send("404 Error! No Artist Found! <a href ='/artists'> Try Again </a>")
    
    const singles = await Single.find({ artist: artist._id }).populate("artist").sort({ releaseDate: -1})
    
    const albums = await Album.find({ artist: artist._id }).populate("artist")
    
    let albumSongsCount = 0
    albums.forEach(album => {
      albumSongsCount = albumSongsCount + album.songs
    })
    songs = albumSongsCount + artist.totalSingles
    res.render('artist', { artist, albums, singles, songs })
  } catch (e) {
    console.log(e)
    //res.redirect("/artists")
  }
})
router.post("/disc-details", async(req, res) => {
  let data
  if(req.body.divName == "Albums-Div")
    data = await Album.findOne({ name: req.body.albumName}).populate("artist")
  else if(req.body.divName == "singles")
      data = await Single.findOne({ name: req.body.albumName}).populate("artist")
  else
    data = {
      name: "Hello Smart One",
    }
  console.log(req.body.divName)
  if(!data) return res.status(404).json({msg : "Not Found"})
  setTimeout(function() {
    res.status(200).json(data)
  }, 1500);
})
module.exports = router