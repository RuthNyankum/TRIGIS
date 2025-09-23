import express from "express";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import courseRoute from "./routes/courseRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("common"));
}

app.use("/api/auth", authRoute);
app.use("/api/courses", courseRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
