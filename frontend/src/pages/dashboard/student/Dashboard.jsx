// import React from "react";
// import DashboardLayout from "../../../layout/DashboardLayout";

// const StudentDashboard = () => {
//   // ✅ Get user from localStorage
//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   return (
//     <DashboardLayout
//       userRole={user.role || "student"}
//       userData={{
//         fullName: user.fullName || "Student",
//         email: user.email || "student@example.com",
//         initials: user.initials, // optional
//       }}
//     >
//       {/* Your dashboard content here */}
//       <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
//     </DashboardLayout>
//   );
// };

// export default StudentDashboard;

import React, { useState } from "react";
import {
  FaBookOpen,
  FaTrophy,
  FaClock,
  FaChartLine,
  FaPlay,
  FaCheckCircle,
} from "react-icons/fa";

import {
  studentStats,
  currentCoursesData,
  recentAchievementsData,
  upcomingDeadlinesData,
} from "../../../constants/dashboards";

const StudentDashboard = () => {
  const [stats] = useState(studentStats);
  const [currentCourses] = useState(currentCoursesData);
  const [recentAchievements] = useState(recentAchievementsData);
  const [upcomingDeadlines] = useState(upcomingDeadlinesData);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to your dashboard</h1>
      <p className="text-gray-600 mb-6">
        Continue your learning journey and track your progress.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Enrolled Courses</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.enrolledCourses}
              </p>
            </div>
            <FaBookOpen className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Completed</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.completedCourses}
              </p>
            </div>
            <FaCheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Achievements</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.achievements}
              </p>
            </div>
            <FaTrophy className="w-10 h-10 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Study Hours</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.studyHours}
              </p>
            </div>
            <FaClock className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Courses */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Continue Learning
            </h2>
            <FaChartLine className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Next: {course.nextLesson}
                    </p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                    <FaPlay className="w-4 h-4" />
                    Continue
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {course.progress}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {course.hours} hours completed
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Achievements */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaTrophy className="w-5 h-5 text-purple-500" />
              Recent Achievements
            </h2>
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="border-l-4 border-purple-500 pl-3 py-2"
                >
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {achievement.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaClock className="w-5 h-5 text-orange-500" />
              Upcoming Deadlines
            </h2>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className={`p-3 rounded-lg ${
                    deadline.urgent
                      ? "bg-red-50 border border-red-200"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {deadline.task}
                      </p>
                      <p className="text-xs text-gray-600">{deadline.course}</p>
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        deadline.urgent ? "text-red-600" : "text-gray-600"
                      }`}
                    >
                      {deadline.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
