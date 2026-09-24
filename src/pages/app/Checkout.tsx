import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { checkout } from "@/api/resources";
import { getApiErrorMessage } from "@/api/client";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const update =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }
    setBusy(true);
    try {
      const result = await checkout({ shippingAddress: form });
      sessionStorage.setItem(
        `ordermesh-payment-${result.order.id}`,
        JSON.stringify(result.payment),
      );
      clearCart();
      navigate(`/payment/${result.order.id}`);
    } catch (e) {
      toast.error(
        getApiErrorMessage(e, "Checkout failed. Please review your cart."),
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="text-sm text-muted-foreground">
            Your final amount is calculated and validated by the backend.
          </p>
        </div>
        <form
          onSubmit={submit}
          className="space-y-4 rounded-2xl border bg-background p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.keys(form).map((key) => (
              <label
                key={key}
                className={
                  key === "addressLine1" || key === "addressLine2"
                    ? "sm:col-span-2"
                    : ""
                }
              >
                <span className="mb-1 block text-sm font-medium">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <input
                  required={key !== "addressLine2"}
                  value={form[key as keyof typeof form]}
                  onChange={update(key)}
                  className="h-11 w-full rounded-lg border px-3 outline-none focus:border-primary"
                />
              </label>
            ))}
          </div>
          <button
            disabled={busy}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Checking out..." : "Create order and continue to payment"}
          </button>
        </form>
      </div>
    </AppShell>
  );
};
export default Checkout;
