const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const Artists = require("./Models/artists.js")
const Albums = require("./Models/albums.js")
const Singles = require("./Models/singles.js")
const port = 3000;

app.set("view engine", "ejs");
//app.set("views", "views")
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"));
app.use(express.json());

const dbString = "mongodb://localhost:27017/Meedo"
mongoose
  .connect(dbString)
  .then(() => {
    console.log("database connected");
    app.listen(port, () => console.log(`server served at ${port}`));
  })
  .catch((error) => {
    console.error("database connection error:");
  });

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:");
});

app.get("/", (req, res) => {
// 	res.render("index");
	res.redirect("/discover");
});

//discover
app.get("/discover", (req, res) => {
  let dateOne = new Date("December 25, 1995")
  let dateTwo = Date()
  console.log(dateOne.valueOf() < dateTwo.valueOf())
  console.log(dateTwo.valueOf())
  console.log(Date.parse(dateTwo))
  console.log(Date.parse(dateOne) < Date.parse(dateTwo))
	res.render("discover");
});

//news 
app.get("/news", (req, res) => {
	res.render("news");
});

//artists
app.get("/artists", async(req, res) => {
  try{
    const artists = await Artists.find()
	  res.render("artists", {artists});
  } catch(err){
    console.log(err)
  }
});

//
app.get("/artist/:name", async(req, res) => {
  const artist = await Artists.findOne({name: req.params.name})
  const albums = await Albums.find({artist: artist._id}).populate("artist")
  let albumSongsCount = 0
  albums.forEach(album => {
    albumSongsCount = albumSongsCount + album.songs
  })
  const singles = await Singles.find({artist: artist._id}).populate("artist")
  let newSingles = singles.filter(single => {
    return single.newSong === true
  })
	res.render("artist", {
	  artist, 
	  albums, 
	  singles, 
	  newSingles, 
	  albumSongsCount
	  
	});
});

app.get("/album-details/:name", (req, res) => {
  res.render("album-details")
})

const singles = [
    {
      id: 1,
      title: "Tef Tef",
      artist: "Uno",
      feat: "Jemberu Demeke",
      date: "×*×*×",
      links: {
            youtube: "utub.xim",
            spotify: "jjw.xim",
            apple: "veh.jeh",
          }  
    }
  ]

const albs = [
    {
      id: 1,
      title: "Sanqa Souq EP",
      artist: "Kassmasse",
      songs: [
          {
            track: 1,
            name: "Weg Nigat",
            lyrics: "Kassmasse",
            melody: "Kassmasse"
          },
          {
            track: 2,
            name: "Sanqa Souq",
            lyrics: "Kassmasse",
            melody: "Kassmasse"
          },
          {
            track: 3,
            name: "Rega Bilo Medeset",
            lyrics: "Kassmasse",
            melody: "Kassmasse"
          },
        ]
    }
  ]

app.post("/test", async(req, res) => {
	let a
	if(req.body.divName == "Singles-Div"){
     a = await Singles.findOne({name: req.body.albumName}).populate("artist")
	} else {
     a = await Albums.findOne({name: req.body.albumName}).populate("artist")
	}
	setTimeout(() => {
		res.status(200).json(a);
	}, 1000);
});

//app.listen(port, console.log(`server served at ${port}`));

//admin update section 
const admin = require("./Router/router.js")
app.use("/admin/", admin)