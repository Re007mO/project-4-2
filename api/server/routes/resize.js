"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageProcess_1 = require("../imageProcess");
const resizeRoute = express_1.default.Router();
//resize uploaded image
resizeRoute.post("/resizeUploaded", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { width1, height1, image } = req.body;
    try {
        if (!image) {
            return res.status(400).json({ error: "No image provided." });
        }
        console.log("Received width:", width1, "Received height:", height1); // Debugging log
        const widthNum = Number(width1);
        const heightNum = Number(height1);
        const inputImageUploadedPath = path_1.default.join(__dirname, "../uploaded", decodeURIComponent(path_1.default.basename(image)));
        const outputImageUploadedPath = path_1.default.join(__dirname, "../image/resized/resized-uploaded-gallery", `${widthNum}x${heightNum}-${path_1.default.parse(decodeURIComponent(image)).name}${path_1.default.extname(image)}`);
        yield (0, imageProcess_1.resizeImage)(inputImageUploadedPath, outputImageUploadedPath, widthNum, heightNum);
        res.send(`Image resized successfully to ${outputImageUploadedPath}`);
    }
    catch (error) {
        console.error("Resize error:", error);
        res.status(500).json({ error: "An unexpected error occurred while resizing the image." });
        throw new Error(error)
    }
}));
//resize placeholder image
resizeRoute.post("/resize", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { width, height, image } = req.body;
    try {
        const inputImagePath = path_1.default.join(__dirname, "../image", `${path_1.default.parse(decodeURIComponent(image)).name}${path_1.default.extname(image)}`);
        console.log(inputImagePath);
        const widthNum = parseInt(width);
        const heightNum = parseInt(height);
        if (isNaN(widthNum) || widthNum <= 0) {
            return res.status(400).json({ error: "Invalid width. It must be a positive number." });
        }
        if (isNaN(heightNum) || heightNum <= 0) {
            return res.status(400).json({ error: "Invalid height. It must be a positive number." });
        }
        const outputImagePath = path_1.default.join(__dirname, "../image/resized/resized-gallery", `${width}x${height}-${path_1.default.parse(decodeURIComponent(image)).name}${path_1.default.extname(image)}`);
        yield (0, imageProcess_1.resizeImage)(inputImagePath, outputImagePath, widthNum, widthNum);
        res.send(`Image resized successfully to ${outputImagePath}`);
    }
    catch (error) {
        console.error("Resize error:", error);
        res.status(500).json(error);
    }
}));
//resize from gallery
resizeRoute.post("/resizeUploadedGallery", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { width, height, image } = req.body;
    try {
        const inputImagePath = path_1.default.join(__dirname, "../image/resized/resized-uploaded-gallery", `${path_1.default.parse(decodeURIComponent(image)).name}${path_1.default.extname(image)}`);
        console.log(inputImagePath);
        const outputImagePath = path_1.default.join(__dirname, "../image/resized/resized-gallery", `${width}x${height}-${path_1.default.parse(decodeURIComponent(image)).name}${path_1.default.extname(image)}`);
        console.log("Output Image Path:", outputImagePath);
        yield (0, imageProcess_1.resizeImage)(inputImagePath, outputImagePath, parseInt(width), parseInt(height));
        res.send(`Image resized successfully to ${outputImagePath}`);
    }
    catch (error) {
        console.error("Resize error:", error);
        res.status(500).json(error);
    }
}));
exports.default = resizeRoute;
