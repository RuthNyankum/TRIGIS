// import React from "react";
// import DashboardLayout from "../../../layout/DashboardLayout";

// const AdminDashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   return (
//     <DashboardLayout
//       userRole={user.role || "admin"}
//       userData={{
//         fullName: user.fullName || "Admin User",
//         email: user.email || "admin@example.com",
//         initials: user.initials, // optional
//       }}
//     >
//       {/* Admin dashboard content */}
//       <h1 className="text-2xl font-bold">Admin Overview</h1>
//       <p>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore unde
//         nisi animi quaerat. Eveniet ipsam accusamus delectus temporibus
//         excepturi soluta. Magni, laborum ducimus expedita commodi corporis
//         suscipit iusto necessitatibus veniam?
//       </p>
//     </DashboardLayout>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import {
  FaUsers,
  FaBookOpen,
  FaDollarSign,
  FaChartLine,
  FaExclamationCircle,
  FaChartBar,
} from "react-icons/fa";

import {
  statsData,
  recentActivityData,
  topCoursesData,
  alertsData,
  monthlyDataChart,
} from "../../../constants/dashboards";

const AdminDashboard = () => {
  const [stats] = useState(statsData);
  const [recentActivity] = useState(recentActivityData);
  const [topCourses] = useState(topCoursesData);
  const [alerts] = useState(alertsData);
  const [monthlyData] = useState(monthlyDataChart);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Overview</h1>

      {/* Alerts */}
      {/* {alerts.length > 0 && (
        <div className="mb-6 space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-4 rounded-lg ${
                alert.priority === "high"
                  ? "bg-red-50 border border-red-200"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <FaExclamationCircle
                className={`w-5 h-5 ${
                  alert.priority === "high" ? "text-red-600" : "text-blue-600"
                }`}
              />
              <p
                className={`flex-1 text-sm ${
                  alert.priority === "high" ? "text-red-800" : "text-blue-800"
                }`}
              >
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      )} */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalStudents.toLocaleString()}
              </p>
            </div>
            <FaUsers className="w-10 h-10 text-blue-500" />
          </div>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <FaChartLine className="w-4 h-4" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-500 text-sm mb-1">Active Courses</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.activeCourses}
              </p>
            </div>
            <FaBookOpen className="w-10 h-10 text-purple-500" />
          </div>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <FaChartLine className="w-4 h-4" />
            <span>+3 new this month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-500 text-sm mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                ${stats.revenue.toLocaleString()}
              </p>
            </div>
            <FaDollarSign className="w-10 h-10 text-green-500" />
          </div>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <FaChartLine className="w-4 h-4" />
            <span>+18% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Enrollments</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.enrollments.toLocaleString()}
              </p>
            </div>
            <FaChartBar className="w-10 h-10 text-orange-500" />
          </div>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <FaChartLine className="w-4 h-4" />
            <span>+25% from last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Courses */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Top Performing Courses
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Course
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Students
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {topCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">
                        {course.title}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{course.students}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-green-600 font-medium">
                        ${course.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium text-gray-700">
                          {course.rating}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === "enrollment"
                      ? "bg-blue-500"
                      : activity.type === "course"
                      ? "bg-purple-500"
                      : activity.type === "student"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Growth</h2>
        <div className="grid grid-cols-4 gap-4">
          {monthlyData.map((data) => (
            <div key={data.month} className="text-center">
              <div className="mb-2">
                <div
                  className="bg-blue-100 rounded-t-lg mx-auto"
                  style={{
                    width: "60px",
                    height: `${(data.students / 320) * 100}px`,
                    minHeight: "40px",
                  }}
                />
              </div>
              <p className="text-sm font-semibold text-gray-700">
                {data.month}
              </p>
              <p className="text-xs text-gray-500">{data.students} students</p>
              <p className="text-xs text-green-600">
                ${data.revenue.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
