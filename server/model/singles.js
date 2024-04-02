const mongoose = require("mongoose")

const Single = mongoose.model("Single", new mongoose.Schema({
  name: String,
  art: String,
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "artists", required: true },
  feat: String,
  producer: String,
  //producer: { type: mongoose.Schema.Types.ObjectId, ref: "artists" },
  links: {},
  releaseDate: Date,
  detail: String,
  newSong: Boolean,
  
}))

exports.Single = Single