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
      throw new autherror(
        "authentication error : please attach bearer token with header"
      );
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
      throw new Error("token is invalid");
    }
  } catch (error) {
    throw new autherror(
      "authentication error : please attach bearer token with header"
    );
  }
};

module.exports = authcheck;
