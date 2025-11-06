import React, { useState } from "react";
import loginIcons from "../../assets/images/trigis.jpg";
import { FaEye, FaEyeSlash, FaUserPlus, FaShieldAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../../config/axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    try {
      const { confirmPassword, ...payload } = data;
      const response = await api.post("/auth/register", payload);

      console.log("Signup success:", response.data);
      toast.success("Signup successful! 🎉 Redirecting...");

      setData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <section
      id="signup"
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-1/4 w-4 h-4 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-48 right-1/3 w-3 h-3 bg-yellow-400 rounded-full opacity-30 animate-bounce"></div>
        <div
          className="absolute top-1/2 left-1/5 w-2 h-2 bg-purple-500 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="mx-auto container p-4 relative z-10">
        <div className="flex items-center justify-center min-h-screen py-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-purple-100">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full border-4 border-gradient-to-r from-purple-600 to-yellow-400 p-1 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={loginIcons}
                    alt="TRIGIS Consult"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold font-playfair text-gray-900 mb-2">
                Join{" "}
                <span className="bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent">
                  TRIGIS
                </span>
              </h1>
              <p className="text-gray-600 font-inter">
                Create your account to get started
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 font-inter flex items-center gap-2">
                  {/* <FaUserPlus className="text-purple-600" size={14} /> */}
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  name="fullName"
                  value={data.fullName}
                  onChange={handleOnChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 font-inter"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 font-inter">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 font-inter"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 font-inter">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={data.phone}
                  onChange={handleOnChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 font-inter"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 font-inter">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    required
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 font-inter"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 font-inter">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    required
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 font-inter"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-inter flex items-center justify-center gap-3 cursor-pointer"
              >
                <FaUserPlus size={16} />
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-inter">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-purple-600 hover:text-yellow-500 transition-colors duration-200 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <FaShieldAlt className="text-green-500" size={12} />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Trusted by 500+</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Professional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
