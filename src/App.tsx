import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Orders from "./pages/app/Orders";
import Checkout from "./pages/app/Checkout";
import Payment from "./pages/app/Payment";
import Notifications from "./pages/app/Notifications";
import Backoffice from "./pages/app/Backoffice";
import Profile from "./pages/app/Profile";
import Management from "./pages/app/Management";
import { RoleRoute } from "./components/common/ProtectedRoute";
import {
  connectNotifications,
  disconnectNotifications,
} from "./services/socket";

const AuthExpiryHandler = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleExpiry = () => {
      logout();
      navigate("/auth/login", { replace: true });
    };
    window.addEventListener("ordermesh:auth-expired", handleExpiry);
    return () =>
      window.removeEventListener("ordermesh:auth-expired", handleExpiry);
  }, [logout, navigate]);

  return null;
};

const RealtimeBridge = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  useEffect(() => {
    if (!accessToken) {
      disconnectNotifications();
      return;
    }
    const socket = connectNotifications(accessToken);
    return () => {
      socket.disconnect();
    };
  }, [accessToken]);
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <AuthExpiryHandler />
        <RealtimeBridge />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/:orderId" element={<Payment />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/admin"
              element={
                <RoleRoute allowedRoles={["ADMIN"]}>
                  <Backoffice />
                </RoleRoute>
              }
            />
            <Route
              path="/operations"
              element={
                <RoleRoute allowedRoles={["OPERATIONS"]}>
                  <Backoffice />
                </RoleRoute>
              }
            />
            <Route
              path="/warehouse"
              element={
                <RoleRoute allowedRoles={["WAREHOUSE"]}>
                  <Backoffice />
                </RoleRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <RoleRoute allowedRoles={["ADMIN", "OPERATIONS", "WAREHOUSE"]}>
                  <Backoffice />
                </RoleRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <RoleRoute allowedRoles={["ADMIN", "OPERATIONS"]}>
                  <Backoffice />
                </RoleRoute>
              }
            />
            <Route
              path="/users"
              element={
                <RoleRoute allowedRoles={["ADMIN", "OPERATIONS"]}>
                  <Backoffice />
                </RoleRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <RoleRoute allowedRoles={["ADMIN"]}>
                  <Management />
                </RoleRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <RoleRoute allowedRoles={["ADMIN"]}>
                  <Management />
                </RoleRoute>
              }
            />
            <Route
              path="/operations/products"
              element={
                <RoleRoute allowedRoles={["OPERATIONS"]}>
                  <Management />
                </RoleRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
