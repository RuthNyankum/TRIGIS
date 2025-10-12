import React, { useState, useEffect, useRef } from "react";
import {
  MdNotifications,
  MdSearch,
  MdExpandMore,
  MdPerson,
  MdSettings,
  MdLogout,
} from "react-icons/md";

const Topbar = ({ sidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      message: "New student enrolled in Creative Writing",
      time: "5 mins ago",
      unread: true,
    },
    {
      id: 2,
      message: "Payment received: GH₵ 150",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      message: "New service order received",
      time: "2 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div
      className={`bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-40 transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-20"
      }`}
    >
      {/* Left Section - Welcome & Search */}
      <div className="flex items-center gap-4 flex-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back, Jane
          </h1>
          <p className="text-gray-500 text-sm">
            Here's what's happening with your platform today
          </p>
        </div>
      </div>

      {/* Right Section - Search, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <MdSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-64"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MdNotifications size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Notifications</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">
                  Mark all read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                      notification.unread ? "bg-indigo-50" : ""
                    }`}
                  >
                    <p className="text-sm text-gray-800 font-medium">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-gray-200">
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="text-left hidden lg:block">
              <p className="font-semibold text-gray-800 text-sm">Jane Doe</p>
              <p className="text-gray-500 text-xs">Owner</p>
            </div>
            <MdExpandMore size={20} className="text-gray-500" />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold text-gray-800">Jane Doe</p>
                <p className="text-sm text-gray-500">jane@example.com</p>
              </div>
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                  <MdPerson size={18} />
                  <span className="text-sm">My Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                  <MdSettings size={18} />
                  <span className="text-sm">Settings</span>
                </button>
              </div>
              <div className="border-t border-gray-200 py-2">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600">
                  <MdLogout size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
