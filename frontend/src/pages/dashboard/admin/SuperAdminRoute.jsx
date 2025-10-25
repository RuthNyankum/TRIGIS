import React from "react";
import { Navigate } from "react-router";

const SuperAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "superadmin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default SuperAdminRoute;
