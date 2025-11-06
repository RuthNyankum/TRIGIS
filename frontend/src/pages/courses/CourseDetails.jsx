// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import api from "../../config/axios";
// import {
//   FaClock,
//   FaPlay,
//   FaBookOpen,
//   FaStar,
//   FaUsers,
//   FaChartLine,
//   FaCheckCircle,
//   FaGraduationCap,
//   FaLanguage,
//   FaCertificate,
//   FaInfinity,
//   FaMobile,
//   FaArrowLeft,
//   FaShoppingCart,
//   FaHeart,
// } from "react-icons/fa";

// const CourseDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("overview");

//   // Fetch current user
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/auth/me");
//         setUser(res.data?.data || res.data?.user || res.data);
//       } catch (err) {
//         console.log("User not logged in");
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await api.get(`/courses/public/${id}`);
//         setCourse(res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch course:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [id]);

//   const handleEnroll = async () => {
//     if (!user) {
//       alert("Please login to enroll in this course");
//       navigate("/login");
//       return;
//     }

//     if (user.role !== "student") {
//       alert(`Only students can enroll in courses. Your role: ${user.role}`);
//       return;
//     }

//     try {
//       await api.post(`/courses/student/${id}/enroll`);
//       alert("✅ Enrolled successfully!");
//       navigate("/student/dashboard");
//     } catch (err) {
//       console.error(err);
//       const errorMsg = err.response?.data?.message || "Failed to enroll";
//       alert(`❌ ${errorMsg}`);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">😕</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Course Not Found
//           </h2>
//           <p className="text-gray-600 mb-6">
//             The course you're looking for doesn't exist or has been removed.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const getGradientClass = (color) => {
//     const gradients = {
//       purple: "bg-gradient-to-br from-purple-500 to-purple-600",
//       blue: "bg-gradient-to-br from-blue-500 to-blue-600",
//       green: "bg-gradient-to-br from-green-500 to-green-600",
//       red: "bg-gradient-to-br from-red-500 to-red-600",
//       yellow: "bg-gradient-to-br from-yellow-500 to-yellow-600",
//       indigo: "bg-gradient-to-br from-indigo-500 to-indigo-600",
//       teal: "bg-gradient-to-br from-teal-500 to-teal-600",
//       pink: "bg-gradient-to-br from-pink-500 to-pink-600",
//     };
//     return gradients[color] || gradients.purple;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div
//         className={`${getGradientClass(
//           course.defaultCardColor
//         )} text-white py-12`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition"
//           >
//             <FaArrowLeft />
//             <span>Back to Courses</span>
//           </button>

//           <div className="grid lg:grid-cols-3 gap-8 items-start">
//             {/* Left Content */}
//             <div className="lg:col-span-2">
//               <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-4">
//                 {course.category}
//               </div>

//               <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
//                 {course.title}
//               </h1>

//               <p className="text-xl text-white/90 mb-6">{course.description}</p>

//               {/* Stats Row */}
//               <div className="flex flex-wrap items-center gap-6 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center">
//                     <FaStar className="text-yellow-400" />
//                     <span className="ml-1 font-bold">
//                       {course.rating || 4.5}
//                     </span>
//                   </div>
//                   <span className="text-white/80">
//                     ({course.totalRatings?.toLocaleString() || 0} ratings)
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <FaUsers />
//                   <span>
//                     {course.enrolledStudents?.toLocaleString() || 0} students
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <FaChartLine />
//                   <span>{course.level}</span>
//                 </div>
//               </div>

//               {/* Instructor */}
//               <div className="mt-6 flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
//                   👨‍🏫
//                 </div>
//                 <div>
//                   <p className="text-sm text-white/80">Created by</p>
//                   <p className="font-semibold">{course.instructorName}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Card - Sticky Enrollment */}
//             <div className="lg:sticky lg:top-6">
//               <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//                 {/* Preview Image/Icon */}
//                 <div
//                   className={`${getGradientClass(
//                     course.defaultCardColor
//                   )} h-48 flex items-center justify-center relative`}
//                 >
//                   <FaPlay className="w-16 h-16 text-white/80" />
//                   <div className="absolute inset-0 bg-black/20"></div>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6">
//                     <div className="flex items-baseline gap-2 mb-2">
//                       <span className="text-4xl font-bold text-gray-900">
//                         ${course.price}
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleEnroll}
//                     className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-3"
//                   >
//                     <FaShoppingCart />
//                     {user ? "Enroll Now" : "Login to Enroll"}
//                   </button>

//                   <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2">
//                     <FaHeart />
//                     Add to Wishlist
//                   </button>

//                   <div className="mt-6 space-y-3 text-sm">
//                     <div className="flex items-center gap-3">
//                       <FaClock className="text-gray-600" />
//                       <span className="text-gray-700">
//                         {course.duration} duration
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <FaPlay className="text-gray-600" />
//                       <span className="text-gray-700">
//                         {course.totalLessons} lectures
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <FaMobile className="text-gray-600" />
//                       <span className="text-gray-700">
//                         Access on mobile and desktop
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <FaInfinity className="text-gray-600" />
//                       <span className="text-gray-700">Lifetime access</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <FaCertificate className="text-gray-600" />
//                       <span className="text-gray-700">
//                         Certificate of completion
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2">
//             {/* Tabs */}
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
//               <div className="border-b">
//                 <div className="flex">
//                   {["overview", "instructor"].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`flex-1 px-6 py-4 font-semibold capitalize transition ${
//                         activeTab === tab
//                           ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
//                           : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
//                       }`}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="p-8">
//                 {/* Overview Tab */}
//                 {activeTab === "overview" && (
//                   <div className="space-y-8">
//                     {course.learningOutcomes?.length > 0 && (
//                       <div>
//                         <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                           What you'll learn
//                         </h2>
//                         <div className="grid md:grid-cols-2 gap-3">
//                           {course.learningOutcomes.map((outcome, i) => (
//                             <div key={i} className="flex gap-3">
//                               <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
//                               <span className="text-gray-700">{outcome}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {course.requirements?.length > 0 && (
//                       <div className="border-t pt-8">
//                         <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                           Requirements
//                         </h2>
//                         <ul className="space-y-2">
//                           {course.requirements.map((req, i) => (
//                             <li key={i} className="flex gap-3 text-gray-700">
//                               <span className="text-gray-400">•</span>
//                               <span>{req}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     <div className="border-t pt-8">
//                       <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                         Description
//                       </h2>
//                       <p className="text-gray-700 leading-relaxed">
//                         {course.description}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Instructor Tab */}
//                 {activeTab === "instructor" && (
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                       Instructor
//                     </h2>
//                     <div className="flex items-start gap-6">
//                       <div
//                         className={`w-32 h-32 rounded-full ${getGradientClass(
//                           course.defaultCardColor
//                         )} flex items-center justify-center text-5xl flex-shrink-0`}
//                       >
//                         👨‍🏫
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-gray-900">
//                           {course.instructorName}
//                         </h3>
//                         <p className="text-gray-600 mb-4">Expert Instructor</p>

//                         <div className="flex gap-6 text-sm">
//                           <div>
//                             <FaStar className="inline text-yellow-500 mr-1" />
//                             <span className="font-semibold">
//                               {course.rating || 4.5}
//                             </span>{" "}
//                             Instructor Rating
//                           </div>
//                           <div>
//                             <FaUsers className="inline text-gray-500 mr-1" />
//                             <span className="font-semibold">
//                               {course.enrolledStudents?.toLocaleString() || 0}
//                             </span>{" "}
//                             Students
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Additional Info */}
//           <div className="space-y-6">
//             {/* Course Includes */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h3 className="font-bold text-gray-900 mb-4">
//                 This course includes:
//               </h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex items-center gap-3 text-gray-700">
//                   <FaPlay className="text-blue-600" />
//                   <span>On-demand video content</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-gray-700">
//                   <FaBookOpen className="text-blue-600" />
//                   <span>Learning materials</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-gray-700">
//                   <FaMobile className="text-blue-600" />
//                   <span>Access on mobile and TV</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-gray-700">
//                   <FaInfinity className="text-blue-600" />
//                   <span>Full lifetime access</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-gray-700">
//                   <FaCertificate className="text-blue-600" />
//                   <span>Certificate of completion</span>
//                 </div>
//               </div>
//             </div>

//             {/* Share Course */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h3 className="font-bold text-gray-900 mb-4">
//                 Share this course
//               </h3>
//               <div className="flex gap-3">
//                 <button className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-xl">
//                   📘
//                 </button>
//                 <button className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-xl">
//                   🐦
//                 </button>
//                 <button className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-xl">
//                   📧
//                 </button>
//                 <button className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-xl">
//                   🔗
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../../config/axios";
import {
  FaClock,
  FaPlay,
  FaBookOpen,
  FaStar,
  FaUsers,
  FaChartLine,
  FaCheckCircle,
  FaGraduationCap,
  FaLanguage,
  FaCertificate,
  FaInfinity,
  FaMobile,
  FaArrowLeft,
  FaShoppingCart,
  FaHeart,
  FaChevronDown,
  FaChevronUp,
  FaLock,
  FaVideo,
  FaFileAlt,
  FaBook,
} from "react-icons/fa";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({});

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data?.data || res.data?.user || res.data);
      } catch (err) {
        console.log("User not logged in");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/public/${id}`);
        setCourse(res.data.data);

        // Auto-expand first section
        if (res.data.data.sections?.length > 0) {
          setExpandedSections({ [res.data.data.sections[0]._id]: true });
        }
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      alert("Please login to enroll in this course");
      navigate("/login");
      return;
    }

    if (user.role !== "student") {
      alert(`Only students can enroll in courses. Your role: ${user.role}`);
      return;
    }

    try {
      await api.post(`/courses/student/${id}/enroll`);
      alert("✅ Enrolled successfully!");
      navigate(`/course/${id}/learn`); // Redirect to course viewer
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Failed to enroll";
      alert(`❌ ${errorMsg}`);
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Course Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getGradientClass = (color) => {
    const gradients = {
      purple: "bg-gradient-to-br from-purple-500 to-purple-600",
      blue: "bg-gradient-to-br from-blue-500 to-blue-600",
      green: "bg-gradient-to-br from-green-500 to-green-600",
      red: "bg-gradient-to-br from-red-500 to-red-600",
      yellow: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      indigo: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      teal: "bg-gradient-to-br from-teal-500 to-teal-600",
      pink: "bg-gradient-to-br from-pink-500 to-pink-600",
    };
    return gradients[color] || gradients.purple;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className={`${getGradientClass(
          course.defaultCardColor
        )} text-white py-12`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition"
          >
            <FaArrowLeft />
            <span>Back to Courses</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {course.category}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {course.title}
              </h1>

              <p className="text-xl text-white/90 mb-6">{course.description}</p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400" />
                    <span className="ml-1 font-bold">
                      {course.rating || 4.5}
                    </span>
                  </div>
                  <span className="text-white/80">
                    ({course.totalRatings?.toLocaleString() || 0} ratings)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaUsers />
                  <span>
                    {course.enrolledStudents?.toLocaleString() || 0} students
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaChartLine />
                  <span>{course.level}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  👨‍🏫
                </div>
                <div>
                  <p className="text-sm text-white/80">Created by</p>
                  <p className="font-semibold">{course.instructorName}</p>
                </div>
              </div>
            </div>

            {/* Right Card - Sticky Enrollment */}
            <div className="lg:sticky lg:top-6">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Preview Image/Icon */}
                <div
                  className={`${getGradientClass(
                    course.defaultCardColor
                  )} h-48 flex items-center justify-center relative`}
                >
                  <FaPlay className="w-16 h-16 text-white/80" />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ₵{course.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleEnroll}
                    className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-3 cursor-pointer"
                  >
                    <FaShoppingCart />
                    {user ? "Enroll Now" : "Login to Enroll"}
                  </button>

                  <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2">
                    <FaHeart />
                    Add to Wishlist
                  </button>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <FaClock className="text-gray-600" />
                      <span className="text-gray-700">
                        {course.totalDuration} minutes total
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPlay className="text-gray-600" />
                      <span className="text-gray-700">
                        {course.totalLessons} lectures
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaVideo className="text-gray-600" />
                      <span className="text-gray-700">
                        {course.totalVideos} video lessons
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMobile className="text-gray-600" />
                      <span className="text-gray-700">
                        Access on mobile and desktop
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaInfinity className="text-gray-600" />
                      <span className="text-gray-700">Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCertificate className="text-gray-600" />
                      <span className="text-gray-700">
                        Certificate of completion
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="border-b">
                <div className="flex">
                  {["overview", "curriculum", "instructor"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 font-semibold capitalize transition ${
                        activeTab === tab
                          ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    {course.learningOutcomes?.length > 0 && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          What you'll learn
                        </h2>
                        <div className="grid md:grid-cols-2 gap-3">
                          {course.learningOutcomes.map((outcome, i) => (
                            <div key={i} className="flex gap-3">
                              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {course.requirements?.length > 0 && (
                      <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          Requirements
                        </h2>
                        <ul className="space-y-2">
                          {course.requirements.map((req, i) => (
                            <li key={i} className="flex gap-3 text-gray-700">
                              <span className="text-gray-400">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="border-t pt-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Description
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === "curriculum" && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Course Content
                      </h2>
                      <p className="text-gray-600">
                        {course.totalSections} sections • {course.totalLessons}{" "}
                        lectures • {Math.floor(course.totalDuration / 60)}h{" "}
                        {course.totalDuration % 60}m total length
                      </p>
                    </div>

                    {course.sections && course.sections.length > 0 ? (
                      <div className="space-y-3">
                        {course.sections.map((section, sectionIdx) => (
                          <div
                            key={section._id}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                          >
                            {/* Section Header */}
                            <button
                              onClick={() => toggleSection(section._id)}
                              className="w-full bg-gray-50 hover:bg-gray-100 p-4 flex items-center justify-between transition"
                            >
                              <div className="flex items-center gap-3 text-left">
                                <span className="font-semibold text-gray-900">
                                  Section {sectionIdx + 1}: {section.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">
                                  {section.lessons?.length || 0} lessons
                                </span>
                                {expandedSections[section._id] ? (
                                  <FaChevronUp className="text-gray-600" />
                                ) : (
                                  <FaChevronDown className="text-gray-600" />
                                )}
                              </div>
                            </button>

                            {/* Section Lessons */}
                            {expandedSections[section._id] && (
                              <div className="bg-white">
                                {section.description && (
                                  <div className="px-4 py-2 text-sm text-gray-600 border-b">
                                    {section.description}
                                  </div>
                                )}

                                {section.lessons &&
                                section.lessons.length > 0 ? (
                                  <div className="divide-y">
                                    {section.lessons.map(
                                      (lesson, lessonIdx) => (
                                        <div
                                          key={lesson._id}
                                          className="p-4 hover:bg-gray-50 transition"
                                        >
                                          <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3 flex-1">
                                              {/* Lesson Icon */}
                                              <div className="mt-1">
                                                {lesson.isFree ? (
                                                  lesson.type === "video" ? (
                                                    <FaPlay className="text-green-600" />
                                                  ) : (
                                                    <FaBook className="text-green-600" />
                                                  )
                                                ) : (
                                                  <FaLock className="text-gray-400" />
                                                )}
                                              </div>

                                              {/* Lesson Info */}
                                              <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                  <span className="font-medium text-gray-900">
                                                    {lessonIdx + 1}.{" "}
                                                    {lesson.title}
                                                  </span>
                                                  {lesson.isFree && (
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                                      FREE PREVIEW
                                                    </span>
                                                  )}
                                                </div>

                                                <p className="text-sm text-gray-600 mb-2">
                                                  {lesson.description}
                                                </p>

                                                {/* Lesson Resources */}
                                                <div className="flex flex-wrap items-center gap-3 text-xs">
                                                  {lesson.type === "video" &&
                                                    lesson.video?.duration && (
                                                      <span className="flex items-center gap-1 text-gray-500">
                                                        <FaClock className="w-3 h-3" />
                                                        {Math.floor(
                                                          lesson.video
                                                            .duration / 60
                                                        )}
                                                        :
                                                        {(
                                                          lesson.video
                                                            .duration % 60
                                                        )
                                                          .toString()
                                                          .padStart(2, "0")}
                                                      </span>
                                                    )}

                                                  {lesson.type === "video" && (
                                                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                                                      <FaVideo className="w-3 h-3" />
                                                      Video
                                                    </span>
                                                  )}

                                                  {lesson.content &&
                                                    lesson.content.includes(
                                                      ".pdf"
                                                    ) && (
                                                      <span className="flex items-center gap-1 text-purple-600 font-medium">
                                                        <FaFileAlt className="w-3 h-3" />
                                                        PDF Material
                                                      </span>
                                                    )}

                                                  {lesson.type ===
                                                    "article" && (
                                                    <span className="flex items-center gap-1 text-gray-600">
                                                      <FaBook className="w-3 h-3" />
                                                      Article
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                            </div>

                                            {/* Preview Button for Free Lessons */}
                                            {lesson.isFree && (
                                              <button
                                                onClick={() => {
                                                  if (lesson.video?.url) {
                                                    window.open(
                                                      lesson.video.url,
                                                      "_blank"
                                                    );
                                                  }
                                                }}
                                                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                              >
                                                Preview
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <div className="p-4 text-center text-gray-500 text-sm">
                                    No lessons in this section yet
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <FaBookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>No curriculum available yet</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Instructor Tab */}
                {activeTab === "instructor" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Instructor
                    </h2>
                    <div className="flex items-start gap-6">
                      <div
                        className={`w-32 h-32 rounded-full ${getGradientClass(
                          course.defaultCardColor
                        )} flex items-center justify-center text-5xl flex-shrink-0`}
                      >
                        👨‍🏫
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {course.instructorName}
                        </h3>
                        <p className="text-gray-600 mb-4">Expert Instructor</p>

                        <div className="flex gap-6 text-sm">
                          <div>
                            <FaStar className="inline text-yellow-500 mr-1" />
                            <span className="font-semibold">
                              {course.rating || 4.5}
                            </span>{" "}
                            Instructor Rating
                          </div>
                          <div>
                            <FaUsers className="inline text-gray-500 mr-1" />
                            <span className="font-semibold">
                              {course.enrolledStudents?.toLocaleString() || 0}
                            </span>{" "}
                            Students
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Course Includes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                This course includes:
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaVideo className="text-purple-600" />
                  <span>{course.totalVideos} video lectures</span>
                </div>
                {course.totalArticles > 0 && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaBookOpen className="text-purple-600" />
                    <span>{course.totalArticles} articles</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-700">
                  <FaFileAlt className="text-purple-600" />
                  <span>Downloadable resources</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaMobile className="text-purple-600" />
                  <span>Access on mobile and TV</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaInfinity className="text-purple-600" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaCertificate className="text-purple-600" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </div>

            {/* Share Course */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Share this course
              </h3>
              <div className="flex gap-3">
                <button className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-xl">
                  📘
                </button>
                <button className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-xl">
                  🐦
                </button>
                <button className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-xl">
                  📧
                </button>
                <button className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-xl">
                  🔗
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
