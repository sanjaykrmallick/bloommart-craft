import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  Notification,
} from "@/api/resources";
import { getApiErrorMessage } from "@/api/client";
import { toast } from "sonner";

const Notifications = () => {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const load = () =>
    getNotifications({ page: 1, limit: 20 })
      .then((r) => setItems(r.data))
      .catch((e) => toast.error(getApiErrorMessage(e)))
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
    const onCreated = () => load();
    window.addEventListener("ordermesh:notification.created", onCreated);
    return () =>
      window.removeEventListener("ordermesh:notification.created", onCreated);
  }, []);
  return (
    <AppShell>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              Updates from orders, payments, and operations.
            </p>
          </div>
          <button
            className="rounded-lg border px-3 py-2 text-sm"
            onClick={async () => {
              await markAllNotificationsRead();
              setItems((current) =>
                current.map((item) => ({ ...item, isRead: true })),
              );
            }}
          >
            Mark all read
          </button>
        </div>
        {loading ? (
          <div className="rounded-2xl border bg-background p-8">
            Loading notifications...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border bg-background p-12 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-start justify-between gap-4 rounded-xl border bg-background p-4 ${!item.isRead ? "border-primary/50" : ""}`}
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.message}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-xs text-primary"
                    onClick={async () => {
                      await markNotificationRead(item.id);
                      setItems((current) =>
                        current.map((entry) =>
                          entry.id === item.id
                            ? { ...entry, isRead: true }
                            : entry,
                        ),
                      );
                    }}
                  >
                    Read
                  </button>
                  <button
                    className="text-xs text-destructive"
                    onClick={async () => {
                      try {
                        await deleteNotification(item.id);
                        setItems((current) =>
                          current.filter((entry) => entry.id !== item.id),
                        );
                      } catch (e) {
                        toast.error(getApiErrorMessage(e));
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};
export default Notifications;
