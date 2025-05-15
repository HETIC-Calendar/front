import { useStore } from "@/store/store";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: string;
  redirectPath?: string;
};

const ProtectedRoute = ({ children, requiredRole, redirectPath }: ProtectedRouteProps) => {
  const { user, authLoading, hasRole } = useStore();
  if (authLoading || !user) {
    return null;
  }
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to={redirectPath || "/"} />;
  }
  return children;
};

export default ProtectedRoute;
