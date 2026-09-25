import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import { categories } from "@/data/mockData";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { getTotalItems, toggleCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const user = useAuthStore((state) => state.user);

  const cartItemCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-foreground text-background text-xs py-2">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              1800-123-4567
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Track Your Order
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/offers" className="hover:text-accent transition-colors">
              Offers & Deals
            </Link>
            <Link
              to="/vendor/dashboard"
              className="hover:text-accent transition-colors"
            >
              Sell on ShopKart
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold hidden sm:block text-gradient-primary">
                ShopKart
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-12 pr-4 rounded-full border-2 border-border bg-secondary/50 focus:bg-background focus:border-primary transition-all outline-none text-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Mobile Search Toggle */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Profile */}
              <Link to={user ? "/profile" : "/auth/login"} className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <User className="w-5 h-5" />
                </Button>
                {user && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary-foreground">
                    {user.role}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-sale text-sale-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={toggleCart}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden md:block border-t border-border/50">
            <ul className="flex items-center justify-center gap-1 py-2">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    to={`/categories/${category.slug}`}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {category.name}
                    <ChevronDown className="w-4 h-4" />
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {activeCategory === category.id &&
                      category.subcategories && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 bg-background border border-border rounded-xl shadow-xl p-4 min-w-[200px] z-50"
                        >
                          <ul className="space-y-1">
                            {category.subcategories.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  to={`/categories/${category.slug}/${sub.slug}`}
                                  className="block px-3 py-2 text-sm rounded-lg hover:bg-secondary transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </li>
              ))}
              <li>
                <Link
                  to="/offers"
                  className="px-4 py-2 text-sm font-medium text-sale hover:text-sale/80 transition-colors"
                >
                  Offers 🔥
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <form onSubmit={handleSearch} className="p-3">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-12 pr-12 rounded-full border-2 border-border bg-secondary/50 focus:bg-background focus:border-primary transition-all outline-none text-sm"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-background z-50 md:hidden overflow-y-auto"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <span className="text-lg font-bold">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/categories/${category.slug}`}
                        className="block py-3 px-4 font-medium rounded-lg hover:bg-secondary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/offers"
                      className="block py-3 px-4 font-medium text-sale rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Offers & Deals 🔥
                    </Link>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    to={user ? "/profile" : "/auth/login"}
                    className="block py-3 px-4 font-medium rounded-lg hover:bg-secondary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {user ? `${user.role} account` : "Login / Sign Up"}
                  </Link>
                  <Link
                    to="/orders"
                    className="block py-3 px-4 font-medium rounded-lg hover:bg-secondary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/vendor/dashboard"
                    className="block py-3 px-4 font-medium rounded-lg hover:bg-secondary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sell on ShopKart
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
