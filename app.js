// npm packages
const EXPRESS = require("express")
const FILESYSTEM = require("fs")
const BODYPARSER = require("body-parser")
const PATH = require("path")
var fileSystem = require("fs")
var swaggerJsdoc = require("swagger-jsdoc")
var swaggerUi = require("swagger-ui-express");

// local imports
var statusEndpoints = require("./endpoints/status.js")

var webServer = EXPRESS();

webServer.use(BODYPARSER.json())
webServer.use(BODYPARSER.urlencoded({extended:true}))

webServer.use(function(req, res, next){
  console.log(req.url + " " + req.method +" | "+JSON.stringify(req.body));
  FILESYSTEM.appendFile(PATH.join(__dirname,'Server.log'),req.ip + " " + new Date() + " " + req.url + " " + req.method +" "+JSON.stringify(req.body) + " ||| " + JSON.stringify(req.query)+"\"\n",{flag:"a"},()=>{});
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, SEARCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  if(req.method == "OPTIONS")
    {
      res.status(200);
      res.end();
    }
  else
    next();
});

// read package.json fields for populating swagger documentation info
let packageJSON = JSON.parse(fileSystem.readFileSync("./package.json"))

let servers = [process.env.TEMPLATESERVERHOST + ":" + process.env.TEMPLATESERVERPORT]
if (process.env.TEMPLATESERVERSERVERS !== "") {
  servers = servers.concat(process.env.TEMPLATESERVERSERVERS.split(";"))
}

// swagger documentation parameters
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: packageJSON["config"]["title"],
      version: packageJSON["version"],
      description:
        packageJSON["description"],
      license: {
        name: packageJSON["license"]
      },
      contact: {
        name: packageJSON["author"]["name"],
        url: packageJSON["author"]["url"],
        email: packageJSON["author"]["email"],
      },
    },
    servers: servers.map((val, idx, arr) => {
      return {"url": val}
    }),
  },
  apis: ["./endpoints/*.js"],
};

const specs = swaggerJsdoc(options);

webServer.use("/api/status", statusEndpoints)
webServer.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
webServer.use(EXPRESS.static(PATH.join(__dirname,"webpages")))

module.exports = webServer