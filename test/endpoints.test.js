// npm packages
let chai = require('chai');
let chaiHttp = require('chai-http');

// local imports
var app = require("../app.js")

chai.use(chaiHttp)
chai.should();

// opening connections should happen here
beforeEach(async () => {
    console.log("before each is empty");
});

// closing connectiosn should happen here
afterEach(async () => {
    console.log("after each is empty");
});

describe("GET /api/status", () => {
    it("should always return {'status':'good'}", async () => {
        const res = await chai.request(app).get("/api/status");
        res.should.have.status(200);
        res.should.have.header("Content-Type", "application/json")
        res.body.should.have.property("status").equal("good");
    });
});
  