const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT;
const invalidcreds = require("../errors/invalidcredserror");
const internalerror = require("../errors/internalerror");
const usercreds = require("../database/scheema");

//main dashboard route
async function dashboard(req, res) {
  try {
    res
      .status(200)
      .json({ success: true, data: `welcome ${req.data.username}` });
  } catch (error) {
    throw new internalerror("internal server error, please try again");
  }
}

//login route
const express = require("express");
const app = express();
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());


async function login(req, res) {
  console.log(req.body)
  let { username, password } = req.body;
  if (!username || !password) {
    console.log('error thrown')
    throw new invalidcreds("invalid login details");
  }
  console.log('passed')
  let token = jwt.sign({ username, password }, jwtsecret, {
    expiresIn: "1d",
  });

  try {
    await usercreds.create({ username, password });
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(`error catched ${error}`)
    throw new internalerror("internal error , please try again");
  }
}

module.exports = { dashboard, login };
