import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowed }) {
  const { token, role } = useSelector((state) => state.admin);
  if (!token) {
 
    return <Navigate to="/login" replace />;
  }

  if (allowed && !allowed.includes(role)) {
    
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
