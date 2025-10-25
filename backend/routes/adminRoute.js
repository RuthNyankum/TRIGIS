// import express from "express";
// import User from "../models/user.js";
// import { routeProtect, authorizeRoles } from "../middlewares/routeProtect.js";

// const router = express.Router();

// /**
//  * @desc Create a new admin (only existing admins can do this)
//  * @route POST /api/admin/create
//  * @access Private/Admin
//  */
// router.post(
//   "/create",
//   routeProtect,
//   authorizeRoles("admin"),
//   async (req, res) => {
//     try {
//       const { fullName, email, phone, password } = req.body;

//       if (!fullName || !email || !phone || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//       }

//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: "Email already exists" });
//       }

//       const newAdmin = new User({
//         fullName,
//         email,
//         phone,
//         password,
//         role: "admin", // Force it to admin
//       });

//       await newAdmin.save();
//       res.status(201).json({
//         success: true,
//         message: "Admin created successfully",
//         data: {
//           id: newAdmin._id,
//           fullName: newAdmin.fullName,
//           email: newAdmin.email,
//           phone: newAdmin.phone,
//           role: newAdmin.role,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   }
// );

// export default router;

import express from "express";
import User from "../models/user.js";
import { routeProtect, authorizeRoles } from "../middlewares/routeProtect.js";

const router = express.Router();

/**
 * @desc Create a new admin (only superadmin can do this)
 * @route POST /api/admin/create
 * @access Private/Superadmin
 */
router.post(
  "/create",
  routeProtect,
  authorizeRoles("superadmin"),
  async (req, res) => {
    try {
      const { fullName, email, phone, password } = req.body;

      if (!fullName || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newAdmin = new User({
        fullName,
        email,
        phone,
        password,
        role: "admin", // Force admin role
      });

      await newAdmin.save();

      res.status(201).json({
        success: true,
        message: "Admin created successfully",
        admin: {
          _id: newAdmin._id,
          fullName: newAdmin.fullName,
          email: newAdmin.email,
          phone: newAdmin.phone,
          role: newAdmin.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

/**
 * @desc Get all admins
 * @route GET /api/admin/all
 * @access Private/Admin or Superadmin
 */
router.get(
  "/all",
  routeProtect,
  authorizeRoles("admin", "superadmin"),
  async (req, res) => {
    try {
      const admins = await User.find({ role: "admin" }).select(
        "_id fullName email phone role createdAt"
      );

      res.status(200).json({
        success: true,
        admins,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

/**
 * @desc Update an admin
 * @route PUT /api/admin/update/:id
 * @access Private/Superadmin
 */
router.put(
  "/update/:id",
  routeProtect,
  authorizeRoles("superadmin"),
  async (req, res) => {
    try {
      const { fullName, email, phone, password } = req.body;

      const admin = await User.findById(req.params.id);
      if (!admin || admin.role !== "admin") {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Update fields if provided
      if (fullName) admin.fullName = fullName;
      if (email) admin.email = email;
      if (phone) admin.phone = phone;
      if (password) admin.password = password; // Will be hashed automatically in User model

      await admin.save();

      res.status(200).json({
        success: true,
        message: "Admin updated successfully",
        admin: {
          _id: admin._id,
          fullName: admin.fullName,
          email: admin.email,
          phone: admin.phone,
          role: admin.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

/**
 * @desc Delete an admin by ID
 * @route DELETE /api/admin/delete/:id
 * @access Private/Superadmin
 */
router.delete(
  "/delete/:id",
  routeProtect,
  authorizeRoles("superadmin"),
  async (req, res) => {
    try {
      const admin = await User.findById(req.params.id);

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Prevent self-deletion
      if (admin._id.toString() === req.user.id) {
        return res.status(403).json({
          message: "You cannot delete your own admin account",
        });
      }

      await admin.deleteOne();
      res.status(200).json({
        success: true,
        message: "Admin deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

export default router;
