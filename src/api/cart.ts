import { apiClient } from "./client";

export interface BackendCartItem {
  productId: string;
  quantity: number;
  product: {
    id: string;
    sku: string;
    name: string;
    priceInCents: number;
    imageUrl?: string | null;
    inventory?: { availableQuantity: number } | null;
  };
}

export interface BackendCart {
  id: string | null;
  items: BackendCartItem[];
  totalItems: number;
  totalAmountInCents: number;
}

export const getCart = async () =>
  (await apiClient.get<BackendCart>("/cart")).data;
export const addCartItem = async (productId: string, quantity = 1) =>
  (await apiClient.post<BackendCart>("/cart/items", { productId, quantity }))
    .data;
export const updateCartItem = async (productId: string, quantity: number) =>
  (await apiClient.patch<BackendCart>(`/cart/items/${productId}`, { quantity }))
    .data;
export const removeCartItem = async (productId: string) =>
  (await apiClient.delete<BackendCart>(`/cart/items/${productId}`)).data;
export const clearCart = async () =>
  (await apiClient.delete<BackendCart>("/cart")).data;
