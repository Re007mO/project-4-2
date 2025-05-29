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
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const upload_1 = __importDefault(require("./routes/upload"));
const resize_1 = __importDefault(require("./routes/resize"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(
  "/uploaded",
  express_1.default.static(path_1.default.join(__dirname, "uploaded")),
);
app.use("/api/server/", upload_1.default);
app.use("/api/server/", resize_1.default);
// Serve static files from frontend folder
app.use(
  express_1.default.static(path_1.default.join(__dirname, "../../Front-End")),
);
app.get("/", (req, res) => {
  res.sendFile(path_1.default.join(__dirname, "../../Front-End/index.html"));
});
app.use(
  "/image",
  express_1.default.static(path_1.default.join(__dirname, "image")),
);
app.use(
  "/uploaded",
  express_1.default.static(path_1.default.join(__dirname, "uploaded")),
);
app.use(
  "/image/resized",
  express_1.default.static(path_1.default.join(__dirname, "image/resized")),
);
app.use(
  "/image/resized/resized-gallery",
  express_1.default.static(
    path_1.default.join(__dirname, "image/resized/resized-gallery"),
  ),
);
app.get("/api/server/resize", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.send("resize endpoint");
  }),
);
app.get("/api/server/upload", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.send("upload endpoint");
  }),
);
app.get("/api/server/resizedUploaded", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.send("resizedUploaded");
  }),
);
app.listen(port, () => {
  console.log(`Server works at localhost:${port}`);
});
exports.default = app;
