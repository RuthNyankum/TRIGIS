import React, { useState } from "react";
import {
  FaBookOpen,
  FaPlay,
  FaClock,
  FaAward,
  FaCheckCircle,
  FaStar,
  FaInfinity,
} from "react-icons/fa";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courseCategories = [
    { id: "all", label: "All Courses", count: 8 },
    { id: "writing", label: "Content Writing", count: 3 },
    { id: "marketing", label: "Digital Marketing", count: 2 },
    { id: "strategy", label: "Strategy", count: 2 },
    { id: "business", label: "Business Growth", count: 1 },
  ];

  const courses = [
    {
      id: 1,
      category: "writing",
      title: "Complete Content Writing Mastery",
      subtitle: "From beginner to professional writer",
      description:
        "Master the art of persuasive content writing with our comprehensive course covering everything from fundamentals to advanced techniques.",
      instructor: "Sarah Mensah",
      instructorTitle: "Senior Content Strategist",
      rating: 4.9,
      students: 1247,
      duration: "12 hours",
      lessons: 42,
      level: "Beginner to Advanced",
      price: "GH₵450",
      originalPrice: "GH₵600",
      image: "/api/placeholder/400/250",
      features: [
        "Writing fundamentals and techniques",
        "SEO content optimization",
        "Copywriting psychology",
        "Brand voice development",
        "Content planning strategies",
        "Portfolio building guide",
      ],
      highlights: [
        "42+ video lessons",
        "Downloadable templates",
        "Live Q&A sessions",
        "Certificate of completion",
        "Lifetime access",
        "30-day money back guarantee",
      ],
      color: "purple",
      bgGradient: "from-purple-500 to-purple-700",
    },
    {
      id: 2,
      category: "marketing",
      title: "Digital Marketing Strategy Bootcamp",
      subtitle: "Build winning marketing campaigns",
      description:
        "Learn to create data-driven digital marketing strategies that generate leads, increase conversions, and grow businesses.",
      instructor: "Michael Asante",
      instructorTitle: "Digital Marketing Expert",
      rating: 4.8,
      students: 892,
      duration: "16 hours",
      lessons: 38,
      level: "Intermediate",
      price: "GH₵650",
      originalPrice: "GH₵850",
      image: "/api/placeholder/400/250",
      features: [
        "Marketing funnel design",
        "Social media strategy",
        "Email marketing campaigns",
        "Analytics and tracking",
        "Content distribution",
        "ROI optimization",
      ],
      highlights: [
        "38+ comprehensive modules",
        "Real campaign case studies",
        "Marketing toolkit included",
        "Expert feedback sessions",
        "Industry certification",
        "Job placement assistance",
      ],
      color: "blue",
      bgGradient: "from-blue-500 to-blue-700",
    },
    {
      id: 3,
      category: "writing",
      title: "Copywriting That Converts",
      subtitle: "Write copy that sells",
      description:
        "Master the psychology of persuasive copywriting and learn to write sales pages, emails, and ads that convert prospects into customers.",
      instructor: "Akosua Darko",
      instructorTitle: "Conversion Copywriter",
      rating: 4.9,
      students: 634,
      duration: "8 hours",
      lessons: 24,
      level: "Beginner to Intermediate",
      price: "GH₵380",
      originalPrice: "GH₵500",
      image: "/api/placeholder/400/250",
      features: [
        "Conversion psychology principles",
        "Sales page structure",
        "Email sequence writing",
        "Ad copy creation",
        "A/B testing strategies",
        "Client acquisition methods",
      ],
      highlights: [
        "24+ actionable lessons",
        "Copy templates library",
        "Live copy critiques",
        "Client project examples",
        "Freelancer resources",
        "Community access",
      ],
      color: "red",
      bgGradient: "from-red-500 to-pink-500",
    },
    {
      id: 4,
      category: "strategy",
      title: "Brand Storytelling Workshop",
      subtitle: "Craft compelling brand narratives",
      description:
        "Learn to develop powerful brand stories that resonate with your audience and differentiate your business in the marketplace.",
      instructor: "Kwame Nkrumah",
      instructorTitle: "Brand Strategy Consultant",
      rating: 4.7,
      students: 456,
      duration: "6 hours",
      lessons: 18,
      level: "All levels",
      price: "GH₵320",
      originalPrice: "GH₵420",
      image: "/api/placeholder/400/250",
      features: [
        "Story structure frameworks",
        "Brand archetype identification",
        "Audience persona development",
        "Narrative consistency",
        "Emotional connection strategies",
        "Story implementation tactics",
      ],
      highlights: [
        "18+ storytelling modules",
        "Brand story templates",
        "Workshop recordings",
        "Peer feedback sessions",
        "Brand audit checklist",
        "Follow-up mentoring",
      ],
      color: "green",
      bgGradient: "from-green-500 to-green-700",
    },
    {
      id: 5,
      category: "marketing",
      title: "Social Media Content Mastery",
      subtitle: "Create content that engages",
      description:
        "Master the art of creating engaging social media content that builds communities, drives engagement, and converts followers into customers.",
      instructor: "Ama Boateng",
      instructorTitle: "Social Media Strategist",
      rating: 4.8,
      students: 789,
      duration: "10 hours",
      lessons: 32,
      level: "Beginner to Advanced",
      price: "GH₵420",
      originalPrice: "GH₵550",
      image: "/api/placeholder/400/250",
      features: [
        "Platform-specific strategies",
        "Content calendar planning",
        "Visual content creation",
        "Community management",
        "Influencer collaboration",
        "Performance analytics",
      ],
      highlights: [
        "32+ platform tutorials",
        "Content templates pack",
        "Live strategy sessions",
        "Algorithm insights",
        "Growth hacking techniques",
        "Tool recommendations",
      ],
      color: "yellow",
      bgGradient: "from-yellow-500 to-orange-500",
    },
    {
      id: 6,
      category: "writing",
      title: "SEO Content Writing Pro",
      subtitle: "Write content that ranks",
      description:
        "Learn to create content that both readers and search engines love. Master SEO writing techniques that drive organic traffic.",
      instructor: "Prince Adjei",
      instructorTitle: "SEO Content Specialist",
      rating: 4.9,
      students: 523,
      duration: "9 hours",
      lessons: 28,
      level: "Intermediate",
      price: "GH₵480",
      originalPrice: "GH₵620",
      image: "/api/placeholder/400/250",
      features: [
        "Keyword research mastery",
        "On-page optimization",
        "Content structure for SEO",
        "Technical SEO basics",
        "Link building strategies",
        "Performance tracking",
      ],
      highlights: [
        "28+ SEO tutorials",
        "Keyword research tools",
        "SEO audit templates",
        "Google Analytics setup",
        "Ranking case studies",
        "SEO tool discounts",
      ],
      color: "indigo",
      bgGradient: "from-indigo-500 to-purple-600",
    },
    {
      id: 7,
      category: "strategy",
      title: "Content Strategy Blueprint",
      subtitle: "Build winning content strategies",
      description:
        "Develop comprehensive content strategies that align with business goals, engage audiences, and drive measurable results.",
      instructor: "Efua Mensah",
      instructorTitle: "Content Strategy Director",
      rating: 4.8,
      students: 367,
      duration: "14 hours",
      lessons: 35,
      level: "Advanced",
      price: "GH₵580",
      originalPrice: "GH₵750",
      image: "/api/placeholder/400/250",
      features: [
        "Strategic planning frameworks",
        "Content audit methodologies",
        "Editorial calendar creation",
        "Team management strategies",
        "Budget planning and allocation",
        "ROI measurement techniques",
      ],
      highlights: [
        "35+ strategy modules",
        "Planning templates",
        "Case study analysis",
        "Expert interviews",
        "Strategy presentations",
        "Certification pathway",
      ],
      color: "teal",
      bgGradient: "from-teal-500 to-blue-600",
    },
    {
      id: 8,
      category: "business",
      title: "Freelance Writing Business",
      subtitle: "Build a profitable writing business",
      description:
        "Transform your writing skills into a thriving freelance business. Learn client acquisition, pricing, and business management.",
      instructor: "Samuel Osei",
      instructorTitle: "Freelance Business Coach",
      rating: 4.9,
      students: 445,
      duration: "11 hours",
      lessons: 30,
      level: "All levels",
      price: "GH₵520",
      originalPrice: "GH₵680",
      image: "/api/placeholder/400/250",
      features: [
        "Business setup and legal basics",
        "Client acquisition strategies",
        "Pricing and proposal writing",
        "Project management systems",
        "Financial management",
        "Scaling your business",
      ],
      highlights: [
        "30+ business modules",
        "Client contract templates",
        "Pricing calculator tool",
        "Business plan template",
        "Networking strategies",
        "Ongoing mentorship",
      ],
      color: "orange",
      bgGradient: "from-orange-500 to-red-500",
    },
  ];

  const filteredCourses =
    activeTab === "all"
      ? courses
      : courses.filter((course) => course.category === activeTab);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold font-playfair mb-6">
            Master Your <span className="gradient-text">Craft</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed mb-8">
            Transform your career with our comprehensive courses designed by
            industry experts. Learn content writing, digital marketing, and
            business skills that drive real results.
          </p>
        </div>

        {/* Course Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {courseCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`tab-button px-6 py-3 rounded-full font-semibold font-inter ${
                  activeTab === category.id
                    ? "active"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="course-card bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Course Image */}
              <div className="relative">
                <div
                  className={`h-48 bg-gradient-to-r ${course.bgGradient} flex items-center justify-center`}
                >
                  <FaBookOpen size={48} className="text-white opacity-50" />
                </div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                  {course.level}
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <FaPlay className="mr-1" size={10} />
                  {course.lessons} lessons
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-1" size={12} />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" size={14} />
                    <span className="text-sm font-semibold text-gray-700">
                      {course.rating} ({course.students})
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-playfair mb-2 text-gray-900">
                  {course.title}
                </h3>
                <p className="text-purple-600 font-semibold font-inter mb-3 text-sm">
                  {course.subtitle}
                </p>
                <p className="text-gray-600 font-inter text-sm mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">
                      {course.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 font-inter">
                      {course.instructor}
                    </div>
                    <div className="text-xs text-gray-600 font-inter">
                      {course.instructorTitle}
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <ul className="space-y-1 mb-6">
                  {course.features.slice(0, 3).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-xs text-gray-600 font-inter"
                    >
                      <FaCheckCircle
                        className="text-green-500 mr-2"
                        size={10}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900 font-inter">
                      {course.price}
                    </span>
                    <span className="text-gray-500 line-through ml-2 font-inter">
                      {course.originalPrice}
                    </span>
                  </div>
                  <div className="text-sm text-green-600 font-semibold font-inter">
                    Save{" "}
                    {Math.round(
                      (1 -
                        parseInt(course.price.replace(/[^\d]/g, "")) /
                          parseInt(
                            course.originalPrice.replace(/[^\d]/g, "")
                          )) *
                        100
                    )}
                    %
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2">
                  <button
                    className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white py-3 rounded-xl font-semibold font-inter hover:shadow-lg transition-all duration-300"
                    onClick={() => setSelectedCourse(course)}
                  >
                    Enroll Now
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-xl font-medium font-inter hover:bg-gray-50 transition-colors duration-300 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-90vh overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold font-playfair mb-2">
                      {selectedCourse.title}
                    </h2>
                    <p className="text-purple-600 font-semibold font-inter">
                      {selectedCourse.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold font-playfair mb-4">
                      What You'll Learn:
                    </h3>
                    <ul className="space-y-3 mb-6">
                      {selectedCourse.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <FaCheckCircle
                            className="text-green-500 mr-3 mt-1"
                            size={16}
                          />
                          <span className="text-gray-700 font-inter">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-xl font-semibold font-playfair mb-4">
                      Course Highlights:
                    </h3>
                    <ul className="space-y-3">
                      {selectedCourse.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center">
                          <FaAward className="text-yellow-500 mr-3" size={16} />
                          <span className="text-gray-700 font-inter">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-gray-900 font-inter mb-2">
                        {selectedCourse.price}
                      </div>
                      <div className="text-gray-500 line-through font-inter">
                        {selectedCourse.originalPrice}
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-inter">
                          Duration:
                        </span>
                        <span className="font-semibold font-inter">
                          {selectedCourse.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-inter">
                          Lessons:
                        </span>
                        <span className="font-semibold font-inter">
                          {selectedCourse.lessons}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-inter">Level:</span>
                        <span className="font-semibold font-inter">
                          {selectedCourse.level}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-inter">
                          Students:
                        </span>
                        <span className="font-semibold font-inter">
                          {selectedCourse.students}+
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-inter">
                          Access:
                        </span>
                        <span className="font-semibold font-inter flex items-center">
                          <FaInfinity className="mr-1" size={14} />
                          Lifetime
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white py-4 rounded-xl font-bold font-inter text-lg mb-3 hover:shadow-lg transition-all duration-300">
                      Enroll Now - {selectedCourse.price}
                    </button>
                    <p className="text-center text-sm text-gray-600 font-inter">
                      30-day money-back guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
