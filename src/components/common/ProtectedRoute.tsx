import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole, useAuthStore } from "@/store/useAuthStore";
import { ReactNode } from "react";

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};

export const RoleRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: UserRole[];
  children: ReactNode;
}) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/auth/login" replace />;
  return allowedRoles.includes(user.role) ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};
