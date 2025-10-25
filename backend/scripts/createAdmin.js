import mongoose from "mongoose";
import User from "../models/user.js";

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists with this email.");
      process.exit(0);
    }

    const admin = new User({
      fullName: "Trigis Admin",
      email: "admin@trigis.com",
      phone: "0550000000",
      password: "SecureAdmin123",
      role: "superadmin",
    });

    await admin.save();
    console.log("Admin created successfully!");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: SecureAdmin123`);
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
