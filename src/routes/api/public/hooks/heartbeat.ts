import { createFileRoute } from "@tanstack/react-router";

// Daily heartbeat: performs a real database query to keep the project active.
export const Route = createFileRoute("/api/public/hooks/heartbeat")({
  server: {
    handlers: {
      GET: async () => handle(),
      POST: async () => handle(),
    },
  },
});

async function handle() {
  const startedAt = Date.now();
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error } = await supabaseAdmin
      .from("bookings")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("[heartbeat] query failed", {
        message: error.message,
        details: (error as any).details,
        hint: (error as any).hint,
        code: (error as any).code,
      });
      return Response.json(
        { ok: false, error: error.message || "query failed", code: (error as any).code ?? null },
        { status: 500 },
      );
    }

    const payload = {
      ok: true,
      pinged_at: new Date().toISOString(),
      bookings_count: count ?? 0,
      duration_ms: Date.now() - startedAt,
    };
    console.log("[heartbeat] ok", payload);
    return Response.json(payload, {
      headers: { "cache-control": "no-store" },
    });
  } catch (err: any) {
    console.error("[heartbeat] failed", err?.message ?? err);
    return Response.json(
      { ok: false, error: err?.message || String(err) || "unknown" },
      { status: 500 },
    );
  }
}
