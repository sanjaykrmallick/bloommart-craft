import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const location = useLocation();
  const { getTotalItems, toggleCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const cartItemCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/products' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist', badge: wishlistCount },
    { icon: ShoppingBag, label: 'Cart', action: toggleCart, badge: cartItemCount },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="mobile-nav safe-area-inset-bottom">
      <div className="flex items-center justify-around py-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          
          if (item.action) {
            return (
              <button
                key={item.label}
                onClick={item.action}
                className="mobile-nav-item"
              >
                <div className="relative">
                  <IconComponent className="w-5 h-5" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path!}
              className={cn('mobile-nav-item', isActive(item.path!) && 'active')}
            >
              <div className="relative">
                <IconComponent className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-sale text-sale-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
