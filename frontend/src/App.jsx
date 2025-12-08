import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// ===== Layouts =====
import PublicLayout from "./layout/PublicLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";

// ===== Public Pages =====
import Home from "./pages/home/Home";
// import Courses from "./pages/courses/Courses";
// import CourseDetails from "./pages/courses/CourseDetails";
import Contact from "./pages/contact/Contact";
import Services from "./pages/services/Services";
import ServiceDetail from "./pages/services/ServiceDetail";

// ===== Auth Pages =====
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// ===== Dashboard Pages =====
import StudentDashboard from "./pages/dashboard/student/Dashboard";
import StudentCourses from "./pages/dashboard/student/Courses";
// import BrowseCourses from "./pages/dashboard/student/Browse";
import Achievements from "./pages/dashboard/student/Achievements";
import PurchaseHistory from "./pages/dashboard/student/PurchaseHistory";
import StudentProfile from "./pages/dashboard/student/Profile";
import Settings from "./pages/dashboard/shared/Settings";

import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import ManageCourses from "./pages/dashboard/admin/Courses";
import ManageStudents from "./pages/dashboard/admin/Students";
import ManageServices from "./pages/dashboard/admin/Services";
import Reports from "./pages/dashboard/admin/Reports";
// import AdminSettings from "./pages/dashboard/admin/Settings";
import ManageAdmins from "./pages/dashboard/admin/ManageAdmins";
// import ManageServices from "./pages/dashboard/admin/ManageServices";

// ===== Error Pages =====
import NotFound from "./pages/errors/NotFound";
import Unauthorized from "./pages/errors/Uauthorised";
import SuperAdminRoute from "./pages/dashboard/admin/SuperAdminRoute";

function App() {
  // Keep backend awake
  useEffect(() => {
    startKeepAlive();
  }, []);

  const router = createBrowserRouter([
    // ===== Public Routes =====
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "contact-us", element: <Contact /> },
        // { path: "courses", element: <Courses /> },
        // { path: "courses/:id", element: <CourseDetails /> },
        { path: "services", element: <Services /> },
        { path: "services/:serviceId", element: <ServiceDetail /> },
      ],
    },

    // ===== Auth Routes =====
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password/:token", element: <ResetPassword /> },
      ],
    },

    {
      path: "/student",
      element: <DashboardLayout userRole="student" />,
      children: [
        { path: "dashboard", element: <StudentDashboard /> },
        { path: "courses", element: <StudentCourses /> },
        // { path: "browse", element: <BrowseCourses /> },
        { path: "achievements", element: <Achievements /> },
        { path: "purchases", element: <PurchaseHistory /> },
        { path: "profile", element: <StudentProfile /> },
        { path: "settings", element: <Settings userRole="student" /> },
      ],
    },

    // ===== Admin/Organizer Dashboard Routes =====

    {
      path: "/admin",
      element: <DashboardLayout userRole="admin" />,
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "courses", element: <ManageCourses /> },
        { path: "students", element: <ManageStudents /> },
        { path: "services", element: <ManageServices /> },
        {
          path: "admins",
          element: (
            <SuperAdminRoute>
              <ManageAdmins />
            </SuperAdminRoute>
          ),
        },
        // { path: "settings", element: <AdminSettings /> },
        { path: "settings", element: <Settings userRole="admin" /> },
        // { path: "services", element: <ManageServices /> },
      ],
    },

    // ===== Error Routes =====
    { path: "/unauthorized", element: <Unauthorized /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {/* <ToastContainer position="top-right" autoClose={3000} theme="colored" /> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
