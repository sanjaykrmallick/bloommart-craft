import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { addCartItem } from "@/api/cart";
import { getApiErrorMessage } from "@/api/client";
import { useAuthStore } from "@/store/useAuthStore";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal";
}

const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const { addItem } = useCartStore();
  const syncFromBackend = useCartStore((state) => state.syncFromBackend);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { isInWishlist, toggleItem } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        const cart = await addCartItem(product.id);
        syncFromBackend(cart);
        toast.success("Added to cart!", { description: product.name });
      } catch (error) {
        toast.error(
          getApiErrorMessage(error, "Unable to add this product to your cart."),
        );
      }
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brand,
    });
    toast.success("Added to cart!", {
      description: product.name,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brand,
    });
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  if (variant === "horizontal") {
    return (
      <Link to={`/products/${product.id}`}>
        <motion.div
          whileHover={{ y: -2 }}
          className="flex gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-lg transition-all"
        >
          <div className="relative w-32 h-40 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
            {product.discount && (
              <span className="badge-sale absolute top-2 left-2">
                {product.discount}% OFF
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              {product.brand}
            </p>
            <h3 className="font-semibold line-clamp-2 mb-2">{product.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center gap-1 bg-deal text-deal-foreground px-2 py-0.5 rounded text-xs font-semibold">
                <Star className="w-3 h-3 fill-current" />
                {product.rating}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount.toLocaleString()})
              </span>
            </div>
            <div className="mt-auto flex items-center gap-2">
              <span className="font-bold text-lg">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          "group product-card bg-card",
          variant === "compact" && "text-sm",
        )}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[3/4] bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && <span className="badge-new">NEW</span>}
            {product.discount && (
              <span className="badge-sale">{product.discount}% OFF</span>
            )}
            {product.isBestSeller && (
              <span className="badge-deal">BESTSELLER</span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-md transition-colors",
              inWishlist
                ? "text-sale"
                : "text-muted-foreground hover:text-sale",
            )}
          >
            <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
          </motion.button>

          {/* Quick Add to Cart */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02 }}
            className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground py-3 font-semibold text-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-full group-hover:translate-y-0"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground font-medium mb-1">
            {product.brand}
          </p>
          <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 bg-deal/10 text-deal px-2 py-0.5 rounded text-xs font-semibold">
              <Star className="w-3 h-3 fill-current" />
              {product.rating}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-lg">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm text-deal font-semibold">
                  ({product.discount}% off)
                </span>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
