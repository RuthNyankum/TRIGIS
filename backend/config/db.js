import mongoose from "mongoose";

// FIX: Support both MONGODB_URI and MONGO_URI
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

async function connectDB() {
  try {
    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}

export default connectDB;
// import mongoose from "mongoose";

// const uri = process.env.MONGO_URI;

// async function connectDB() {
//   try {
//     await mongoose.connect(uri);
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.log(error);
//   }
// }

// export default connectDB;
