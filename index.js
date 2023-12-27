// npm packages
const dotenv = require("dotenv").config()

// local imports
var webServer = require("./app.js")

// parameters
var port = process.env["TEMPLATESERVERPORT"];

webServer.listen(port, function(){
  console.log("webserver running on port " + port);
})
