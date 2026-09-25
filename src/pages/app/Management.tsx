import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { CatalogProduct, getProducts } from "@/api/catalog";
import {
  Category,
  createCategory,
  createProduct,
  deactivateCategory,
  deactivateProduct,
  getCategories,
  updateCategory,
  updateProduct,
} from "@/api/resources";
import { getApiErrorMessage } from "@/api/client";
import { toast } from "sonner";

const Management = () => {
  const section = useLocation().pathname.includes("categories")
    ? "categories"
    : "products";
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [form, setForm] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const load = () => {
    if (section === "categories")
      getCategories()
        .then((r) => setCategories(r.data))
        .catch((e) => toast.error(getApiErrorMessage(e)));
    else {
      Promise.all([getProducts({ limit: 100 }), getCategories()])
        .then(([productResponse, categoryResponse]) => {
          setProducts(productResponse.data);
          setCategories(categoryResponse.data);
        })
        .catch((e) => toast.error(getApiErrorMessage(e)));
    }
  };
  useEffect(load, [section]);
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (section === "categories") {
        const payload = {
          name: form.name,
          slug: form.slug,
          description: form.description,
        };
        if (editingId) await updateCategory(editingId, payload);
        else await createCategory(payload);
      } else {
        const payload = {
          sku: form.sku,
          name: form.name,
          slug: form.slug,
          description: form.description,
          priceInCents: Math.round(Number(form.price) * 100),
          imageUrl: form.imageUrl,
          categoryId: form.categoryId,
        };
        if (editingId) await updateProduct(editingId, payload);
        else await createProduct(payload);
      }
      setForm({});
      setEditingId(null);
      toast.success(
        `${section === "categories" ? "Category" : "Product"} ${editingId ? "updated" : "created"}`,
      );
      load();
    } catch (e) {
      toast.error(getApiErrorMessage(e));
    }
  };
  const edit = (item: Category | CatalogProduct) => {
    if (section === "categories") {
      setForm({
        name: item.name,
        slug: item.slug,
        description: item.description || "",
      });
      return;
    }
    const product = item as CatalogProduct;
    setForm({
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      price: String(product.priceInCents / 100),
      imageUrl: product.imageUrl || "",
      categoryId: product.category?.id || "",
    });
  };
  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold">
            {section === "categories"
              ? "Category management"
              : "Product management"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Changes are validated and persisted by the backend.
          </p>
        </div>
        <form
          onSubmit={save}
          className="grid gap-3 rounded-2xl border bg-background p-5 sm:grid-cols-2"
        >
          {(section === "categories"
            ? ["name", "slug", "description"]
            : ["sku", "name", "slug", "price", "imageUrl"]
          ).map((key) => (
            <input
              key={key}
              required={["name", "slug", "sku", "price"].includes(key)}
              type={key === "price" ? "number" : "text"}
              min={key === "price" ? "0" : undefined}
              step={key === "price" ? "0.01" : undefined}
              placeholder={key === "price" ? "Price (e.g. 499.00)" : key}
              value={form[key] || ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="h-11 rounded-lg border px-3"
            />
          ))}
          {section === "products" && (
            <select
              required
              value={form.categoryId || ""}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="h-11 rounded-lg border bg-background px-3"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
          <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground sm:col-span-2">
            {editingId ? "Update" : "Create"}{" "}
            {section === "categories" ? "category" : "product"}
          </button>
        </form>
        <div className="divide-y overflow-hidden rounded-2xl border bg-background">
          {section === "categories"
            ? categories.map((item) => (
                <div key={item.id} className="flex justify-between p-4">
                  <span>
                    {item.name}{" "}
                    <small className="text-muted-foreground">{item.slug}</small>
                  </span>
                  <span className="flex gap-3">
                    <button
                      className="text-sm text-primary"
                      onClick={() => edit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm text-destructive"
                      onClick={async () => {
                        await deactivateCategory(item.id);
                        load();
                      }}
                    >
                      Deactivate
                    </button>
                  </span>
                </div>
              ))
            : products.map((item) => (
                <div key={item.id} className="flex justify-between p-4">
                  <span>
                    {item.name}{" "}
                    <small className="text-muted-foreground">
                      ₹{(item.priceInCents / 100).toFixed(2)}
                    </small>
                  </span>
                  <span className="flex gap-3">
                    <button
                      className="text-sm text-primary"
                      onClick={() => edit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm text-destructive"
                      onClick={async () => {
                        await deactivateProduct(item.id);
                        load();
                      }}
                    >
                      Deactivate
                    </button>
                  </span>
                </div>
              ))}
        </div>
      </div>
    </AppShell>
  );
};
export default Management;
