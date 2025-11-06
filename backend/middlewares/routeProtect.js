// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// // ✅ Authentication: protect routes (must be logged in)
// export const routeProtect = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;

//     if (!token) {
//       return res.status(401).json({ message: "User not logged in" });
//     }

//     //verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded) {
//       const error = new Error("token Invalid");
//       error.statusCode = 401;
//       return next(error);
//     }

//     const user = await User.findById(decoded.id).select("-password");

//     req.user = user;

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// //  Authorization: allow only certain roles
// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         message: "Access denied: insufficient role",
//       });
//     }
//     next();
//   };
// };

// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// // Protect routes (user must be logged in)
// export const routeProtect = async (req, res, next) => {
//   try {
//     // Get JWT from cookies
//     const token = req.cookies.jwt;

//     if (!token) {
//       return res.status(401).json({ message: "User not logged in" });
//     }

//     // Verify token
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return res.status(401).json({ message: "Token expired or invalid" });
//     }

//     // Find user in DB
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Attach user to request
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// //  Restrict access to certain roles
// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         message: "Access denied: insufficient role",
//       });
//     }
//     next();
//   };
// };

import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Protect routes (user must be logged in)
export const routeProtect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "User not logged in" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Token expired or invalid" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Restrict access to certain roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient role" });
    }
    next();
  };
};
