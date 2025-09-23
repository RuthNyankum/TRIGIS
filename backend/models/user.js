import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return value.includes("@");
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Regex: must start with 0, followed by 9 digits (total length 10)
          return /^0\d{9}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    }, // for MoMo
    password: {
      type: String,
      required: true,
      minlength: 5,
    }, // hashed
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
      set: (value) => value.toLowerCase(), //always lowercase
    },
    // models/user.js (schema fields)
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.compareTwoPasswords = function (
  inputtedPassword,
  dbpassword
) {
  return bcrypt.compare(inputtedPassword, dbpassword);
};

const User = model("User", userSchema);

export default User;
