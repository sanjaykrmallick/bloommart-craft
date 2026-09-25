import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Boxes,
  ChartNoAxesCombined,
  ClipboardList,
  Home,
  LogOut,
  Package,
  Settings2,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
type WorkspaceLink = readonly [
  string,
  string,
  React.ComponentType<{ className?: string }>,
];

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const role = user?.role;
  const links: WorkspaceLink[] =
    role === "CUSTOMER"
      ? [
          ["/", "Shop home", Home],
          ["/products", "Browse products", ShoppingBag],
          ["/orders", "My orders", ClipboardList],
          ["/notifications", "Notifications", Bell],
          ["/profile", "My account", Users],
        ]
      : [
          ["/", "Workspace", Home],
          ["/products", "Storefront", ShoppingBag],
          ...(role === "ADMIN" || role === "OPERATIONS"
            ? [["/admin/products", "Manage products", Settings2] as const]
            : []),
          ...(role === "ADMIN"
            ? [["/admin/categories", "Manage categories", Settings2] as const]
            : []),
          ["/inventory", "Inventory", Boxes],
          ["/orders", "Orders", ClipboardList],
          ...(role === "ADMIN" || role === "OPERATIONS"
            ? [
                ["/users", "Users", Users] as const,
                ["/analytics", "Analytics", ChartNoAxesCombined] as const,
              ]
            : []),
          ["/notifications", "Notifications", Bell],
          ["/profile", "My account", Users],
        ];

  return (
    <div className="min-h-screen bg-secondary/30 text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Package className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl">OrderMesh</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">
                {user?.firstName || user?.email}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                {role}
              </p>
            </div>
            <button
              aria-label="Log out"
              className="rounded-lg p-2 hover:bg-secondary"
              onClick={() => {
                logout();
                navigate("/auth/login");
              }}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <div className="container grid gap-6 py-6 md:grid-cols-[220px_1fr]">
        <aside className="hidden rounded-2xl border bg-background p-3 md:block">
          <div className="mb-3 rounded-xl bg-primary/10 px-3 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {role} workspace
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {role === "CUSTOMER"
                ? "Shop, pay, and track your orders"
                : role === "WAREHOUSE"
                  ? "Keep stock accurate and ready to ship"
                  : "Run the store from one place"}
            </p>
          </div>
          <nav className="space-y-1">
            {links.map(([href, label, Icon]) => (
              <Link
                key={href as string}
                to={href as string}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-secondary"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
