import express, { Request, Response } from "express";
import path from "path";
import { resizeImage } from "../imageProcess";

const resizeRoute = express.Router();

//resize uploaded image
resizeRoute.post("/resizeUploaded", async (req, res) => {
  const { width1, height1, image } = req.body;

  try {
    if (!image) {
      return res.status(400).json({ error: "No image provided." });
    }

    console.log("Received width:", width1, "Received height:", height1); // Debugging log

    const widthNum = Number(width1);
    const heightNum = Number(height1);
    
   
    const inputImageUploadedPath = path.join(
      __dirname,
      "../uploaded",
      decodeURIComponent(path.basename(image))
    );

    const outputImageUploadedPath = path.join(
      __dirname,
      "../image/resized/resized-uploaded-gallery",
      `${widthNum}x${heightNum}-${path.parse(decodeURIComponent(image)).name}${path.extname(image)}`
    );

    await resizeImage(inputImageUploadedPath, outputImageUploadedPath, widthNum, heightNum);
    res.send(`Image resized successfully to ${outputImageUploadedPath}`);
  } catch (error) {
    console.error("Resize error:", error);
    res.status(500).json({ error: "An unexpected error occurred while resizing the image." });
  }
});

//resize placeholder image
resizeRoute.post("/resize", async (req, res) => {
  const { width, height, image } = req.body;
  try {
    const inputImagePath = path.join(
      __dirname,
      "../image",
      `${path.parse(decodeURIComponent(image)).name}${path.extname(image)}`,
    );
    console.log(inputImagePath);

    const widthNum = parseInt(width);
    const heightNum = parseInt(height);

    if (isNaN(widthNum) || widthNum <= 0) {
      return res.status(400).json({ error: "Invalid width. It must be a positive number." });
    }
    if (isNaN(heightNum) || heightNum <= 0) {
      return res.status(400).json({ error: "Invalid height. It must be a positive number." });
    }

    const outputImagePath = path.join(
      __dirname,
      "../image/resized/resized-gallery",
      `${width}x${height}-${path.parse(decodeURIComponent(image)).name}${path.extname(image)}`,
    );

    await resizeImage(inputImagePath, outputImagePath, widthNum, widthNum);

    res.send(`Image resized successfully to ${outputImagePath}`);
  } catch (error) {
    console.error("Resize error:", error);
    res.status(500).json(error);
  }
});

//resize from gallery
resizeRoute.post("/resizeUploadedGallery", async (req: Request, res: Response): Promise<void> => {
  const { width, height, image } = req.body;
  try {
    const inputImagePath = path.join(
      __dirname,
      "../image/resized/resized-uploaded-gallery",
      `${path.parse(decodeURIComponent(image)).name}${path.extname(image)}`,
    );
    console.log(inputImagePath);

    const outputImagePath = path.join(
      __dirname,
      "../image/resized/resized-gallery",
      `${width}x${height}-${path.parse(decodeURIComponent(image)).name}${path.extname(image)}`,
    );
    console.log("Output Image Path:", outputImagePath);

    await resizeImage(inputImagePath, outputImagePath, parseInt(width), parseInt(height));

    res.send(`Image resized successfully to ${outputImagePath}`);
  } catch (error) {
    console.error("Resize error:", error);
    res.status(500).json(error);
  }
});

export default resizeRoute;
