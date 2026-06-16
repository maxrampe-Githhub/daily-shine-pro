import { createFileRoute } from "@tanstack/react-router";

// Daily heartbeat: pings the database to keep the project warm.
export const Route = createFileRoute("/api/public/hooks/heartbeat")({
  server: {
    handlers: {
      GET: async () => handle(),
      POST: async () => handle(),
    },
  },
});

async function handle() {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error } = await supabaseAdmin
      .from("bookings")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return Response.json({
      ok: true,
      pinged_at: new Date().toISOString(),
      bookings_count: count ?? 0,
    });
  } catch (err: any) {
    console.error("Heartbeat failed", err);
    return Response.json({ ok: false, error: err?.message ?? "unknown" }, { status: 500 });
  }
}
