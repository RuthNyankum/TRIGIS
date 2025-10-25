// import React, { useState } from "react";
// import Sidebar from "../pages/dashboard/shared/Sidebar";
// import Topbar from "../pages/dashboard/shared/Topbar";

// const DashboardLayout = ({ children, userRole = "admin" }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         userRole={userRole}
//       />

//       {/* Main Content Area */}
//       <div
//         className={`flex-1 flex flex-col transition-all duration-300 ${
//           sidebarOpen ? "ml-64" : "ml-20"
//         }`}
//       >
//         {/* Topbar */}
//         <Topbar sidebarOpen={sidebarOpen} userRole={userRole} />

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-6">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// import React, { useState } from "react";
// import Sidebar from "../pages/dashboard/shared/Sidebar";
// import Topbar from "../pages/dashboard/shared/Topbar";

// const DashboardLayout = ({ children, userRole = "admin" }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false); // start closed on mobile

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         userRole={userRole}
//       />

//       {/* Main content */}
//       <div
//         className={`flex-1 flex flex-col transition-all duration-300
//     ${sidebarOpen ? "ml-64 lg:ml-64" : "ml-0 lg:ml-20"}
//   `}
//       >
//         <Topbar
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen} // pass this!
//           userRole={userRole}
//         />
//         <main className="flex-1 overflow-y-auto p-6">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../pages/dashboard/shared/Sidebar";
import Topbar from "../pages/dashboard/shared/Topbar";

const DashboardLayout = ({ userRole = "admin" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
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
        {/* Topbar */}
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          userRole={userRole}
        />

        {/* Main content area - USING OUTLET FOR NESTED ROUTES */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
