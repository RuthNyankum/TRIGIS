import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../pages/dashboard/shared/Sidebar";
import Topbar from "../pages/dashboard/shared/Topbar";

const DashboardLayout = ({ userRole = "admin" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        userRole={userRole}
      />

      {/* Main content wrapper */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          userRole={userRole}
        />

        {/* Main content area - USING OUTLET FOR NESTED ROUTES */}
        {/* <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main> */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
