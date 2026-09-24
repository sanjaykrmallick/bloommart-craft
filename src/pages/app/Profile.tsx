import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { changePassword, deactivateMe, getMe, updateMe } from "@/api/auth";
import { getApiErrorMessage } from "@/api/client";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
  });
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    getMe()
      .then((next) => {
        setProfile({
          firstName: next.firstName || "",
          lastName: next.lastName || "",
          phone: next.phone || "",
        });
        updateUser(next);
      })
      .catch(() => undefined);
  }, [updateUser]);
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal account details.
          </p>
        </div>
        <form
          className="space-y-4 rounded-2xl border bg-background p-6"
          onSubmit={async (event) => {
            event.preventDefault();
            setBusy(true);
            try {
              const next = await updateMe(profile);
              updateUser(next);
              toast.success("Profile updated");
            } catch (e) {
              toast.error(getApiErrorMessage(e));
            } finally {
              setBusy(false);
            }
          }}
        >
          <p className="font-semibold">Personal information</p>
          <p className="text-sm text-muted-foreground">
            {user?.email} · {user?.role}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {(["firstName", "lastName", "phone"] as const).map((key) => (
              <label key={key}>
                <span className="mb-1 block text-sm">{key}</span>
                <input
                  value={profile[key]}
                  onChange={(e) =>
                    setProfile({ ...profile, [key]: e.target.value })
                  }
                  className="h-11 w-full rounded-lg border px-3"
                  required={key !== "lastName"}
                />
              </label>
            ))}
          </div>
          <button
            disabled={busy}
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
          >
            {busy ? "Saving..." : "Save profile"}
          </button>
        </form>
        <form
          className="space-y-4 rounded-2xl border bg-background p-6"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await changePassword(password);
              logout();
              toast.success("Password changed. Please sign in again.");
              navigate("/auth/login");
            } catch (e) {
              toast.error(getApiErrorMessage(e));
            }
          }}
        >
          <p className="font-semibold">Change password</p>
          <input
            type="password"
            minLength={8}
            required
            placeholder="Current password"
            value={password.currentPassword}
            onChange={(e) =>
              setPassword({ ...password, currentPassword: e.target.value })
            }
            className="h-11 w-full rounded-lg border px-3"
          />
          <input
            type="password"
            minLength={8}
            required
            placeholder="New password"
            value={password.newPassword}
            onChange={(e) =>
              setPassword({ ...password, newPassword: e.target.value })
            }
            className="h-11 w-full rounded-lg border px-3"
          />
          <button className="rounded-lg border px-4 py-2">
            Change password
          </button>
        </form>
        <button
          className="rounded-lg border border-destructive px-4 py-2 text-destructive"
          onClick={async () => {
            if (!window.confirm("Deactivate your account?")) return;
            await deactivateMe();
            logout();
            navigate("/auth/login");
          }}
        >
          Deactivate account
        </button>
      </div>
    </AppShell>
  );
};
export default Profile;
