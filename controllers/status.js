async function getStatus(req, res) {
    try {
        res.status(200);
        res.set("Content-Type", "application/json")
        res.end(JSON.stringify({
            "status": "good"
        }))
    }
    catch (err) {
        res.status(400);
        res.set("Content-Type", "application/json")
        res.end(JSON.stringify({
            "error": String(err),
            "stackTrace": err.stack
        }))
    }
}

module.exports = {
    getStatus:getStatus
}