// npm packages
const request = require("supertest");

// local imports
var app = require("../app.js")

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
        const res = await request(app).get("/api/status");
        expect(res.statusCode).toBe(200);
        expect(res.get("Content-type")).toBe("application/json")
        expect(res.body["status"]).toBe("good");
    });
});
  