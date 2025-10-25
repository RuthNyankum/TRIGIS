// import React, { useState } from "react";
// import {
//   FaPlay,
//   FaCheckCircle,
//   FaClock,
//   FaStar,
//   FaSearch,
//   FaFilter,
//   FaBook,
//   FaChartLine,
//   FaCertificate,
//   FaLock,
// } from "react-icons/fa";

// const StudentCourses = () => {
//   const [activeTab, setActiveTab] = useState("enrolled");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [enrolledCourses] = useState([
//     {
//       id: 1,
//       title: "Advanced JavaScript",
//       instructor: "John Smith",
//       progress: 75,
//       thumbnail: "https://via.placeholder.com/300x180/3B82F6/FFFFFF?text=JS",
//       totalLessons: 48,
//       completedLessons: 36,
//       duration: "12 hours",
//       nextLesson: "Async/Await Patterns",
//       rating: 4.8,
//       studyTime: "9 hours",
//     },
//     {
//       id: 2,
//       title: "React Fundamentals",
//       instructor: "Sarah Johnson",
//       progress: 60,
//       thumbnail: "https://via.placeholder.com/300x180/06B6D4/FFFFFF?text=React",
//       totalLessons: 35,
//       completedLessons: 21,
//       duration: "10 hours",
//       nextLesson: "State Management",
//       rating: 4.7,
//       studyTime: "6 hours",
//     },
//     {
//       id: 3,
//       title: "UI/UX Design Masterclass",
//       instructor: "Mike Davis",
//       progress: 40,
//       thumbnail:
//         "https://via.placeholder.com/300x180/8B5CF6/FFFFFF?text=Design",
//       totalLessons: 52,
//       completedLessons: 21,
//       duration: "15 hours",
//       nextLesson: "Color Theory",
//       rating: 4.9,
//       studyTime: "6 hours",
//     },
//   ]);

//   const [completedCourses] = useState([
//     {
//       id: 4,
//       title: "Python Basics",
//       instructor: "Emma Wilson",
//       completedDate: "March 15, 2024",
//       thumbnail:
//         "https://via.placeholder.com/300x180/10B981/FFFFFF?text=Python",
//       rating: 4.6,
//       certificateAvailable: true,
//       finalScore: 95,
//     },
//     {
//       id: 5,
//       title: "Web Development 101",
//       instructor: "Tom Brown",
//       completedDate: "February 28, 2024",
//       thumbnail:
//         "https://via.placeholder.com/300x180/F59E0B/FFFFFF?text=Web+Dev",
//       rating: 4.5,
//       certificateAvailable: true,
//       finalScore: 88,
//     },
//   ]);

//   const filteredEnrolled = enrolledCourses.filter(
//     (course) =>
//       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredCompleted = completedCourses.filter(
//     (course) =>
//       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold mb-2">My Courses</h1>
//         <p className="text-gray-600">
//           Track your learning progress and continue where you left off
//         </p>
//       </div>

//       <div className="flex items-center justify-between mb-6">
//         <div className="flex gap-2">
//           <button
//             onClick={() => setActiveTab("enrolled")}
//             className={`px-4 py-2 rounded-lg font-medium transition ${
//               activeTab === "enrolled"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-50"
//             }`}
//           >
//             In Progress ({enrolledCourses.length})
//           </button>
//           <button
//             onClick={() => setActiveTab("completed")}
//             className={`px-4 py-2 rounded-lg font-medium transition ${
//               activeTab === "completed"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-50"
//             }`}
//           >
//             Completed ({completedCourses.length})
//           </button>
//         </div>

//         <div className="flex-1 max-w-md ml-4">
//           <div className="relative">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search your courses..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       {activeTab === "enrolled" && (
//         <div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredEnrolled.map((course) => (
//               <div
//                 key={course.id}
//                 className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
//               >
//                 <div className="relative">
//                   <img
//                     src={course.thumbnail}
//                     alt={course.title}
//                     className="w-full h-40 object-cover"
//                   />
//                   <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//                     <FaStar className="text-yellow-500" />
//                     {course.rating}
//                   </div>
//                 </div>

//                 <div className="p-4">
//                   <h3 className="font-bold text-gray-900 mb-1">
//                     {course.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-3">
//                     {course.instructor}
//                   </p>

//                   <div className="mb-3">
//                     <div className="flex items-center justify-between text-sm mb-1">
//                       <span className="text-gray-600">Progress</span>
//                       <span className="font-semibold text-gray-900">
//                         {course.progress}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-blue-600 h-2 rounded-full transition-all"
//                         style={{ width: `${course.progress}%` }}
//                       />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
//                     <span className="flex items-center gap-1">
//                       <FaBook />
//                       {course.completedLessons}/{course.totalLessons} lessons
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <FaClock />
//                       {course.studyTime}
//                     </span>
//                   </div>

//                   <div className="border-t pt-3">
//                     <p className="text-xs text-gray-600 mb-2">
//                       Next:{" "}
//                       <span className="font-medium text-gray-900">
//                         {course.nextLesson}
//                       </span>
//                     </p>
//                     <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
//                       <FaPlay className="w-3 h-3" />
//                       Continue Learning
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {filteredEnrolled.length === 0 && (
//             <div className="text-center py-12 bg-white rounded-lg">
//               <FaBook className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//               <p className="text-gray-500">
//                 No courses found matching your search.
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === "completed" && (
//         <div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCompleted.map((course) => (
//               <div
//                 key={course.id}
//                 className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
//               >
//                 <div className="relative">
//                   <img
//                     src={course.thumbnail}
//                     alt={course.title}
//                     className="w-full h-40 object-cover"
//                   />
//                   <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//                     <FaCheckCircle />
//                     Completed
//                   </div>
//                 </div>

//                 <div className="p-4">
//                   <h3 className="font-bold text-gray-900 mb-1">
//                     {course.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-3">
//                     {course.instructor}
//                   </p>

//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-1">
//                       <FaStar className="text-yellow-500" />
//                       <span className="text-sm font-medium">
//                         {course.rating}
//                       </span>
//                     </div>
//                     <div className="text-sm">
//                       <span className="text-gray-600">Final Score: </span>
//                       <span className="font-bold text-green-600">
//                         {course.finalScore}%
//                       </span>
//                     </div>
//                   </div>

//                   <p className="text-xs text-gray-500 mb-3">
//                     Completed on {course.completedDate}
//                   </p>

//                   <div className="flex gap-2">
//                     <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 text-sm">
//                       <FaChartLine />
//                       Review
//                     </button>
//                     {course.certificateAvailable ? (
//                       <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm">
//                         <FaCertificate />
//                         Certificate
//                       </button>
//                     ) : (
//                       <button className="flex-1 bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed flex items-center justify-center gap-2 text-sm">
//                         <FaLock />
//                         Certificate
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {filteredCompleted.length === 0 && (
//             <div className="text-center py-12 bg-white rounded-lg">
//               <FaCheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//               <p className="text-gray-500">No completed courses yet.</p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Keep learning to complete your first course!
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentCourses;

import React from "react";

const StudentCourses = () => {
  return (
    <div>
      <p>STUDENT COURSES</p>
    </div>
  );
};

export default StudentCourses;
