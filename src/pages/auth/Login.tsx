import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/api/client";
import { login, register } from "@/api/auth";
import { useAuthStore } from "@/store/useAuthStore";

const Login = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(
    location.pathname !== "/auth/register",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isLogin) {
        const response = await login(email, password);
        setAuth(
          {
            ...response.user,
            name: `${response.user.firstName || ""} ${response.user.lastName || ""}`.trim(),
          },
          response.accessToken,
          response.refreshToken,
        );
        toast.success("Welcome back!");
        navigate("/");
      } else {
        await register({ firstName, lastName, email, phone, password });
        toast.success("Account created. Please sign in.");
        setIsLogin(true);
        navigate("/auth/login", { replace: true });
      }
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          isLogin ? "Unable to sign in." : "Unable to create your account.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient-primary">
              ShopKart
            </span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin
              ? "Sign in to continue shopping"
              : "Join us and start shopping"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background focus:border-primary outline-none"
                  required
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background focus:border-primary outline-none"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-border bg-background focus:border-primary outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background focus:border-primary outline-none"
                minLength={10}
                required
              />
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 pl-12 pr-12 rounded-xl border-2 border-border bg-background focus:border-primary outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Please wait..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>

          <p className="text-center mt-6 text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                navigate(!isLogin ? "/auth/login" : "/auth/register");
              }}
              className="text-primary font-semibold ml-1 hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Right - Image (hidden on mobile) */}
      <div className="hidden lg:block flex-1 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4">Shop the Latest Trends</h2>
            <p className="text-xl opacity-90">
              Discover amazing deals on your favorite brands
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
