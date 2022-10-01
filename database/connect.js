let mongoose = require("mongoose");

async function connectdb(uri) {
  return await mongoose.connect(uri);
}

module.exports = connectdb;
