import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/lib/bookings.functions";
import { toast } from "sonner";

export const VEHICLE_TYPES = ["Sedan", "SUV", "Truck", "Coupe", "Minivan", "Other"] as const;
export const SERVICES = [
  "Interior Detail",
  "Exterior Detail",
  "Full Detail",
  "Maintenance Wash",
  "Not Sure / Other",
] as const;

export function BookingForm({ defaultService }: { defaultService?: (typeof SERVICES)[number] }) {
  const submit = useServerFn(createBooking);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle_type: "" as (typeof VEHICLE_TYPES)[number] | "",
    service_type: (defaultService ?? "") as (typeof SERVICES)[number] | "",
    notes: "",
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicle_type || !form.service_type) {
      toast.error("Please select a vehicle type and service.");
      return;
    }
    setLoading(true);
    try {
      await submit({ data: { ...form, vehicle_type: form.vehicle_type, service_type: form.service_type } });
      toast.success("Quote request received! We'll be in touch shortly.");
      setForm({ name: "", phone: "", email: "", vehicle_type: "", service_type: (defaultService ?? "") as any, notes: "" });
    } catch (err: any) {
      toast.error(err?.message ?? "Could not submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 border border-border bg-card p-8 lg:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your Name">
          <Input required maxLength={120} placeholder="John Doe" value={form.name} onChange={set("name")} className="h-12 rounded-none border-border bg-background" />
        </Field>
        <Field label="Phone Number">
          <Input required maxLength={30} placeholder="(616) 555-0123" value={form.phone} onChange={set("phone")} className="h-12 rounded-none border-border bg-background" />
        </Field>
      </div>
      <Field label="Email Address">
        <Input required type="email" maxLength={255} placeholder="john@example.com" value={form.email} onChange={set("email")} className="h-12 rounded-none border-border bg-background" />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Vehicle Type">
          <SelectBox required value={form.vehicle_type} onChange={set("vehicle_type")} placeholder="Select vehicle type" options={VEHICLE_TYPES} />
        </Field>
        <Field label="Service Needed">
          <SelectBox required value={form.service_type} onChange={set("service_type")} placeholder="Select a service" options={SERVICES} />
        </Field>
      </div>
      <Field label="Additional Details">
        <Textarea
          maxLength={1000}
          rows={4}
          value={form.notes}
          onChange={set("notes")}
          placeholder="Tell us about your vehicle and what you need..."
          className="rounded-none border-border bg-background"
        />
      </Field>
      <Button type="submit" disabled={loading} variant="luxury" size="luxury" className="w-full justify-center sm:w-auto sm:self-start">
        {loading ? "Submitting..." : "Submit Quote Request"} <Send className="size-4" />
      </Button>
    </form>
  );
}

function SelectBox({
  value, onChange, options, placeholder, required,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <select
        required={required}
        value={value}
        onChange={onChange}
        className="h-12 w-full appearance-none border border-border bg-background px-3 pr-9 text-sm text-foreground focus:border-primary focus:outline-none"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path d="M5.25 7.5L10 12.25 14.75 7.5z" /></svg>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
