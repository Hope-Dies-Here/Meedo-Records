const mongoose = require("mongoose")

const Artist = mongoose.model("artists", new mongoose.Schema({
  name: String,
  photo: String,
  cover: String,
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'gender is required']
  },
  bio: String,
  biography: String,
 // type: [{ type: mongoose.Schema.Types.ObjectId, ref: "artistType" }],
  type: String,
  totalAlbums: Number,
  totalSingles: Number
}))

exports.Artist = Artist 