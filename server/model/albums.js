const mongoose = require("mongoose")

const Album = mongoose.model("albums", new mongoose.Schema({
  name: String,
  art: String,
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "artists", required: true },
  feat: String,
  producer: String,
 // producer: { type: mongoose.Schema.Types.ObjectId, ref: "artists" },
  songs: Number,
  releaseDate: Date,
  detail: String,
}))

exports.Album = Album