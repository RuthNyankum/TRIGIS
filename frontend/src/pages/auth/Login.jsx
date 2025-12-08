import React, { useState, useEffect } from "react";
import loginIcons from "../../assets/images/trigis.jpg";
import { FaEye, FaEyeSlash, FaSignInAlt, FaShieldAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsWakingUp(true);
      await dispatch(loginUser(data)).unwrap();
    } catch (error) {
      console.error("Login error:", error);

      // Handle backend wake-up scenario
      if (
        error?.code === "ERR_NETWORK" ||
        error?.code === "ERR_CONNECTION_REFUSED"
      ) {
        toast.warning(
          "Server is waking up... Please wait 50 seconds and try again.",
          {
            autoClose: 8000,
          }
        );
      } else if (error?.message) {
        toast.error(error.message);
      }
    } finally {
      setIsWakingUp(false);
    }
  };

  useEffect(() => {
    console.log("🔍 Auth state changed:", {
      isAuthenticated,
      user,
      token: localStorage.getItem("token"),
    });

    if (isAuthenticated && user) {
      if (user.role === "superadmin" || user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 relative overflow-hidden">
      <div className="mx-auto container p-4 relative z-10">
        <div className="flex items-center justify-center min-h-screen py-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-purple-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full border-4 p-1 mb-4">
                <img
                  src={loginIcons}
                  alt="TRIGIS Consult"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent">
                  TRIGIS
                </span>
              </h1>
              <p className="text-gray-600">Sign in to access your account</p>
            </div>

            {/* Wake-up indicator */}
            {isWakingUp && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 text-center">
                🔄 Connecting to server... This may take up to 50 seconds on
                first load.
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  disabled={loading || isWakingUp}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
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
                    disabled={loading || isWakingUp}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 disabled:opacity-50"
                    disabled={loading || isWakingUp}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading || isWakingUp}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              >
                {loading || isWakingUp ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isWakingUp ? "Waking up server..." : "Signing In..."}
                  </>
                ) : (
                  <>
                    <FaSignInAlt /> Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-purple-600 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
              <FaShieldAlt className="inline text-green-500 mr-1" />
              Secure Login | 24/7 Support | Trusted Platform
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

// import React, { useState, useEffect } from "react";
// import loginIcons from "../../assets/images/trigis.jpg";
// import { FaEye, FaEyeSlash, FaSignInAlt, FaShieldAlt } from "react-icons/fa";
// import { Link, useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../redux/slice/authSlice";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(data));
//   };

//   useEffect(() => {
//     console.log("🔍 Auth state changed:", {
//       isAuthenticated,
//       user,
//       token: localStorage.getItem("token"),
//     });

//     if (isAuthenticated && user) {
//       if (user.role === "superadmin" || user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else if (user.role === "student") {
//         navigate("/student/dashboard");
//       } else {
//         navigate("/");
//       }
//     }
//   }, [isAuthenticated, user, navigate]);

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 relative overflow-hidden">
//       <div className="mx-auto container p-4 relative z-10">
//         <div className="flex items-center justify-center min-h-screen py-8">
//           <div className="bg-white/80 backdrop-blur-sm p-8 w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-purple-100">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full border-4 p-1 mb-4">
//                 <img
//                   src={loginIcons}
//                   alt="TRIGIS Consult"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 Welcome to{" "}
//                 <span className="bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent">
//                   TRIGIS
//                 </span>
//               </h1>
//               <p className="text-gray-600">Sign in to access your account</p>
//             </div>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Email */}
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   value={data.email}
//                   onChange={handleOnChange}
//                   required
//                   className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500"
//                 />
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     name="password"
//                     value={data.password}
//                     onChange={handleOnChange}
//                     required
//                     className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//                 <div className="text-right">
//                   <Link
//                     to="/forgot-password"
//                     className="text-sm text-purple-600 hover:underline"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>
//               </div>

//               {/* Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
//               >
//                 {loading ? (
//                   "Signing In..."
//                 ) : (
//                   <>
//                     <FaSignInAlt /> Sign In
//                   </>
//                 )}
//               </button>
//             </form>

//             <div className="mt-8 text-center">
//               <p className="text-gray-600">
//                 Don’t have an account?{" "}
//                 <Link
//                   to="/signup"
//                   className="font-semibold text-purple-600 hover:underline"
//                 >
//                   Create Account
//                 </Link>
//               </p>
//             </div>

//             <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
//               <FaShieldAlt className="inline text-green-500 mr-1" />
//               Secure Login | 24/7 Support | Trusted Platform
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
