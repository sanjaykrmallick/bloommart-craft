import { apiClient } from "./client";
import { PaginatedResponse } from "./catalog";
import { CatalogProduct } from "./catalog";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PAYMENT_PENDING"
  | "PAID"
  | "PROCESSING"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmountInCents: number;
  createdAt: string;
  shippingAddress: Record<string, string>;
  items: Array<{
    id: string;
    productId: string;
    productName: string;
    sku: string;
    quantity: number;
    unitPriceInCents: number;
    totalPriceInCents: number;
    product?: { imageUrl?: string | null; name: string };
  }>;
  payment?: {
    status: string;
    attempts?: Array<{ status: string; provider: string }>;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  entityType?: string | null;
  entityId?: string | null;
  createdAt: string;
}

export interface InventoryRecord {
  id: string;
  productId: string;
  availableQuantity: number;
  reservedQuantity: number;
  status: string;
  updatedAt: string;
  product?: { name: string; sku: string };
}

export const getOrders = async (
  params: { page?: number; limit?: number; status?: OrderStatus } = {},
) =>
  (await apiClient.get<PaginatedResponse<Order>>("/orders", { params })).data;
export const getOrder = async (id: string) =>
  (await apiClient.get<Order>(`/orders/${id}`)).data;
export const checkout = async (payload: {
  shippingAddress: Record<string, string>;
  notes?: string;
}) =>
  (
    await apiClient.post<{ order: Order; payment: Record<string, unknown> }>(
      "/orders/checkout",
      payload,
    )
  ).data;
export const cancelOrder = async (id: string) =>
  (await apiClient.delete(`/orders/${id}`)).data;

export const getNotifications = async (
  params: { page?: number; limit?: number } = {},
) =>
  (
    await apiClient.get<PaginatedResponse<Notification>>("/notifications", {
      params,
    })
  ).data;
export const getUnreadCount = async () =>
  (await apiClient.get<{ count: number }>("/notifications/unread-count")).data;
export const markNotificationRead = async (id: string) =>
  (await apiClient.patch(`/notifications/${id}/read`)).data;
export const markAllNotificationsRead = async () =>
  (await apiClient.patch("/notifications/read-all")).data;
export const deleteNotification = async (id: string) =>
  (await apiClient.delete(`/notifications/${id}`)).data;

export const getInventory = async () =>
  (await apiClient.get<InventoryRecord[]>("/inventory")).data;
export const adjustInventory = async (
  productId: string,
  payload: { quantity: number; type: string; reason?: string },
) => (await apiClient.post(`/inventory/${productId}/adjust`, payload)).data;
export const reserveInventory = async (productId: string, quantity: number) =>
  (await apiClient.post(`/inventory/${productId}/reserve`, { quantity })).data;
export const releaseInventory = async (productId: string, quantity: number) =>
  (await apiClient.post(`/inventory/${productId}/release`, { quantity })).data;

export const getAnalyticsDashboard = async (from?: string, to?: string) =>
  (await apiClient.get("/analytics/dashboard", { params: { from, to } })).data;
export const getSalesByProduct = async (from?: string, to?: string) =>
  (await apiClient.get("/analytics/sales/products", { params: { from, to } }))
    .data;

export interface ManagedUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}
export const getUsers = async (
  params: { page?: number; limit?: number } = {},
) =>
  (await apiClient.get<PaginatedResponse<ManagedUser>>("/users", { params }))
    .data;

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  isActive: boolean;
}
export const getCategories = async () =>
  (await apiClient.get<PaginatedResponse<Category>>("/categories")).data;
export const createCategory = async (payload: {
  name: string;
  slug: string;
  description?: string;
}) => (await apiClient.post<Category>("/categories", payload)).data;
export const updateCategory = async (
  id: string,
  payload: Partial<Omit<Category, "id" | "isActive">>,
) => (await apiClient.patch<Category>(`/categories/${id}`, payload)).data;
export const deactivateCategory = async (id: string) =>
  (await apiClient.delete(`/categories/${id}`)).data;
export const createProduct = async (payload: {
  sku: string;
  name: string;
  slug: string;
  description?: string;
  priceInCents: number;
  imageUrl?: string;
  categoryId: string;
}) => (await apiClient.post<CatalogProduct>("/products", payload)).data;
export const updateProduct = async (
  id: string,
  payload: Partial<{
    sku: string;
    name: string;
    slug: string;
    description: string;
    priceInCents: number;
    imageUrl: string;
    categoryId: string;
  }>,
) => (await apiClient.patch<CatalogProduct>(`/products/${id}`, payload)).data;
export const deactivateProduct = async (id: string) =>
  (await apiClient.delete(`/products/${id}`)).data;
