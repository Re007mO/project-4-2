import express from "express";
import sharp from "sharp";
import path from "path";

const resizeRoute = express.Router();

//resize uploaded image
resizeRoute.post("/resizeUploaded", async (req, res) => {
  const { width1, height1, image } = req.body;

  try {
    if (image) {
      const inputImageUploadedPath = path.join(
        __dirname,
        "../uploaded",
        decodeURIComponent(path.basename(image)),
      );
      console.log(inputImageUploadedPath);

      const outputImageUploadedPath = path.join(
        __dirname,
        "../image/resized/resized-uploaded-gallery",
        `${width1}x${height1}-${path.parse(decodeURIComponent(image)).name}${path.extname(image)}`,
      );

      await sharp(inputImageUploadedPath)
        .resize(width1, height1)
        .toFile(outputImageUploadedPath);
      res.send(`Image resized successfully to ${outputImageUploadedPath}`);
    } else {
      console.log("choose image");
      return;
    }
  } catch (error) {
    console.error("Resize error:", error);
    res.status(500).json(error);
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

    const outputImagePath = path.join(
      __dirname,
      "../image/resized/resized-gallery",
      `${width}x${height}-${path.parse(decodeURIComponent(image)).name}${path.extname(image)}`,
    );

    await sharp(inputImagePath || outputImagePath)
      .resize(width, height)
      .toFile(outputImagePath);

    res.send(`Image resized successfully to ${outputImagePath}`);
  } catch (error) {
    console.error("Resize error:", error);
    res.status(500).json(error);
  }
});

//resize from gallery
resizeRoute.post("/resizeUploadedGallery", async (req, res) => {
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

    await sharp(inputImagePath).resize(width, height).toFile(outputImagePath);

    res.send(`Image resized successfully to ${outputImagePath}`);
  } catch (error) {
    console.error("Resize error:", error);
    res.status(500).json(error);
  }
});

export default resizeRoute;
