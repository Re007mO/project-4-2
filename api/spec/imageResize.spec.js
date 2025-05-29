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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server/server"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
describe("Test Resize uploaded image", () => {
  const testImagePath = path_1.default.join(
    __dirname,
    "../server/uploaded/test.jpg",
  ); // Path to the uploaded image
  const resizeDir = path_1.default.join(
    __dirname,
    "../server/image/resized/resized-uploaded-gallery",
  );
  const width = 200;
  const height = 200;
  beforeAll(() => {
    // Ensure the resized directory exists
    if (!fs_1.default.existsSync(resizeDir)) {
      fs_1.default.mkdirSync(resizeDir, { recursive: true });
    }
  });
  afterAll(() => {
    console.log("Uploaded Test image path:", testImagePath);
    console.log("Resized directory:", resizeDir);
    if (!fs_1.default.existsSync(testImagePath)) {
      console.log("Test image does NOT exist");
      fail(`Test image not found at ${testImagePath}`);
      return;
    } else {
      console.log("Uploaded Test image exists");
    }
  });
  it("should resize an image successfully", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      // Verify test image exists
      if (!fs_1.default.existsSync(testImagePath)) {
        fail(`Uploaded Test image not found at ${testImagePath}`);
        return;
      }
      // Make the resize request
      const res = yield (0, supertest_1.default)(server_1.default)
        .post("/api/server/resizeUploaded")
        .send({
          width1: width,
          height1: height,
          image: "test.jpg", // Use the uploaded image name
        });
      // Verify the response
      expect(res.status).toBe(200);
      // Verify the resized file exists
      const resizedFilename = `${width}x${height}-test.jpg`; // Adjust this based on your naming convention
      const resizedPath = path_1.default.join(resizeDir, resizedFilename);
      // Verify dimensions
      const metadata = yield (0, sharp_1.default)(resizedPath).metadata();
      expect(metadata.width).toBe(width);
      expect(metadata.height).toBe(height);
    }));
});
