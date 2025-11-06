import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaClock,
  FaShoppingCart,
  FaBookOpen,
  FaCode,
  FaPalette,
  FaBullhorn,
  FaChartLine,
  FaGraduationCap,
  FaPlay,
  FaCheckCircle,
  FaArrowRight,
  FaSpinner,
  FaVideo,
  FaFileAlt,
  FaCertificate,
  FaInfinity,
  FaMobile,
} from "react-icons/fa";
import api from "../../config/axios";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../utils/formatCurrency";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  const colorClasses = {
    purple: "bg-gradient-to-br from-purple-500 to-purple-600",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600",
    green: "bg-gradient-to-br from-green-500 to-green-600",
    red: "bg-gradient-to-br from-red-500 to-red-600",
    yellow: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    indigo: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    teal: "bg-gradient-to-br from-teal-500 to-teal-600",
    pink: "bg-gradient-to-br from-pink-500 to-pink-600",
  };

  const categories = [
    { name: "All", value: "all", icon: FaBookOpen },
    { name: "Programming", value: "Programming", icon: FaCode },
    { name: "Design", value: "Design", icon: FaPalette },
    { name: "Marketing", value: "Marketing", icon: FaBullhorn },
    { name: "Data Science", value: "Data Science", icon: FaChartLine },
    { name: "Business", value: "Business", icon: FaGraduationCap },
  ];

  const fetchCourses = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 20,
        search: searchTerm || undefined,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        level: selectedLevel !== "all" ? selectedLevel : undefined,
        priceRange: priceRange !== "all" ? priceRange : undefined,
        sortBy,
      };

      const response = await api.get("/courses/public", { params });
      setCourses(response.data.data);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchCourses();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm, selectedCategory, selectedLevel, priceRange, sortBy]);

  const handleEnroll = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const bestsellerCourses = Array.isArray(courses)
    ? courses.filter((c) => c.isBestseller).slice(0, 4)
    : [];

  const formatDuration = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Explore Courses</h1>
          <p className="text-blue-100 text-lg">
            Learn new skills from industry experts
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Search + Sort */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6 justify-center">
            {/* Search Input */}
            <div className="flex-1 relative max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-transparent rounded-lg font-medium
          focus:outline-none focus:ring-2 focus:ring-[#7E1394] transition"
                style={{
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(to right, #7E1394, #CCD431)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              />
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-transparent rounded-lg bg-white text-[#7E1394] font-medium 
          focus:outline-none focus:ring-2 focus:ring-[#7E1394] transition cursor-pointer 
          hover:border-[#7E1394]"
                style={{
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(to right, #7E1394, #CCD431)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 items-center">
            {/* Category Filter */}
            <div className="w-full">
              <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
                Category
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 transition ${
                        selectedCategory === category.value
                          ? "bg-gradient-to-r from-[#7E1394] to-[#CCD431] text-white shadow-md"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level and Price Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Level Filter */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
                  Level
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["all", "Beginner", "Intermediate", "Advanced"].map(
                    (level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-3 py-1 rounded text-sm transition ${
                          selectedLevel === level
                            ? "bg-gradient-to-r from-[#7E1394] to-[#CCD431] text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {level === "all" ? "All Levels" : level}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Price Filter Dropdown */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
                  Price
                </p>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-transparent rounded-lg bg-white text-[#7E1394] font-medium 
            focus:outline-none focus:ring-2 focus:ring-[#7E1394] transition cursor-pointer 
            hover:border-[#7E1394]"
                  style={{
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(to right, #7E1394, #CCD431)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="paid-low">$1 - $50</option>
                  <option value="paid-mid">$50 - $100</option>
                  <option value="paid-high">$100+</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <FaSpinner className="animate-spin text-5xl text-blue-600" />
          </div>
        ) : (
          <>
            {/* Bestseller Section */}
            {bestsellerCourses.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <FaCheckCircle className="text-green-600 w-6 h-6" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Bestseller Courses
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {bestsellerCourses.map((course) => (
                    <div
                      key={course._id}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group h-full flex flex-col"
                    >
                      <div
                        className={`h-40 ${
                          colorClasses[course.defaultCardColor]
                        } flex items-center justify-center relative overflow-hidden`}
                      >
                        <FaBookOpen className="w-20 h-20 text-white opacity-80 group-hover:scale-110 transition" />
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                          Bestseller
                        </div>
                        {course.isNew && (
                          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                            NEW
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <div className="mb-2">
                          <span className="text-xs font-semibold text-blue-600 uppercase">
                            {course.category}
                          </span>
                          <span className="text-xs font-semibold text-gray-500 ml-2 bg-gray-100 px-2 py-0.5 rounded">
                            {course.level}
                          </span>
                        </div>

                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                          {course.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-500 w-4 h-4" />
                            <span className="font-medium">
                              {course.rating || 0}
                            </span>
                            <span className="text-gray-500">
                              ({course.totalRatings || 0})
                            </span>
                          </div>
                          <span className="text-gray-500">
                            {course.enrolledStudents?.toLocaleString() || 0}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <FaClock className="w-3 h-3" />
                            {formatDuration(course.totalDuration)}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaPlay className="w-3 h-3" />
                            {course.totalLessons || 0} lessons
                          </span>
                        </div>

                        {/* Course Features */}
                        {course.features && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {course.features.hasCertificate && (
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded flex items-center gap-1">
                                <FaCertificate className="w-3 h-3" />
                                Certificate
                              </span>
                            )}
                            {course.features.lifetimeAccess && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded flex items-center gap-1">
                                <FaInfinity className="w-3 h-3" />
                                Lifetime
                              </span>
                            )}
                            {course.features.mobileAccess && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1">
                                <FaMobile className="w-3 h-3" />
                                Mobile
                              </span>
                            )}
                          </div>
                        )}

                        <div className="border-t pt-3 mt-auto">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xl font-bold text-gray-900">
                              {formatCurrency(course.price)}
                            </span>
                            <span className="text-sm text-gray-500">
                              by {course.instructorName}
                            </span>
                          </div>
                          <button
                            onClick={() => handleEnroll(course._id)}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm font-medium"
                          >
                            <FaShoppingCart className="w-4 h-4" />
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Courses Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                All Courses
                <span className="text-gray-500 text-lg ml-3">
                  ({pagination.total})
                </span>
              </h2>

              {courses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {courses.map((course) => (
                      <div
                        key={course._id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden group h-full flex flex-col cursor-pointer"
                        onClick={() => handleEnroll(course._id)}
                      >
                        <div
                          className={`h-32 ${
                            colorClasses[course.defaultCardColor]
                          } flex items-center justify-center relative`}
                        >
                          <FaBookOpen className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition" />
                          {course.isNew && (
                            <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-0.5 rounded text-xs font-bold">
                              NEW
                            </div>
                          )}
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                          <div className="mb-2">
                            <span className="text-xs font-semibold text-blue-600 uppercase">
                              {course.category}
                            </span>
                            <span className="text-xs font-semibold text-gray-500 ml-2 bg-gray-100 px-2 py-0.5 rounded">
                              {course.level}
                            </span>
                          </div>

                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                            {course.title}
                          </h3>

                          <div className="flex items-center justify-between mb-2 text-sm">
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-500 w-3 h-3" />
                              <span className="font-medium">
                                {course.rating || 0}
                              </span>
                              <span className="text-gray-500 text-xs">
                                ({course.totalRatings || 0})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <FaClock className="w-3 h-3" />
                              {formatDuration(course.totalDuration)}
                            </span>
                            <span>•</span>
                            <span>{course.totalLessons || 0} lessons</span>
                          </div>

                          <div className="border-t pt-3 mt-auto">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-lg font-bold text-gray-900">
                                {formatCurrency(course.price)}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEnroll(course._id);
                              }}
                              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm font-medium"
                            >
                              View Course
                              <FaArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => fetchCourses(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2">
                        Page {pagination.currentPage} of {pagination.totalPages}
                      </span>
                      <button
                        onClick={() => fetchCourses(pagination.currentPage + 1)}
                        disabled={
                          pagination.currentPage === pagination.totalPages
                        }
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg">
                  <FaFilter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    No courses found matching your criteria.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
