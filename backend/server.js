import express from "express";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import courseRoute from "./routes/courseRoute.js";
import adminRoute from "./routes/adminRoute.js";
import serviceRoute from "./routes/servicesRoute.js";
import contactRoute from "./routes/contactRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import adminSettingsRoutes from "./routes/adminSettingsRoutes.js";
import { generalRateLimiter } from "./middlewares/rateLimiter.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const PORT = process.env.PORT || 8080;

const app = express();

// ✅ FIX: Trust proxy for Render deployment (MUST be before other middleware)
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://trigisconsult.netlify.app"],
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("common"));
}

console.log("Cloudinary name:", process.env.CLOUDINARY_CLOUD_NAME);

// Apply rate limiter to all API routes
app.use("/api", generalRateLimiter);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/courses", courseRoute);
app.use("/api/services", serviceRoute);
app.use("/api/contact", contactRoute);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin/settings", adminSettingsRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 API: ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
  console.log(
    `💚 Health Check: ${
      process.env.BASE_URL || `http://localhost:${PORT}`
    }/api/health\n`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  process.exit(1);
});

// import express from "express";
// import connectDB from "./config/db.js";
// import authRoute from "./routes/authRoute.js";
// import courseRoute from "./routes/courseRoute.js";
// import adminRoute from "./routes/adminRoute.js";
// import serviceRoute from "./routes/servicesRoute.js";
// import contactRoute from "./routes/contactRoute.js"; // 👈 NEW: Contact routes
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import morgan from "morgan";
// import { errorHandler } from "./middlewares/errorHandler.js";
// import settingsRoutes from "./routes/settingsRoutes.js";
// import adminSettingsRoutes from "./routes/adminSettingsRoutes.js";
// import { generalRateLimiter } from "./middlewares/rateLimiter.js"; // 👈 NEW: Rate limiter

// import uploadRoutes from "./routes/uploadRoutes.js";

// const PORT = process.env.PORT || 8080;

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // 👈 NEW: For form data

// app.use(cookieParser());

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://trigisconsult.netlify.app"],
//     credentials: true,
//   })
// );

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("common"));
// }

// console.log("Cloudinary name:", process.env.CLOUDINARY_CLOUD_NAME);

// // 👇 NEW: Apply rate limiter to all API routes
// app.use("/api", generalRateLimiter);

// // Routes
// app.use("/api/auth", authRoute);
// app.use("/api/admin", adminRoute);
// app.use("/api/courses", courseRoute);
// app.use("/api/services", serviceRoute);
// app.use("/api/contact", contactRoute); // 👈 NEW: Contact form routes
// app.use("/api/settings", settingsRoutes);
// app.use("/api/admin/settings", adminSettingsRoutes);

// // Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     status: "OK",
//     message: "Server is running",
//     timestamp: new Date().toISOString(),
//   });
// });

// app.use(errorHandler);

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`\n🚀 Server is running on port ${PORT}`);
//   console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
//   // console.log(`🌐 API: http://localhost:${PORT}`);
//   console.log(`🌐 API: ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
//   console.log(`💚 Health Check: http://localhost:${PORT}/api/health\n`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.error(`❌ Unhandled Rejection: ${err.message}`);
//   process.exit(1);
// });
