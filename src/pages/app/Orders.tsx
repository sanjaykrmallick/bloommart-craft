import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { cancelOrder, getOrder, getOrders, Order } from "@/api/resources";
import { getApiErrorMessage } from "@/api/client";
import { toast } from "sonner";

const money = (cents: number) =>
  `₹${(cents / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
const label = (status: string) => status.replaceAll("_", " ");

const OrderDetail = ({ id }: { id: string }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    getOrder(id)
      .then(setOrder)
      .catch((e) => toast.error(getApiErrorMessage(e)));
  }, [id]);
  if (!order)
    return (
      <div className="rounded-2xl border bg-background p-8">
        Loading order...
      </div>
    );
  const canCancel =
    order.status === "PENDING" || order.status === "PAYMENT_PENDING";
  return (
    <div className="space-y-5">
      <Link to="/orders" className="text-sm text-primary">
        ← Back to orders
      </Link>
      <div className="rounded-2xl border bg-background p-6">
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Order number</p>
            <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
          </div>
          <span className="h-fit rounded-full bg-secondary px-3 py-1 text-sm font-medium">
            {label(order.status)}
          </span>
        </div>
        <div className="mt-6 divide-y">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 py-4">
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-muted-foreground">
                  {item.sku} · Qty {item.quantity}
                </p>
              </div>
              <p className="font-semibold">{money(item.totalPriceInCents)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
          <span>Total</span>
          <span>{money(order.totalAmountInCents)}</span>
        </div>
        {canCancel && (
          <button
            disabled={busy}
            className="mt-5 rounded-lg border border-destructive px-4 py-2 text-sm text-destructive disabled:opacity-50"
            onClick={async () => {
              if (
                !window.confirm("Are you sure you want to cancel this order?")
              )
                return;
              setBusy(true);
              try {
                await cancelOrder(order.id);
                setOrder({ ...order, status: "CANCELLED" });
                toast.success("Order cancelled");
              } catch (e) {
                toast.error(
                  getApiErrorMessage(e, "This order cannot be cancelled."),
                );
              } finally {
                setBusy(false);
              }
            }}
          >
            {busy ? "Cancelling..." : "Cancel order"}
          </button>
        )}
      </div>
    </div>
  );
};

const Orders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id)
      getOrders()
        .then((r) => setOrders(r.data))
        .catch((e) => toast.error(getApiErrorMessage(e)))
        .finally(() => setLoading(false));
  }, [id]);
  return (
    <AppShell>
      {id ? (
        <OrderDetail id={id} />
      ) : (
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-bold">My orders</h1>
            <p className="text-sm text-muted-foreground">
              Track your order and payment status.
            </p>
          </div>
          {loading ? (
            <div className="rounded-2xl border bg-background p-8">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border bg-background p-12 text-center">
              <p className="text-muted-foreground">You have no orders yet.</p>
              <Link to="/products" className="mt-4 inline-block text-primary">
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  to={`/orders/${order.id}`}
                  className="block rounded-2xl border bg-background p-5 hover:border-primary"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <p className="font-semibold">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                        {order.items.length} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {money(order.totalAmountInCents)}
                      </p>
                      <p className="text-sm capitalize text-muted-foreground">
                        {label(order.status)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </AppShell>
  );
};
export default Orders;
