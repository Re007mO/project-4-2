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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const imageProcess_1 = require("../server/imageProcess");
describe("Test Resize uploaded image", () => {
    const testImagePath = path_1.default.join(__dirname, "test.jpg");
    const resizeDir = path_1.default.join(__dirname, "../server/image/resized/resized-uploaded-gallery");
    const width = 200;
    const height = 200;
    beforeAll(() => {
        // Ensure the resized directory exists
        if (!fs_1.default.existsSync(resizeDir)) {
            fs_1.default.mkdirSync(resizeDir, { recursive: true });
        }
    });
    afterAll(() => {
        console.log(" Test image path:", testImagePath);
        console.log("Resized directory:", resizeDir);
        if (!fs_1.default.existsSync(testImagePath)) {
            console.log("Test image does NOT exist");
            fail(`Test image not found at ${testImagePath}`);
            return;
        }
        else {
            console.log(" Test image To resize exists");
        }
    });
    it("should resize an image successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        // Verify test image exists
        if (!fs_1.default.existsSync(testImagePath)) {
            fail(` Test image To resize not found at ${testImagePath}`);
            return;
        }
        // Call the transform function directly
        const outputImagePath = path_1.default.join(resizeDir, `${width}x${height}-test.jpg`);
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, imageProcess_1.resizeImage)(testImagePath, outputImagePath, width, height);
        })).not.toThrow(); // Ensure the function does not throw an error
        // Add a delay (e.g., 500ms) to ensure the file is written before checking
        yield new Promise(resolve => setTimeout(resolve, 500));
        if (!fs_1.default.existsSync(outputImagePath)) {
            fail(`Resized image not found at ${outputImagePath}`);
        }
        // Verify the resized file exists
        const metadata = yield (0, sharp_1.default)(outputImagePath).metadata();
        expect(metadata.width).toBe(width);
        expect(metadata.height).toBe(height);
    }));
});
