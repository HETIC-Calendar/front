import { useStore } from "@/store/store";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: string;
  redirectPath?: string;
};

const ProtectedRoute = ({ children, requiredRole, redirectPath }: ProtectedRouteProps) => {
  const { user, authLoading, hasRole } = useStore();
  if (authLoading) {
    return null;
  }
  if (!user) {
    return <Navigate to={redirectPath || "/login"} />;
  }
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to={redirectPath || "/unauthorized"} />;
  }
  return children;
};

export default ProtectedRoute;
