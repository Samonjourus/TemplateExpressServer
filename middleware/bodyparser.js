const BODYPARSER = require("body-parser")

let bpJSONMiddleware = BODYPARSER.json({
    limit: "10mb" 
})

module.exports = bpJSONMiddleware;