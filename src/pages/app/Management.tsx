import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { getProducts } from "@/api/catalog";
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
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const load = () => {
    if (section === "categories")
      getCategories()
        .then((r) => setCategories(r.data))
        .catch((e) => toast.error(getApiErrorMessage(e)));
    else
      getProducts({ limit: 100 })
        .then((r) => setProducts(r.data))
        .catch((e) => toast.error(getApiErrorMessage(e)));
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
        editingId
          ? await updateCategory(editingId, payload)
          : await createCategory(payload);
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
        editingId
          ? await updateProduct(editingId, payload)
          : await createProduct(payload);
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
  const edit = (item: any) => {
    setEditingId(item.id);
    setForm(
      section === "categories"
        ? {
            name: item.name,
            slug: item.slug,
            description: item.description || "",
          }
        : {
            sku: item.sku,
            name: item.name,
            slug: item.slug,
            description: item.description || "",
            price: String(item.priceInCents / 100),
            imageUrl: item.imageUrl || "",
            categoryId: item.categoryId || "",
          },
    );
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
            : ["sku", "name", "slug", "price", "imageUrl", "categoryId"]
          ).map((key) => (
            <input
              key={key}
              required={["name", "slug", "sku", "price", "categoryId"].includes(
                key,
              )}
              placeholder={key}
              value={form[key] || ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="h-11 rounded-lg border px-3"
            />
          ))}
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
