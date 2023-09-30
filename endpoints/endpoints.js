const EXPRESS = require("express")

router = EXPRESS.Router();
/**
 * tags:
 *  name: Utility
 *  description: Designed for debugging/testing purposes.
 */

/**
 * @swagger
 * /api/status:
 *  get:
 *    summary: Returns a sucess JSON in the event of a sucessful connection.
 *    tags: [Utility]
 *    responses:
 *      200:
 *        description: Sucessfully connected to the API server.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: Always set to 'good'.
 *              example:
 *                status:good
 */
router.get("/api/status", function(req, res){
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({"status":"good"}))
})

module.exports = router;
