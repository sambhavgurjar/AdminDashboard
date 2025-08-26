import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { token, role } = useSelector((state) => state.admin);
  if (token && role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
