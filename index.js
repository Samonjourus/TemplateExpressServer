//npm packages
const EXPRESS = require("express")
const FILESYSTEM = require("fs")
const BODYPARSER = require("body-parser")

var endpoints = require("./endpoints/endpoints.js")
//
var webServer = EXPRESS();
var port = 1024; // non-privileged users cannot listen on sock ports below 1024

webServer.use(BODYPARSER.json())
webServer.use(BODYPARSER.urlencoded({extended:true}))

webServer.use(function(req, res, next){
  console.log(req.url + " " + req.method +" | "+JSON.stringify(req.body));
  FILESYSTEM.appendFile(__dirname+'\\Server.log',req.ip + " " + new Date() + " " + req.url + " " + req.method +" "+JSON.stringify(req.body) + " ||| " + JSON.stringify(req.query)+"\"\n",{flag:"a"}, function(err)
  {
    if(err) console.log(err);
  } );
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, SEARCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  if(req.method == "OPTIONS")
    {
      res.status(200);
      res.end();
    }
  else
  {
    next();
  }
});

webServer.use(endpoints)
webServer.use(EXPRESS.static(__dirname +"\\webpages"))
webServer.listen(port, function(){
  console.log("webserver running on port " + port);
});
