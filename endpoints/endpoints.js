const EXPRESS = require("express")

router = EXPRESS.Router();

router.get("/api/status", function(req, res){
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({"status":"good"}))
})

module.exports = router;
