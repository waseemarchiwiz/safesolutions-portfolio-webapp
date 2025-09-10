import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("apiusertoken");
    if (!token) {
      navigate("/admin/login", { replace: true }); // Use replace to avoid stacking history
    }
  }, [navigate]);

  const token = localStorage.getItem("apiusertoken");

  if (!token) {
    return null; // Render nothing while redirecting
  }

  return children;
};

export default ProtectedRoutes;
