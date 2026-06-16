import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listAllBookings, updateBookingStatus, claimAdmin } from "@/lib/bookings.functions";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin | Daily Detailers" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchBookings = useServerFn(listAllBookings);
  const updateStatus = useServerFn(updateBookingStatus);
  const claim = useServerFn(claimAdmin);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => fetchBookings(),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: (input: { id: string; status: "pending" | "confirmed" | "completed" | "cancelled" }) =>
      updateStatus({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
      toast.success("Updated");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed"),
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const handleClaim = async () => {
    try {
      await claim();
      toast.success("Admin granted. Reloading...");
      refetch();
    } catch (e: any) {
      toast.error(e.message ?? "Failed");
    }
  };

  const isForbidden = error && /forbidden/i.test((error as Error).message);

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Internal</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Admin · Bookings</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="luxuryOutline" onClick={() => refetch()}>Refresh</Button>
            <Button variant="luxuryOutline" onClick={handleSignOut}>Sign out</Button>
          </div>
        </header>

        {isLoading && <p className="mt-10 font-mono text-xs text-muted-foreground">Loading bookings…</p>}

        {isForbidden && (
          <div className="mt-10 border border-border p-8">
            <h2 className="text-xl font-bold">Admin access required</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              If your account email is the configured owner address, click below to grant yourself admin access.
            </p>
            <Button variant="luxury" className="mt-6" onClick={handleClaim}>Claim admin access</Button>
          </div>
        )}

        {error && !isForbidden && (
          <p className="mt-10 text-sm text-destructive">{(error as Error).message}</p>
        )}

        {data && (
          <div className="mt-10 overflow-x-auto border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-card font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="p-4">Created</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">When</th>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Notes</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.bookings.length === 0 && (
                  <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">No bookings yet.</td></tr>
                )}
                {data.bookings.map((b: any) => (
                  <tr key={b.id} className="border-t border-border align-top">
                    <td className="p-4 font-mono text-xs text-muted-foreground">{new Date(b.created_at).toLocaleString()}</td>
                    <td className="p-4 font-medium">{b.name}</td>
                    <td className="p-4 text-xs"><div>{b.email}</div><div className="text-muted-foreground">{b.phone}</div></td>
                    <td className="p-4">{b.service_type}</td>
                    <td className="p-4 text-xs"><div>{b.preferred_date}</div><div className="text-muted-foreground">{b.preferred_time}</div></td>
                    <td className="p-4 text-xs">{b.vehicle_year} {b.vehicle_make} {b.vehicle_model}</td>
                    <td className="p-4 max-w-xs text-xs text-muted-foreground">{b.notes || "—"}</td>
                    <td className="p-4">
                      <select
                        value={b.status}
                        onChange={(e) => mutation.mutate({ id: b.id, status: e.target.value as any })}
                        className="border border-border bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-widest"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
