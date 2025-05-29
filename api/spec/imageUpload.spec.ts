import request from "supertest";
import app from "../server/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";

describe("Test Upload image", () => {
  const testImagePath = path.join(__dirname, "test.jpg");
  const uploadDir = path.join(__dirname, "../server/uploaded");

  beforeAll(() => {
    // Create upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up uploaded files
    console.log("Test image path:", testImagePath);
    console.log("Upload directory:", uploadDir);

    if (!fs.existsSync(testImagePath)) {
      console.log("Test image does NOT exist");
      fail(`Test image not found at ${testImagePath}`);
      return;
    } else {
      console.log("Test image exists");
    }
  });

  it("should upload an image successfully", async () => {
    //Verify test image exists
    if (!fs.existsSync(testImagePath)) {
      fail(`Test image not found at ${testImagePath}`);
      return;
    }

    // Make the upload request
    const res = await request(app)
      .post("/api/server/upload") // Changed to match your route
      .attach("image", testImagePath)
      .timeout(5000); // Add timeout to prevent hanging

    // 3. Verify the response
    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      filename: "test.jpg", // Matches your original filename
    });

    // Verify file was actually saved
    const savedPath = path.join(uploadDir, "test.jpg");
    expect(fs.existsSync(savedPath)).toBeTrue();
  });
});
