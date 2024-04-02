const home = require("./routes/home");
const artists = require("./routes/artists");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mysql = require("mysql");
const express = require("express");
const app = express();

//db connection
const url = "mongodb://localhost:27017/Meedo";
mongoose
    .connect(url)
    .then(() => console.log("database connected...!"))
    .then(() => {
        app.listen(3000, () => console.log("served at 3000"));
    })
    .catch(() => console.log("error while connecting to database ...!"));

//setting up templete engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"));
app.use(express.json());

app.use("/", home);
app.use("/artists", artists);
