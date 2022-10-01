const route = require("express").Router();

const { dashboard, login } = require("./controler");
const authcheck =  require('../middleware/authcheck')




route.get("/dashboard",authcheck, dashboard);
route.post("/login", login);

module.exports = route;
                      