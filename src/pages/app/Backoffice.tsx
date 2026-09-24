import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import {
  adjustInventory,
  getAnalyticsDashboard,
  getInventory,
  getSalesByProduct,
  getUsers,
  InventoryRecord,
  ManagedUser,
} from "@/api/resources";
import { getApiErrorMessage } from "@/api/client";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

const Backoffice = () => {
  const path = useLocation().pathname;
  const role = useAuthStore((state) => state.user?.role);
  const section = path.includes("analytics")
    ? "analytics"
    : path.includes("users")
      ? "users"
      : path.includes("inventory")
        ? "inventory"
        : "dashboard";
  const [inventory, setInventory] = useState<InventoryRecord[]>([]);
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [analytics, setAnalytics] = useState<Record<string, unknown> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const request =
      section === "inventory"
        ? getInventory().then(setInventory)
        : section === "users"
          ? getUsers().then((r) => setUsers(r.data))
          : getAnalyticsDashboard().then(setAnalytics);
    request
      .catch((e) =>
        toast.error(getApiErrorMessage(e, "Unable to load this workspace.")),
      )
      .finally(() => setLoading(false));
  }, [section]);
  const title =
    section === "inventory"
      ? "Inventory"
      : section === "users"
        ? "Users"
        : section === "analytics"
          ? "Analytics"
          : `${role} dashboard`;
  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">
            Live data from the OrderMesh backend.
          </p>
        </div>
        {loading ? (
          <div className="rounded-2xl border bg-background p-8">Loading...</div>
        ) : section === "inventory" ? (
          <InventoryView
            records={inventory}
            canReserve={role === "ADMIN" || role === "OPERATIONS"}
            onRefresh={() => getInventory().then(setInventory)}
          />
        ) : section === "users" ? (
          <UsersView users={users} />
        ) : section === "analytics" ? (
          <AnalyticsView data={analytics} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="mt-2 text-xl font-bold">{role}</p>
            </div>
            <div className="rounded-2xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Operational data</p>
              <p className="mt-2 font-semibold">
                Use the navigation to inspect live records.
              </p>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};

const InventoryView = ({
  records,
  canReserve,
  onRefresh,
}: {
  records: InventoryRecord[];
  canReserve: boolean;
  onRefresh: () => void;
}) => (
  <div className="overflow-hidden rounded-2xl border bg-background">
    <div className="divide-y">
      {records.length === 0 ? (
        <p className="p-8 text-center text-muted-foreground">
          No inventory records.
        </p>
      ) : (
        records.map((record) => (
          <div
            key={record.id}
            className="flex flex-wrap items-center justify-between gap-4 p-4"
          >
            <div>
              <p className="font-semibold">
                {record.product?.name || record.productId}
              </p>
              <p className="text-sm text-muted-foreground">
                Available {record.availableQuantity} · Reserved{" "}
                {record.reservedQuantity} · {record.status}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg border px-3 py-2 text-sm"
                onClick={async () => {
                  const value = window.prompt(
                    "Adjustment quantity (positive restock, negative correction)",
                  );
                  if (!value) return;
                  try {
                    await adjustInventory(record.productId, {
                      quantity: Number(value),
                      type: "MANUAL",
                      reason: "Backoffice adjustment",
                    });
                    toast.success("Inventory updated");
                    onRefresh();
                  } catch (e) {
                    toast.error(getApiErrorMessage(e));
                  }
                }}
              >
                Adjust
              </button>
              {canReserve && (
                <span className="text-xs text-muted-foreground">
                  Reserve/release available via service API
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const UsersView = ({ users }: { users: ManagedUser[] }) => (
  <div className="overflow-hidden rounded-2xl border bg-background">
    <div className="divide-y">
      {users.length === 0 ? (
        <p className="p-8 text-center text-muted-foreground">No users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="flex flex-wrap justify-between gap-3 p-4"
          >
            <div>
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {user.email} · {user.phone || "No phone"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{user.role}</p>
              <p className="text-xs text-muted-foreground">
                {user.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const AnalyticsView = ({ data }: { data: Record<string, unknown> | null }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {data &&
      Object.entries(data).map(([key, value]) => (
        <div key={key} className="rounded-2xl border bg-background p-5">
          <p className="text-sm capitalize text-muted-foreground">
            {key.replaceAll("_", " ")}
          </p>
          <p className="mt-2 break-all text-xl font-bold">
            {typeof value === "object" ? JSON.stringify(value) : String(value)}
          </p>
        </div>
      ))}
    {!data && (
      <p className="text-muted-foreground">
        No analytics data for this period.
      </p>
    )}
  </div>
);

export default Backoffice;
