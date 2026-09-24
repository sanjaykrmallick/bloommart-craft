import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BackendCart } from "@/api/cart";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  brand?: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  setItems: (items: CartItem[]) => void;
  syncFromBackend: (cart: BackendCart) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalSavings: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      setCartOpen: (open) => set({ isCartOpen: open }),

      setItems: (items) => set({ items }),

      syncFromBackend: (cart) =>
        set({
          items: cart.items.map(({ productId, quantity, product }) => ({
            id: productId,
            name: product.name,
            price: product.priceInCents / 100,
            image:
              product.imageUrl ||
              "https://placehold.co/160x200/f2f0eb/334155?text=OrderMesh",
            quantity,
            brand: product.sku,
          })),
        }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getTotalSavings: () => {
        return get().items.reduce((total, item) => {
          if (item.originalPrice) {
            return total + (item.originalPrice - item.price) * item.quantity;
          }
          return total;
        }, 0);
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
