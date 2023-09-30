// npm packages
var swaggerJsdoc = require("swagger-jsdoc")
var swaggerUi = require("swagger-ui-express");
var fileSystem = require("fs")

// local imports
var webServer = require("./app.js")

// parameters
var port = 8080;

// read package.json fields for populating swagger documentation info
let packageJSON = JSON.parse(fileSystem.readFileSync("./package.json"))

// swagger documentation parameters
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API documentation made with Swagger",
      version: packageJSON["version"],
      description:
        packageJSON["description"],
      license: {
        name: packageJSON["license"]
      },
      contact: {
        name: packageJSON["author"],
        url: "https://www.github.com/samonjourus",
        email: "benjaminstandfield@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:" + port.toString(),
      },
    ],
  },
  apis: ["./endpoints/*.js"],
};

const specs = swaggerJsdoc(options);
webServer.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

webServer.listen(port, function(){
  console.log("webserver running on port " + port);
})
