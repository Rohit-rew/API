const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors')
app.use(cors())

// for receiving the user data from a post request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("express-async-errors");

//for managing multiple routes
const route = require("./routes/route");
app.use("/api", route);

//middleware for errorhandling
const handleError = require("./middleware/errorhandler");
app.use(handleError);

//middleware for invalid route
const notfound = require("./middleware/notfound");
app.use(notfound);


//conecting to database and starting the server
const connectdb = require("./database/connect");
const uri = process.env.URI;

async function start() {
  try {
    await connectdb(uri);
    app.listen(5000, console.log("server started"));
  } catch (error) {
    throw new Error("Cant connect to server please try again");
  }
}

start();
