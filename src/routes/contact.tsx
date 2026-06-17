import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Instagram, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { BookingForm, SERVICES } from "@/components/site/booking-form";

const searchSchema = z.object({
  service: z.enum(SERVICES).optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Get a Quote | Daily Detailers" },
      { name: "description", content: "Request a quote for your auto detail in Grand Rapids — fast response, transparent pricing." },
      { property: "og:title", content: "Get a Quote | Daily Detailers" },
      { property: "og:description", content: "Fill out the form or give us a call. We'll get back to you with a quote." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { service } = Route.useSearch();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-20">
        <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Get in touch</p>
              <h1 className="mt-5 text-5xl font-extrabold tracking-[-0.035em] sm:text-6xl">Get a Quote</h1>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                Fill out the form or give us a call. We'll get back to you with a quote as soon as possible.
              </p>

              <div className="mt-10 border border-border bg-card p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Contact Info</p>
                <ul className="mt-6 space-y-5">
                  <ContactRow icon={<Phone className="size-4" />} label="Phone" value="(616) 280-1218" href="tel:6162801218" />
                  <ContactRow icon={<Instagram className="size-4" />} label="Instagram" value="@daily_detailers_" href="https://instagram.com/daily_detailers_" />
                  <ContactRow icon={<MapPin className="size-4" />} label="Service Area" value="Grand Rapids, MI" />
                </ul>
              </div>

              <div className="mt-6 border border-border bg-card p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Quick Call</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Prefer to talk? Give us a call and we'll give you a quote right over the phone.
                </p>
                <Button asChild variant="luxuryOutline" className="mt-5 w-full justify-center">
                  <a href="tel:6162801218"><Phone className="size-4" /> Call (616) 280-1218</a>
                </Button>
              </div>
            </div>

            <div>
              <BookingForm defaultService={service} />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-4">
      <span className="grid size-9 shrink-0 place-items-center border border-border text-primary">{icon}</span>
      <span className="min-w-0">
        <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
        <span className="mt-1 block truncate font-semibold">{value}</span>
      </span>
    </div>
  );
  return <li>{href ? <a href={href} className="hover:text-primary">{content}</a> : content}</li>;
}
