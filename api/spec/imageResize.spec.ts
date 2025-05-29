import request from "supertest";
import app from "../server/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";

describe("Test Resize uploaded image", () => {
  const testImagePath = path.join(__dirname, "../server/uploaded/test.jpg"); // Path to the uploaded image
  const resizeDir = path.join(
    __dirname,
    "../server/image/resized/resized-uploaded-gallery",
  );
  const width = 200;
  const height = 200;

  beforeAll(() => {
    // Ensure the resized directory exists
    if (!fs.existsSync(resizeDir)) {
      fs.mkdirSync(resizeDir, { recursive: true });
    }
  });

  afterAll(() => {
    console.log("Uploaded Test image path:", testImagePath);
    console.log("Resized directory:", resizeDir);

    if (!fs.existsSync(testImagePath)) {
      console.log("Test image does NOT exist");
      fail(`Test image not found at ${testImagePath}`);
      return;
    } else {
      console.log("Uploaded Test image exists");
    }
  });

  it("should resize an image successfully", async () => {
    // Verify test image exists
    if (!fs.existsSync(testImagePath)) {
      fail(`Uploaded Test image not found at ${testImagePath}`);
      return;
    }

    // Make the resize request
    const res = await request(app).post("/api/server/resizeUploaded").send({
      width1: width,
      height1: height,
      image: "test.jpg", // Use the uploaded image name
    });

    // Verify the response
    expect(res.status).toBe(200);

    // Verify the resized file exists
    const resizedFilename = `${width}x${height}-test.jpg`; // Adjust this based on your naming convention
    const resizedPath = path.join(resizeDir, resizedFilename);

    // Verify dimensions
    const metadata = await sharp(resizedPath).metadata();
    expect(metadata.width).toBe(width);
    expect(metadata.height).toBe(height);
  });
});
