// import React, { useState } from "react";
// import {
//   FaSearch,
//   FaFilter,
//   FaStar,
//   FaDollarSign,
//   FaClock,
//   FaUsers,
//   FaArrowRight,
//   FaShoppingCart,
//   FaBookOpen,
//   FaCode,
//   FaPalette,
//   FaBullhorn,
//   FaChartLine,
//   FaGraduationCap,
//   FaPlay,
//   FaCheckCircle,
// } from "react-icons/fa";

// const Courses = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedLevel, setSelectedLevel] = useState("all");
//   const [priceRange, setPriceRange] = useState("all");
//   const [sortBy, setSortBy] = useState("newest");

//   const colorClasses = {
//     purple: "bg-gradient-to-br from-purple-500 to-purple-600",
//     blue: "bg-gradient-to-br from-blue-500 to-blue-600",
//     green: "bg-gradient-to-br from-green-500 to-green-600",
//     red: "bg-gradient-to-br from-red-500 to-red-600",
//     yellow: "bg-gradient-to-br from-yellow-500 to-yellow-600",
//     indigo: "bg-gradient-to-br from-indigo-500 to-indigo-600",
//     teal: "bg-gradient-to-br from-teal-500 to-teal-600",
//     pink: "bg-gradient-to-br from-pink-500 to-pink-600",
//   };

//   const iconMap = {
//     FaCode: FaCode,
//     FaPalette: FaPalette,
//     FaBullhorn: FaBullhorn,
//     FaChartLine: FaChartLine,
//     FaGraduationCap: FaGraduationCap,
//     FaBookOpen: FaBookOpen,
//   };

//   const categories = [
//     { name: "All", value: "all", icon: FaBookOpen },
//     { name: "Programming", value: "Programming", icon: FaCode },
//     { name: "Design", value: "Design", icon: FaPalette },
//     { name: "Marketing", value: "Marketing", icon: FaBullhorn },
//     { name: "Data Science", value: "Data Science", icon: FaChartLine },
//     { name: "Business", value: "Business", icon: FaGraduationCap },
//   ];

//   const [courses, setCourses] = useState([
//     {
//       id: 1,
//       title: "Advanced JavaScript Mastery",
//       description:
//         "Master advanced JavaScript concepts including async programming, closures, and modern ES6+ features.",
//       category: "Programming",
//       level: "Advanced",
//       price: 49.99,
//       instructor: "John Smith",
//       instructorId: "john-smith",
//       thumbnail: null,
//       defaultCardColor: "blue",
//       rating: 4.8,
//       totalRatings: 324,
//       enrolledStudents: 2145,
//       totalLessons: 48,
//       duration: "12 hours",
//       learningOutcomes: [
//         "Master async/await patterns",
//         "Understand closures and scope",
//         "Build production-ready applications",
//       ],
//       isBestseller: true,
//       isNew: false,
//     },
//     {
//       id: 2,
//       title: "React Fundamentals 2024",
//       description:
//         "Learn React from scratch with hooks, state management, and modern best practices for building web applications.",
//       category: "Programming",
//       level: "Beginner",
//       price: 39.99,
//       instructor: "Sarah Johnson",
//       instructorId: "sarah-johnson",
//       thumbnail: null,
//       defaultCardColor: "purple",
//       rating: 4.7,
//       totalRatings: 289,
//       enrolledStudents: 3421,
//       totalLessons: 35,
//       duration: "10 hours",
//       learningOutcomes: [
//         "Build interactive UIs with React",
//         "Master React Hooks",
//         "Manage application state effectively",
//       ],
//       isBestseller: true,
//       isNew: true,
//     },
//     {
//       id: 3,
//       title: "UI/UX Design Masterclass",
//       description:
//         "Complete guide to UI/UX design principles, tools, and practical project workflows for professional designers.",
//       category: "Design",
//       level: "Intermediate",
//       price: 59.99,
//       instructor: "Mike Davis",
//       instructorId: "mike-davis",
//       thumbnail: null,
//       defaultCardColor: "pink",
//       rating: 4.9,
//       totalRatings: 256,
//       enrolledStudents: 1876,
//       totalLessons: 52,
//       duration: "15 hours",
//       learningOutcomes: [
//         "Master design principles",
//         "Create user research studies",
//         "Build design systems",
//       ],
//       isBestseller: false,
//       isNew: false,
//     },
//     {
//       id: 4,
//       title: "Python for Data Science",
//       description:
//         "Learn Python programming focused on data analysis, visualization, and machine learning fundamentals.",
//       category: "Data Science",
//       level: "Beginner",
//       price: 44.99,
//       instructor: "Emma Wilson",
//       instructorId: "emma-wilson",
//       thumbnail: null,
//       defaultCardColor: "green",
//       rating: 4.6,
//       totalRatings: 198,
//       enrolledStudents: 1523,
//       totalLessons: 42,
//       duration: "11 hours",
//       learningOutcomes: [
//         "Write efficient Python code",
//         "Analyze data with Pandas and NumPy",
//         "Create data visualizations",
//       ],
//       isBestseller: false,
//       isNew: true,
//     },
//     {
//       id: 5,
//       title: "Digital Marketing Strategy",
//       description:
//         "Complete digital marketing course covering SEO, social media, email marketing, and analytics.",
//       category: "Marketing",
//       level: "Intermediate",
//       price: 34.99,
//       instructor: "Tom Brown",
//       instructorId: "tom-brown",
//       thumbnail: null,
//       defaultCardColor: "red",
//       rating: 4.5,
//       totalRatings: 145,
//       enrolledStudents: 987,
//       totalLessons: 28,
//       duration: "8 hours",
//       learningOutcomes: [
//         "Master SEO optimization",
//         "Create effective social media campaigns",
//         "Analyze marketing metrics",
//       ],
//       isBestseller: false,
//       isNew: false,
//     },
//     {
//       id: 6,
//       title: "Business Development & Growth",
//       description:
//         "Learn strategies to grow your business, develop business plans, and scale your ventures effectively.",
//       category: "Business",
//       level: "Intermediate",
//       price: 54.99,
//       instructor: "Lisa Anderson",
//       instructorId: "lisa-anderson",
//       thumbnail: null,
//       defaultCardColor: "indigo",
//       rating: 4.7,
//       totalRatings: 176,
//       enrolledStudents: 1234,
//       totalLessons: 38,
//       duration: "10 hours",
//       learningOutcomes: [
//         "Develop business strategies",
//         "Create growth plans",
//         "Analyze market opportunities",
//       ],
//       isBestseller: true,
//       isNew: false,
//     },
//     {
//       id: 7,
//       title: "Web Development Bootcamp",
//       description:
//         "Comprehensive web development course covering HTML, CSS, JavaScript, and full-stack development.",
//       category: "Programming",
//       level: "Beginner",
//       price: 79.99,
//       instructor: "Alex Turner",
//       instructorId: "alex-turner",
//       thumbnail: null,
//       defaultCardColor: "teal",
//       rating: 4.8,
//       totalRatings: 412,
//       enrolledStudents: 4567,
//       totalLessons: 65,
//       duration: "18 hours",
//       learningOutcomes: [
//         "Build responsive websites",
//         "Understand backend technologies",
//         "Deploy applications to production",
//       ],
//       isBestseller: true,
//       isNew: false,
//     },
//     {
//       id: 8,
//       title: "Graphic Design Essentials",
//       description:
//         "Learn graphic design fundamentals including typography, color theory, and design tools.",
//       category: "Design",
//       level: "Beginner",
//       price: 44.99,
//       instructor: "Rachel Green",
//       instructorId: "rachel-green",
//       thumbnail: null,
//       defaultCardColor: "yellow",
//       rating: 4.4,
//       totalRatings: 89,
//       enrolledStudents: 567,
//       totalLessons: 24,
//       duration: "6 hours",
//       learningOutcomes: [
//         "Master design principles",
//         "Use design tools professionally",
//         "Create stunning graphics",
//       ],
//       isBestseller: false,
//       isNew: true,
//     },
//   ]);

//   // Filter and sort courses
//   let filteredCourses = courses.filter((course) => {
//     const matchesSearch =
//       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       course.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "all" || course.category === selectedCategory;
//     const matchesLevel =
//       selectedLevel === "all" || course.level === selectedLevel;

//     let matchesPrice = true;
//     if (priceRange === "free") matchesPrice = course.price === 0;
//     else if (priceRange === "paid-low")
//       matchesPrice = course.price > 0 && course.price <= 50;
//     else if (priceRange === "paid-mid")
//       matchesPrice = course.price > 50 && course.price <= 100;
//     else if (priceRange === "paid-high") matchesPrice = course.price > 100;

//     return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
//   });

//   // Sort courses
//   if (sortBy === "newest") {
//     filteredCourses.sort((a, b) => b.id - a.id);
//   } else if (sortBy === "popular") {
//     filteredCourses.sort((a, b) => b.enrolledStudents - a.enrolledStudents);
//   } else if (sortBy === "rating") {
//     filteredCourses.sort((a, b) => b.rating - a.rating);
//   } else if (sortBy === "price-low") {
//     filteredCourses.sort((a, b) => a.price - b.price);
//   } else if (sortBy === "price-high") {
//     filteredCourses.sort((a, b) => b.price - a.price);
//   }

//   const bestsellerCourses = filteredCourses
//     .filter((c) => c.isBestseller)
//     .slice(0, 4);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mb-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <h1 className="text-4xl font-bold mb-4">Explore Courses</h1>
//           <p className="text-blue-100 text-lg">
//             Learn new skills from industry experts
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4">
//         {/* Search Section */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-4 mb-6">
//             <div className="flex-1 relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search courses..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="newest">Newest</option>
//               <option value="popular">Most Popular</option>
//               <option value="rating">Highest Rated</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//             </select>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-col gap-4">
//             {/* Category Filter */}
//             <div>
//               <p className="text-sm font-semibold text-gray-700 mb-3">
//                 Category
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {categories.map((category) => {
//                   const Icon = category.icon;
//                   return (
//                     <button
//                       key={category.value}
//                       onClick={() => setSelectedCategory(category.value)}
//                       className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 transition ${
//                         selectedCategory === category.value
//                           ? "bg-blue-600 text-white"
//                           : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                       }`}
//                     >
//                       <Icon className="w-4 h-4" />
//                       {category.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Level and Price Filters */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm font-semibold text-gray-700 mb-3">
//                   Level
//                 </p>
//                 <div className="flex gap-2">
//                   {["all", "Beginner", "Intermediate", "Advanced"].map(
//                     (level) => (
//                       <button
//                         key={level}
//                         onClick={() => setSelectedLevel(level)}
//                         className={`px-3 py-1 rounded text-sm transition ${
//                           selectedLevel === level
//                             ? "bg-blue-600 text-white"
//                             : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                         }`}
//                       >
//                         {level === "all" ? "All Levels" : level}
//                       </button>
//                     )
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <p className="text-sm font-semibold text-gray-700 mb-3">
//                   Price
//                 </p>
//                 <select
//                   value={priceRange}
//                   onChange={(e) => setPriceRange(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="all">All Prices</option>
//                   <option value="free">Free</option>
//                   <option value="paid-low">$1 - $50</option>
//                   <option value="paid-mid">$50 - $100</option>
//                   <option value="paid-high">$100+</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bestseller Section */}
//         {bestsellerCourses.length > 0 && (
//           <div className="mb-12">
//             <div className="flex items-center gap-2 mb-6">
//               <FaCheckCircle className="text-green-600 w-6 h-6" />
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Bestseller Courses
//               </h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {bestsellerCourses.map((course) => {
//                 const IconComponent =
//                   iconMap[course.defaultCardColor] || FaBookOpen;
//                 return (
//                   <div
//                     key={course.id}
//                     className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group h-full flex flex-col"
//                   >
//                     <div
//                       className={`h-40 ${
//                         colorClasses[course.defaultCardColor]
//                       } flex items-center justify-center relative overflow-hidden`}
//                     >
//                       <FaBookOpen className="w-20 h-20 text-white opacity-80 group-hover:scale-110 transition" />
//                       <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
//                         Bestseller
//                       </div>
//                       {course.isNew && (
//                         <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
//                           NEW
//                         </div>
//                       )}
//                     </div>

//                     <div className="p-4 flex-1 flex flex-col">
//                       <div className="mb-2">
//                         <span className="text-xs font-semibold text-blue-600 uppercase">
//                           {course.category}
//                         </span>
//                         <span className="text-xs font-semibold text-gray-500 ml-2 bg-gray-100 px-2 py-0.5 rounded">
//                           {course.level}
//                         </span>
//                       </div>

//                       <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
//                         {course.title}
//                       </h3>

//                       <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                         {course.description}
//                       </p>

//                       <div className="flex items-center justify-between mb-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <FaStar className="text-yellow-500 w-4 h-4" />
//                           <span className="font-medium">{course.rating}</span>
//                           <span className="text-gray-500">
//                             ({course.totalRatings})
//                           </span>
//                         </div>
//                         <span className="text-gray-500">
//                           {course.enrolledStudents.toLocaleString()}
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
//                         <span className="flex items-center gap-1">
//                           <FaClock className="w-3 h-3" />
//                           {course.duration}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <FaPlay className="w-3 h-3" />
//                           {course.totalLessons} lessons
//                         </span>
//                       </div>

//                       <div className="border-t pt-3 mt-auto">
//                         <div className="flex items-center justify-between mb-3">
//                           <span className="text-xl font-bold text-gray-900">
//                             ${course.price}
//                           </span>
//                           <span className="text-sm text-gray-500">
//                             by {course.instructor}
//                           </span>
//                         </div>
//                         <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm font-medium">
//                           <FaShoppingCart className="w-4 h-4" />
//                           Enroll Now
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* All Courses Grid */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             All Courses
//             <span className="text-gray-500 text-lg ml-3">
//               ({filteredCourses.length})
//             </span>
//           </h2>

//           {filteredCourses.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredCourses.map((course) => (
//                 <div
//                   key={course.id}
//                   className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden group h-full flex flex-col"
//                 >
//                   <div
//                     className={`h-32 ${
//                       colorClasses[course.defaultCardColor]
//                     } flex items-center justify-center relative`}
//                   >
//                     <FaBookOpen className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition" />
//                     {course.isNew && (
//                       <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-0.5 rounded text-xs font-bold">
//                         NEW
//                       </div>
//                     )}
//                   </div>

//                   <div className="p-4 flex-1 flex flex-col">
//                     <div className="mb-2">
//                       <span className="text-xs font-semibold text-blue-600 uppercase">
//                         {course.category}
//                       </span>
//                       <span className="text-xs font-semibold text-gray-500 ml-2 bg-gray-100 px-2 py-0.5 rounded">
//                         {course.level}
//                       </span>
//                     </div>

//                     <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
//                       {course.title}
//                     </h3>

//                     <div className="flex items-center justify-between mb-2 text-sm">
//                       <div className="flex items-center gap-1">
//                         <FaStar className="text-yellow-500 w-3 h-3" />
//                         <span className="font-medium">{course.rating}</span>
//                         <span className="text-gray-500 text-xs">
//                           ({course.totalRatings})
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
//                       <span className="flex items-center gap-1">
//                         <FaClock className="w-3 h-3" />
//                         {course.duration}
//                       </span>
//                       <span>•</span>
//                       <span>{course.totalLessons} lessons</span>
//                     </div>

//                     <div className="border-t pt-3 mt-auto">
//                       <div className="flex items-center justify-between mb-3">
//                         <span className="text-lg font-bold text-gray-900">
//                           ${course.price}
//                         </span>
//                       </div>
//                       <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm font-medium">
//                         Enroll
//                         <FaArrowRight className="w-3 h-3" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16 bg-white rounded-lg">
//               <FaFilter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500 text-lg">
//                 No courses found matching your criteria.
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Try adjusting your filters or search terms.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

import React from "react";

const Courses = () => {
  return (
    <div>
      <h1>COURSES PAGE</h1>
    </div>
  );
};

export default Courses;
