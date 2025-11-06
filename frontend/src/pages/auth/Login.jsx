import React, { useState } from "react";
import loginIcons from "../../assets/images/trigis.jpg";
import {
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../../config/axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await api.post("/auth/login", data);
      console.log("Login success:", response.data);

      toast.success("Login successful! 🎉");

      const { user, token } = response.data;

      //  Save token & user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "superadmin") {
        navigate("/admin/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/");
      }

      setData({ email: "", password: "" });
    } catch (error) {
      console.error("login error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <section
      id="login"
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-1/4 w-4 h-4 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-48 left-1/3 w-3 h-3 bg-yellow-400 rounded-full opacity-30 animate-bounce"></div>
        <div
          className="absolute top-1/2 right-1/5 w-2 h-2 bg-purple-500 rounded-full opacity-25 animate-pulse"
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
                Welcome to{" "}
                <span className="bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent">
                  TRIGIS
                </span>
              </h1>
              <p className="text-gray-600 font-inter">
                Sign in to access your account
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 font-inter">
                  Email Address
                </label>
                <div className="relative">
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
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 font-inter flex items-center gap-2">
                  {/* <FaLock className="text-purple-600" size={14} /> */}
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-600 hover:text-yellow-500 font-medium transition-colors duration-200 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-inter flex items-center justify-center gap-3 cursor-pointer"
              >
                <FaSignInAlt size={16} />
                Sign In
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-inter">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-purple-600 hover:text-yellow-500 transition-colors duration-200 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Divider */}
            {/* <div className="my-8 flex items-center">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-4 text-sm text-gray-500 font-inter">
                or continue with
              </span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div> */}

            {/* Social Login Options */}
            {/* <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-gray-50 transition-all duration-300 font-inter text-gray-700"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </div> */}

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <FaShieldAlt className="text-green-500" size={12} />
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Trusted Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
