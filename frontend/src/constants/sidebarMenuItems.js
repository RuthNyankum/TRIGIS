import {
  FaTachometerAlt,
  FaBookOpen,
  FaUsers,
  FaDollarSign,
  FaUserShield,
  FaFileAlt,
  FaCog,
  FaGraduationCap,
  FaGift,
  FaUser,
  FaHistory,
} from "react-icons/fa";

// Admin/Owner Menu Items
export const adminMenuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: FaTachometerAlt,
    path: "/admin/dashboard",
  },
  {
    id: "courses",
    label: "Courses",
    icon: FaBookOpen,
    path: "/admin/courses",
  },
  // {
  //   id: "students",
  //   label: "Students",
  //   icon: FaUsers,
  //   path: "/admin/students",
  // },
  {
    id: "services",
    label: "Services",
    icon: FaFileAlt,
    path: "/admin/services",
  },
  // {
  //   id: "revenue",
  //   label: "Revenue",
  //   icon: FaDollarSign,
  //   path: "/admin/revenue",
  // },
  {
    id: "admins",
    label: "Manage Admin",
    icon: FaUserShield,
    path: "/admin/admins",
  },
  { id: "settings", label: "Settings", icon: FaCog, path: "/admin/settings" },
];

// Student Menu Items
export const studentMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: FaTachometerAlt,
    path: "/student/dashboard",
  },
  {
    id: "my-courses",
    label: "My Courses",
    icon: FaBookOpen,
    path: "/student/courses",
  },
  // {
  //   id: "browse",
  //   label: "Browse Courses",
  //   icon: FaGraduationCap,
  //   path: "/student/browse",
  // },
  {
    id: "achievements",
    label: "Achievements",
    icon: FaGift,
    path: "/student/achievements",
  },
  {
    id: "purchase-history",
    label: "Purchase History",
    icon: FaHistory,
    path: "/student/purchases",
  },
  {
    id: "profile",
    label: "My Profile",
    icon: FaUser,
    path: "/student/profile",
  },
  {
    id: 6, // ← Add this entire object
    label: "Settings",
    path: "/student/settings",
    icon: FaCog,
  },
];
