"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const resizeRoute = express_1.default.Router();
//resize uploaded image
resizeRoute.post("/resizeUploaded", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { width1, height1, image } = req.body;
    try {
      if (image) {
        const inputImageUploadedPath = path_1.default.join(
          __dirname,
          "../uploaded",
          decodeURIComponent(path_1.default.basename(image)),
        );
        console.log(inputImageUploadedPath);
        const outputImageUploadedPath = path_1.default.join(
          __dirname,
          "../image/resized/resized-uploaded-gallery",
          `${width1}x${height1}-${path_1.default.parse(decodeURIComponent(image)).name}${path_1.default.extname(image)}`,
        );
        yield (0, sharp_1.default)(inputImageUploadedPath)
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
  }),
);
//resize placeholder image
resizeRoute.post("/resize", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { width, height, image } = req.body;
    try {
      const inputImagePath = path_1.default.join(
        __dirname,
        "../image",
        `${path_1.default.parse(decodeURIComponent(image)).name}${path_1.default.extname(image)}`,
      );
      console.log(inputImagePath);
      const outputImagePath = path_1.default.join(
        __dirname,
        "../image/resized/resized-gallery",
        `${width}x${height}-${path_1.default.parse(decodeURIComponent(image)).name}${path_1.default.extname(image)}`,
      );
      yield (0, sharp_1.default)(inputImagePath || outputImagePath)
        .resize(width, height)
        .toFile(outputImagePath);
      res.send(`Image resized successfully to ${outputImagePath}`);
    } catch (error) {
      console.error("Resize error:", error);
      res.status(500).json(error);
    }
  }),
);
//resize from gallery
resizeRoute.post("/resizeUploadedGallery", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { width, height, image } = req.body;
    try {
      const inputImagePath = path_1.default.join(
        __dirname,
        "../image/resized/resized-uploaded-gallery",
        `${path_1.default.parse(decodeURIComponent(image)).name}${path_1.default.extname(image)}`,
      );
      console.log(inputImagePath);
      const outputImagePath = path_1.default.join(
        __dirname,
        "../image/resized/resized-gallery",
        `${width}x${height}-${path_1.default.parse(decodeURIComponent(image)).name}${path_1.default.extname(image)}`,
      );
      console.log("Output Image Path:", outputImagePath);
      yield (0, sharp_1.default)(inputImagePath)
        .resize(width, height)
        .toFile(outputImagePath);
      res.send(`Image resized successfully to ${outputImagePath}`);
    } catch (error) {
      console.error("Resize error:", error);
      res.status(500).json(error);
    }
  }),
);
exports.default = resizeRoute;
