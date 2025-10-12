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
import Courses from "./pages/courses/Courses";
import Contact from "./pages/contact/Contact";
import Services from "./pages/services/Services";
import ServiceDetails from "./pages/services/ServiceDetail";

// ===== Auth Pages =====
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// ===== Dashboard Pages =====
import StudentDashboard from "./pages/dashboard/student/Dashboard";
import StudentCourses from "./pages/dashboard/student/Courses";
import StudentProgress from "./pages/dashboard/student/Progress";
import StudentProfile from "./pages/dashboard/student/Profile";

import OrganizerDashboard from "./pages/dashboard/organizer/OrganizerDashboard";
import ManageCourses from "./pages/dashboard/organizer/Courses";
import ManageStudents from "./pages/dashboard/organizer/Students";
import ManageServices from "./pages/dashboard/organizer/Services";
import Reports from "./pages/dashboard/organizer/Reports";

// ===== Error Pages =====
import NotFound from "./pages/errors/NotFound";
import Unauthorized from "./pages/errors/Uauthorised";

function App() {
  const router = createBrowserRouter([
    // ===== Public Routes =====
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "contact-us", element: <Contact /> },
        { path: "courses", element: <Courses /> },
        { path: "services", element: <Services /> },
        { path: "services/:serviceId", element: <ServiceDetails /> },
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

    // ===== Dashboard Routes =====
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        // Student Routes
        { index: true, element: <StudentDashboard /> },
        { path: "student/courses", element: <StudentCourses /> },
        { path: "student/progress", element: <StudentProgress /> },
        { path: "student/profile", element: <StudentProfile /> },

        // Organizer Routes
        { path: "organizer", element: <OrganizerDashboard /> },
        { path: "organizer/courses", element: <ManageCourses /> },
        { path: "organizer/students", element: <ManageStudents /> },
        { path: "organizer/services", element: <ManageServices /> },
        { path: "organizer/reports", element: <Reports /> },
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
