import request from "supertest";
import app from "../server/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { resizeImage } from "../server/imageProcess";

describe("Test Resize uploaded image", () => {
    const testImagePath = path.join(__dirname, "test.jpg");
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
    console.log(" Test image path:", testImagePath);
    console.log("Resized directory:", resizeDir);

    if (!fs.existsSync(testImagePath)) {
      console.log("Test image does NOT exist");
      fail(`Test image not found at ${testImagePath}`);
      return;
    } else {
      console.log(" Test image To resize exists");
    }
  });

  it("should resize an image successfully", async () => {
    // Verify test image exists
    if (!fs.existsSync(testImagePath)) {
      fail(` Test image To resize not found at ${testImagePath}`);
      return;
    }

   

  // Call the transform function directly
        const outputImagePath = path.join(resizeDir, `${width}x${height}-test.jpg`);
        await expect(async () => {
            await resizeImage(testImagePath,outputImagePath, width, height, );
        }).not.toThrow(); // Ensure the function does not throw an error

        // Add a delay (e.g., 500ms) to ensure the file is written before checking
await new Promise(resolve => setTimeout(resolve, 500));

if (!fs.existsSync(outputImagePath)) {
  fail(`Resized image not found at ${outputImagePath}`);
}
        // Verify the resized file exists
        const metadata = await sharp(outputImagePath).metadata();
        expect(metadata.width).toBe(width);
        expect(metadata.height).toBe(height);
    });
});
