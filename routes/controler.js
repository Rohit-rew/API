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
async function login(req, res) {
  let { username, password } = req.body;
  if (!username || !password) {
    throw new invalidcreds("invalid login details");
  }

  let token = jwt.sign({ username, password }, jwtsecret, {
    expiresIn: "1d",
  });

  try {
    await usercreds.create({ username, password });
    res.status(200).json({ success: true, token });
  } catch (error) {
    throw new internalerror("internal error , please try again");
  }
}

module.exports = { dashboard, login };
