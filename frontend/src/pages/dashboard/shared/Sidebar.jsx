import React from "react";
import {
  MdDashboard,
  MdMenuBook,
  MdPeople,
  MdAttachMoney,
  MdDescription,
  MdSettings,
  MdMenu,
  MdClose,
  MdLogout,
} from "react-icons/md";
import { Link, useLocation } from "react-router";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: MdDashboard,
      path: "/admin/dashboard",
    },
    {
      id: "courses",
      label: "Courses",
      icon: MdMenuBook,
      path: "/admin/courses",
    },
    {
      id: "students",
      label: "Students",
      icon: MdPeople,
      path: "/admin/students",
    },
    {
      id: "services",
      label: "Services",
      icon: MdDescription,
      path: "/admin/services",
    },
    {
      id: "revenue",
      label: "Revenue",
      icon: MdAttachMoney,
      path: "/admin/revenue",
    },
    {
      id: "settings",
      label: "Settings",
      icon: MdSettings,
      path: "/admin/settings",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-indigo-900 to-indigo-700 text-white transition-all duration-300 flex flex-col h-screen fixed left-0 top-0 z-50`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-indigo-600">
        {sidebarOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-indigo-600 rounded-lg transition-colors"
        >
          {sidebarOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isActive(item.path) ? "bg-indigo-600" : "hover:bg-indigo-600/50"
            }`}
          >
            <item.icon size={20} />
            {sidebarOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-indigo-600">
        <button className="w-full flex items-center gap-3 p-3 hover:bg-indigo-600 rounded-lg transition-colors">
          <MdLogout size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
