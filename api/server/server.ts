import express from "express";
import cors from "cors";
import path from "path";
import uploadRoute from "./routes/upload";
import resize from "./routes/resize";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/uploaded", express.static(path.join(__dirname, "uploaded")));
app.use("/api/server/", uploadRoute);
app.use("/api/server/", resize);

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, "../../Front-End")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../Front-End/index.html"));
});

app.use("/image", express.static(path.join(__dirname, "image")));
app.use("/uploaded", express.static(path.join(__dirname, "uploaded")));
app.use(
  "/image/resized",
  express.static(path.join(__dirname, "image/resized")),
);
app.use(
  "/image/resized/resized-gallery",
  express.static(path.join(__dirname, "image/resized/resized-gallery")),
);

app.get("/api/server/resize", async (req, res) => {
  res.send("resize endpoint");
});

app.get("/api/server/upload", async (req, res) => {
  res.send("upload endpoint");
});

app.get("/api/server/resizedUploaded", async (req, res) => {
  res.send("resizedUploaded");
});

app.listen(port, () => {
  console.log(`Server works at localhost:${port}`);
});

export default app;
