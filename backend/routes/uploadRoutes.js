// routes/uploadRoutes.js
import express from "express";
import { uploadVideo, uploadPdf } from "../middlewares/upload.js";

const router = express.Router();

// Video upload
router.post("/video", uploadVideo.single("file"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "Upload failed" });
  }
  res.json({ url: req.file.path });
});

// PDF upload
router.post("/pdf", uploadPdf.single("file"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "Upload failed" });
  }
  res.json({ url: req.file.path });
});

export default router;
