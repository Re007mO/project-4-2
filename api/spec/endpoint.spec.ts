import request from "supertest";
import app from "../server/server";

describe("Test Endpoints", () => {
  //Test Upload endpoint
  it("Return 200 status for upload route", async () => {
    const response = await request(app).get("/api/server/upload");
    expect(response.statusCode).toBe(200);
  });

  //Test Resize endpoint
  it("Return 200 status for resize route", async () => {
    const response = await request(app).get("/api/server/resize");
    expect(response.statusCode).toBe(200);
  });
});
