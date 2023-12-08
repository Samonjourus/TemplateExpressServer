const EXPRESS = require("express");

const bodyparser = require("../middleware/bodyparser.js")
const {getStatus:getStatus} = require("../controllers/status.js");

router = EXPRESS.Router();

/**
 * @swagger
 * /api/status:
 *  get:
 *      summary: Returns a status code 200 in the event of a sucessful connection.
 *      tags: [Utility]
 *      responses:
 *          200:
 *              description: Sucessfully connected to the API server.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          400:
 *              description: Unknown server error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: String cast of the server-side error.
 *                              stackTrace:
 *                                  type: string
 *                                  description: String cast of the server-side stack trace.
 */
router.get("/", bodyparser, getStatus);

module.exports = router;