import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const VEHICLE_TYPES = ["Sedan", "SUV", "Truck", "Coupe", "Minivan", "Other"] as const;
const SERVICE_TYPES = [
  "Interior Detail",
  "Exterior Detail",
  "Full Detail",
  "Maintenance Wash",
  "Not Sure / Other",
] as const;

export default defineTool({
  name: "create_booking",
  title: "Create booking quote request",
  description:
    "Submit a new quote request / booking for Daily Detailers. Captures customer contact info, vehicle type, and requested service.",
  inputSchema: {
    name: z.string().min(1).max(120).describe("Customer full name."),
    email: z.string().email().max(255).describe("Customer email address."),
    phone: z.string().min(7).max(30).describe("Customer phone number."),
    vehicle_type: z.enum(VEHICLE_TYPES).describe("Type of vehicle."),
    service_type: z.enum(SERVICE_TYPES).describe("Service requested."),
    notes: z.string().max(1000).optional().describe("Any additional details from the customer."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  handler: async (input) => {
    const url = process.env.SUPABASE_URL;
    const serviceKey =
      process.env.APP_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      return {
        content: [{ type: "text", text: "Server not configured for bookings." }],
        isError: true,
      };
    }
    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("bookings")
      .insert({ ...input, notes: input.notes ?? "", user_id: null })
      .select("id")
      .single();
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Booking created (id: ${data.id})` }],
      structuredContent: { id: data.id },
    };
  },
});
