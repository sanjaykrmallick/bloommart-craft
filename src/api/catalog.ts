import { apiClient } from "./client";
import { Product } from "@/types";

export interface CatalogProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description?: string | null;
  priceInCents: number;
  imageUrl?: string | null;
  isActive: boolean;
  category?: { id: string; name: string; slug: string } | null;
  inventory?: {
    availableQuantity: number;
    reservedQuantity: number;
    status: string;
  } | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const getProducts = async (
  params: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
  } = {},
) =>
  (
    await apiClient.get<PaginatedResponse<CatalogProduct>>("/products", {
      params,
    })
  ).data;

export const mapCatalogProduct = (product: CatalogProduct): Product => ({
  id: product.id,
  name: product.name,
  brand: product.category?.name || "OrderMesh",
  price: product.priceInCents / 100,
  image:
    product.imageUrl ||
    "https://placehold.co/600x800/f2f0eb/334155?text=OrderMesh",
  category: product.category?.name || "Products",
  description: product.description || undefined,
  rating: 0,
  reviewCount: 0,
  inStock: (product.inventory?.availableQuantity || 0) > 0,
});
