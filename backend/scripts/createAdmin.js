// import mongoose from "mongoose";
// import User from "../models/user.js";

// const createAdmin = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Connected to MongoDB");

//     const existingAdmin = await User.findOne({ email: "admin@example.com" });
//     if (existingAdmin) {
//       console.log("Admin already exists with this email.");
//       process.exit(0);
//     }

//     const admin = new User({
//       fullName: "Trigis Admin",
//       email: "admin@trigis.com",
//       phone: "0550000000",
//       password: "SecureAdmin123",
//       role: "superadmin",
//     });

//     await admin.save();
//     console.log("Admin created successfully!");
//     console.log(`Email: ${admin.email}`);
//     console.log(`Password: SecureAdmin123`);
//     process.exit(0);
//   } catch (err) {
//     console.error("Error creating admin:", err.message);
//     process.exit(1);
//   }
// };

// createAdmin();

import mongoose from "mongoose";
import User from "../models/user.js";

const createAdmin = async () => {
  try {
    // ✅ Support both MONGODB_URI and MONGO_URI
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MongoDB URI not found in environment variables");
    }

    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    // ✅ Check for the correct email
    const existingAdmin = await User.findOne({ email: "admin@trigis.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists with this email.");
      console.log(`Email: admin@trigis.com`);
      console.log(`You can login with the existing password.`);
      process.exit(0);
    }

    const admin = new User({
      fullName: "Trigis Admin",
      email: "admin@trigis.com",
      phone: "0550000000",
      password: "SecureAdmin123",
      role: "superadmin",
      isVerified: true, // ✅ Auto-verify admin
    });

    await admin.save();
    console.log("🎉 Admin created successfully!");
    console.log("=".repeat(50));
    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔑 Password: SecureAdmin123`);
    console.log(`👤 Role: ${admin.role}`);
    console.log("=".repeat(50));
    console.log("You can now login at: /login");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
