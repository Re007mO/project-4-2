"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploadRoute = express_1.default.Router();
const uploadDir = path_1.default.join(__dirname, "../uploaded");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, path_1.default.basename(file.originalname));
    },
});
// Create the multer instance
const upload = (0, multer_1.default)({
    storage: storage,
    // Define the file filter
    fileFilter: function (req, file, cb) {
        const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        }
        else {
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
exports.default = uploadRoute;
