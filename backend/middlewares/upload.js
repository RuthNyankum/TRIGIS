// // middlewares/upload.js
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// // For videos
// const videoStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "courses/videos",
//     resource_type: "video",
//     allowed_formats: ["mp4", "mov", "avi", "mkv"],
//   },
// });

// // For PDFs
// const pdfStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "courses/pdfs",
//     resource_type: "raw",
//     allowed_formats: ["pdf"],
//   },
// });

// const uploadVideo = multer({ storage: videoStorage });
// const uploadPdf = multer({ storage: pdfStorage });

// export { uploadVideo, uploadPdf };

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// For videos
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "courses/videos",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi", "mkv"],
    transformation: [{ quality: "auto" }],
  },
});

// For PDFs
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "courses/pdfs",
    resource_type: "raw",
    allowed_formats: ["pdf"],
  },
});

const uploadVideo = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
  fileFilter: (req, file, cb) => {
    console.log("🎥 Video file received:", file.originalname);
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed!"), false);
    }
  },
});

const uploadPdf = multer({
  storage: pdfStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (req, file, cb) => {
    console.log("📄 PDF file received:", file.originalname);
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

export { uploadVideo, uploadPdf };
