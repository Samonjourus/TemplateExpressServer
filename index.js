var webServer = require("./app.js")

var port = 8080;

webServer.listen(port, function(){
  console.log("webserver running on port " + port);
})
