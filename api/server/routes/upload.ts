import express from "express";
import multer from "multer";
import path from "path";

const uploadRoute = express.Router();
const uploadDir = path.join(__dirname, "../uploaded");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, path.basename(file.originalname));
  },
});

// Create the multer instance
const upload = multer({
  storage: storage,

  // Define the file filter
  fileFilter: function (req, file, cb) {
    const allowedTypes = ["image/png", "image/jpeg", "image/gif"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      console.error("Invalid file type:", file.mimetype); // Optional: Log the error
      cb(null, false); // Reject the file without throwing an error
    }
  },
});

uploadRoute.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  res.json({ filename: req.file.filename });
});

export default uploadRoute;
