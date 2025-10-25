// import React, { useState } from "react";
// import {
//   FaPlus,
//   FaEdit,
//   FaTrash,
//   FaEye,
//   FaSearch,
//   FaFilter,
//   FaUsers,
//   FaStar,
//   FaClock,
//   FaTimesCircle,
// } from "react-icons/fa";

// const ManageCourses = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);

//   const [courses, setCourses] = useState([
//     {
//       id: 1,
//       title: "Advanced JavaScript",
//       instructor: "John Smith",
//       students: 324,
//       rating: 4.8,
//       duration: "12 hours",
//       status: "published",
//       price: 49.99,
//       lastUpdated: "2 days ago",
//       category: "Programming",
//     },
//     {
//       id: 2,
//       title: "React Fundamentals",
//       instructor: "Sarah Johnson",
//       students: 289,
//       rating: 4.7,
//       duration: "10 hours",
//       status: "published",
//       price: 39.99,
//       lastUpdated: "1 week ago",
//       category: "Programming",
//     },
//     {
//       id: 3,
//       title: "UI/UX Design Masterclass",
//       instructor: "Mike Davis",
//       students: 256,
//       rating: 4.9,
//       duration: "15 hours",
//       status: "published",
//       price: 59.99,
//       lastUpdated: "3 days ago",
//       category: "Design",
//     },
//     {
//       id: 4,
//       title: "Python for Beginners",
//       instructor: "Emma Wilson",
//       students: 198,
//       rating: 4.6,
//       duration: "8 hours",
//       status: "draft",
//       price: 29.99,
//       lastUpdated: "5 days ago",
//       category: "Programming",
//     },
//     {
//       id: 5,
//       title: "Digital Marketing 101",
//       instructor: "Tom Brown",
//       students: 145,
//       rating: 4.5,
//       duration: "6 hours",
//       status: "pending",
//       price: 34.99,
//       lastUpdated: "1 day ago",
//       category: "Marketing",
//     },
//   ]);

//   const filteredCourses = courses.filter((course) => {
//     const matchesSearch =
//       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter =
//       filterStatus === "all" || course.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       setCourses(courses.filter((course) => course.id !== id));
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "published":
//         return "bg-green-100 text-green-800";
//       case "draft":
//         return "bg-gray-100 text-gray-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold mb-2">Manage Courses</h1>
//           <p className="text-gray-600">Create, edit, and manage all courses</p>
//         </div>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
//         >
//           <FaPlus />
//           Add New Course
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <p className="text-gray-500 text-sm">Total Courses</p>
//           <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <p className="text-gray-500 text-sm">Published</p>
//           <p className="text-2xl font-bold text-green-600">
//             {courses.filter((c) => c.status === "published").length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <p className="text-gray-500 text-sm">Draft</p>
//           <p className="text-2xl font-bold text-gray-600">
//             {courses.filter((c) => c.status === "draft").length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <p className="text-gray-500 text-sm">Pending Review</p>
//           <p className="text-2xl font-bold text-yellow-600">
//             {courses.filter((c) => c.status === "pending").length}
//           </p>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search courses or instructors..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <FaFilter className="text-gray-400" />
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="published">Published</option>
//               <option value="draft">Draft</option>
//               <option value="pending">Pending</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                   Course
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                   Instructor
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                   Students
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                   Rating
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                   Status
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                   Price
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCourses.map((course) => (
//                 <tr
//                   key={course.id}
//                   className="border-b border-gray-100 hover:bg-gray-50 transition"
//                 >
//                   <td className="py-4 px-4">
//                     <div>
//                       <p className="font-semibold text-gray-900">
//                         {course.title}
//                       </p>
//                       <div className="flex items-center gap-3 mt-1">
//                         <span className="text-xs text-gray-500 flex items-center gap-1">
//                           <FaClock className="w-3 h-3" />
//                           {course.duration}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           {course.category}
//                         </span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <p className="text-sm text-gray-700">{course.instructor}</p>
//                     <p className="text-xs text-gray-500">
//                       {course.lastUpdated}
//                     </p>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex items-center gap-1">
//                       <FaUsers className="text-gray-400 w-4 h-4" />
//                       <span className="font-medium text-gray-700">
//                         {course.students}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex items-center gap-1">
//                       <FaStar className="text-yellow-500 w-4 h-4" />
//                       <span className="font-medium text-gray-700">
//                         {course.rating}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                         course.status
//                       )}`}
//                     >
//                       {course.status.charAt(0).toUpperCase() +
//                         course.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span className="font-semibold text-gray-900">
//                       ${course.price}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex items-center gap-2">
//                       <button
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                         title="View"
//                       >
//                         <FaEye />
//                       </button>
//                       <button
//                         className="p-2 text-green-600 hover:bg-green-50 rounded transition"
//                         title="Edit"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(course.id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded transition"
//                         title="Delete"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredCourses.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500">
//               No courses found matching your criteria.
//             </p>
//           </div>
//         )}
//       </div>

//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-900">
//                 Add New Course
//               </h2>
//               <button
//                 onClick={() => setShowAddModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <FaTimesCircle className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Course Title
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Instructor
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Category
//                   </label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                     <option>Programming</option>
//                     <option>Design</option>
//                     <option>Marketing</option>
//                     <option>Business</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Price ($)
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Duration
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g. 10 hours"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   rows="4"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 ></textarea>
//               </div>

//               <div className="flex gap-3 justify-end pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Create Course
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageCourses;

import React from "react";

const ManageCourses = () => {
  return <div>ManageCourses</div>;
};

export default ManageCourses;
