let autherror = require("../errors/autherror");
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT;
const usercreds = require("../database/scheema");

//authentication checking middleware
const authcheck = async (req, res, next) => {
  try {
    let token = req.headers;
    let fulltoken = token.authorization;
    if (!fulltoken || !fulltoken.startsWith("Bearer ")) {
      res
        .status(200)
        .json({ success: false, msg: "Please attach bearer token in header" });
    }

    let trimedtoken = fulltoken.split(" ")[1];
    let decode = jwt.verify(trimedtoken, jwtsecret, { success: true });
    let userdata = await usercreds.find({
      username: decode.username,
      password: decode.password,
    });

    if (userdata.length) {
      const { username, password } = decode;
      req.data = { username, password };
      next();
    } else {
      res.status(200).json({ success: false, msg: "invalid token" });
    }
  } catch (error) {
    res.status(200).json({ success: false, msg: "authentication error" });
  }
};

module.exports = authcheck;
