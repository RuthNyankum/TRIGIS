import jwt from "jsonwebtoken";
import User from "../models/user.js";
import crypto from "crypto";
import { sendMail } from "../config/sendMail.js";

// export const register = async (req, res, next) => {
//   const { fullName, email, phone, password, role } = req.body;

//   if (!fullName || !email || !phone || !password || !role) {
//     const error = new Error("All fields are required");
//     error.statusCode = 400;
//     return next(error);
//   }

//   try {
//     const user = await User.create(req.body);

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.cookie("jwt", token, {
//       maxAge: 24 * 60 * 60 * 1000,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     });

//     res.status(201).json({
//       success: true,
//       statusCode: 201,
//       user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export const register = async (req, res, next) => {
  const { fullName, email, phone, password } = req.body;

  //  role removed from the validation check
  if (!fullName || !email || !phone || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }

  try {
    // Automatically use default role ("student")
    const user = await User.create({
      fullName,
      email,
      phone,
      password,
    });

    // Sign a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set cookie
    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Incorrect email or password");
      error.statusCode = 401;
      return next(error);
    }

    const isSame = await user.compareTwoPasswords(password, user.password);

    if (!isSame) {
      const error = new Error("Incorrect email or password");
      error.statusCode = 401;
      return next(error);
    }

    // Generate access token (short expiry)
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // 15 minutes
    );

    // Generate refresh token (long expiry)
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // 7 days
    );

    // Send cookies
    res
      .cookie("jwt", accessToken, {
        maxAge: 15 * 60 * 1000, // 15m
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .cookie("refreshJwt", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        user, // don’t send password
      });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.clearCookie("refreshJwt");

    res.status(200).json({
      success: true,
      message: "user logged out",
    });
  } catch (error) {
    next(error);
  }
};

// export const forgotPassword = async (req, res, next) => {
//   const { email } = req.body;

//   try {
//     if (!email) {
//       const error = new Error("Email is required");
//       error.statusCode = 400;
//       return next(error);
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       const error = new Error("User with this email does not exist");
//       error.statusCode = 400;
//       return next(error);
//     }

//     const resetToken = crypto.randomBytes(16).toString("hex");

//     user.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

//     await user.save({ validateBeforeSave: false });

//     //for backend texting
//     // const resetUrl = `${req.protocol}://${req.get(
//     //   "host"
//     // )}/api/auth/reset-password/${resetToken}`;

//     ////frontend text, so will comment the backend
//     const resetUrl = `${req.protocol}://localhost:5173/resetPassword/${resetToken}`;

//     const subject = `There has been a password reset request`;

//     const html = ` <p>This is the reset link:</p>
//       <a href="${resetUrl}" target="_blank">Follow link</a>`;

//     try {
//       sendMail({
//         to: user.email,
//         subject,
//         html,
//       });

//       res.status(200).json({
//         success: true,
//         message: "Link sent to email successfully",
//       });
//     } catch (error) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordTokenExpire = undefined;
//       user.save({ validateBeforeSave: true });
//       next(error);
//     }

//     res.status(200).json({
//       success: true,
//       message: "Password reset token generated",
//       resetToken,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User with this email does not exist");
      error.statusCode = 400;
      return next(error);
    }

    const resetToken = crypto.randomBytes(16).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    //for backend texting
    // const resetUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/auth/reset-password/${resetToken}`;

    ////frontend text, so will comment the backend
    const resetUrl = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;

    const subject = "🔐 Password Reset - WriterPro";

    const html = `
    <div style="max-width: 500px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
        <div style="background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background: linear-gradient(135deg, #7E1394, #CCD431); padding: 25px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🔒 Password Reset</h1>
            </div>
            <div style="padding: 30px;">
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    Someone requested a password reset for your WriterPro account.
                </p>
                <div style="text-align: center; margin: 25px 0;">
                    <a href="${resetUrl}" 
                       style="background: linear-gradient(to right, #7E1394, #CCD431); 
                              color: white; 
                              padding: 12px 25px; 
                              text-decoration: none; 
                              border-radius: 20px; 
                              display: inline-block;
                              font-weight: 600;">
                        Reset Password Now
                    </a>
                </div>
                <p style="font-size: 14px; color: #666; text-align: center;">
                    ⏰ This link expires in 1 hour
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 13px; color: #888;">
                    If you didn't request this, you can safely ignore this email.
                </p>
            </div>
        </div>
    </div>
    `;

    try {
      await sendMail({
        to: user.email,
        subject,
        html,
      });

      res.status(200).json({
        success: true,
        message: "Reset link sent to email successfully 📩",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetPasswordToken } = req.params; //because the reset token is usually passed inside the URL path

  try {
    //1. Hash token to match the one in the DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetPasswordToken)
      .digest("hex");

    //2. find user with the token and check if its not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      const error = new Error("Token is invalid or expired");
      error.statusCode = 400;
      return next(error);
    }

    //3. Update the password
    (user.password = req.body.password), (user.resetPasswordToken = undefined); //clear reset tokens
    user.resetPasswordExpires = undefined;
    user.isModified("password");

    //4. save user
    await user.save();

    res.status(200).json({
      sucess: true,
      message: "password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshJwt;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token found" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new access token
    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Send new access token cookie
    // res.cookie("jwt", newAccessToken, {
    //   maxAge: 15 * 60 * 1000, // 15m
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });
    res.cookie("refreshJwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ✅ prevents Chrome from blocking it locally
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

// Add this function
export const getCurrentUser = async (req, res) => {
  try {
    // Get user from token (you need to add auth middleware first)
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};
