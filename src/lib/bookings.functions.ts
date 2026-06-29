import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const bookingInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  vehicle_type: z.enum(["Sedan", "SUV", "Truck", "Coupe", "Minivan", "Other"]),
  service_type: z.enum([
    "Interior Detail",
    "Exterior Detail",
    "Full Detail",
    "Maintenance Wash",
    "Not Sure / Other",
  ]),
  notes: z.string().trim().max(1000).optional().default(""),
});

const NOTIFY_TO = "dailydetailers123@gmail.com";

async function sendNotificationEmail(booking: z.infer<typeof bookingInput>, id: string) {
  const apiKey = process.env.LOVABLE_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  console.log("[sendNotificationEmail] keys present", { lovable: !!apiKey, resend: !!resendKey });
  if (!apiKey || !resendKey) {
    console.warn("[sendNotificationEmail] Email keys missing; skipping notification");
    return;
  }
  const html = `
    <h2>New Quote Request</h2>
    <p><strong>Customer:</strong> ${booking.name}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Vehicle Type:</strong> ${booking.vehicle_type}</p>
    <p><strong>Service Needed:</strong> ${booking.service_type}</p>
    ${booking.notes ? `<p><strong>Additional Details:</strong> ${booking.notes}</p>` : ""}
    <p style="color:#888;font-size:12px;">Booking ID: ${id}</p>
  `;
  try {
    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({
        from: "Daily Detailers <onboarding@resend.dev>",
        to: [NOTIFY_TO],
        reply_to: booking.email,
        subject: `New booking: ${booking.name} — ${booking.service_type}`,
        html,
      }),
    });
    const txt = await res.text();
    if (!res.ok) {
      console.error("[sendNotificationEmail] Resend send failed", res.status, txt);
    } else {
      console.log("[sendNotificationEmail] Resend send ok", res.status, txt);
    }
  } catch (err) {
    console.error("[sendNotificationEmail] Resend send error", err);
  }
}

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingInput.parse(d))
  .handler(async ({ data }) => {
    console.log("[createBooking] received", { name: data.name, email: data.email, service: data.service_type });
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("bookings")
      .insert({ ...data, user_id: null })
      .select("id")
      .single();
    if (error) {
      console.error("[createBooking] insert failed", error);
      throw new Error(error.message);
    }
    console.log("[createBooking] inserted", row.id);
    await sendNotificationEmail(data, row.id);
    return { id: row.id };
  });

export const listAllBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { bookings: data ?? [] };
  });

export const updateBookingStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      id: z.string().uuid(),
      status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await supabase
      .from("bookings")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId, claims } = context;
    const email = (claims as any)?.email?.toLowerCase();
    if (email !== "maxrampe@gmail.com") {
      throw new Error("Not authorized");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
