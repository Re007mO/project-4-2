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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server/server"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
describe("Test Upload image", () => {
    const testImagePath = path_1.default.join(__dirname, "test.jpg");
    const uploadDir = path_1.default.join(__dirname, "../server/uploaded");
    beforeAll(() => {
        // Create upload directory if it doesn't exist
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
    });
    afterAll(() => {
        // Clean up uploaded files
        console.log("Test image path:", testImagePath);
        console.log("Upload directory:", uploadDir);
        if (!fs_1.default.existsSync(testImagePath)) {
            console.log("Test image does NOT exist");
            fail(`Test image not found at ${testImagePath}`);
            return;
        }
        else {
            console.log("Test image exists");
        }
    });
    it("should upload an image successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        //Verify test image exists
        if (!fs_1.default.existsSync(testImagePath)) {
            fail(`Test image not found at ${testImagePath}`);
            return;
        }
        // Make the upload request
        const res = yield (0, supertest_1.default)(server_1.default)
            .post("/api/server/upload") // Changed to match your route
            .attach("image", testImagePath)
            .timeout(5000); // Add timeout to prevent hanging
        // 3. Verify the response
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            filename: "test.jpg", // Matches your original filename
        });
        // Verify file was actually saved
        const savedPath = path_1.default.join(uploadDir, "test.jpg");
        expect(fs_1.default.existsSync(savedPath)).toBeTrue();
    }));
});
