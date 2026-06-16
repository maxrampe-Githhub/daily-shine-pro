import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing | Daily Detailers" },
      { name: "description", content: "Transparent pricing and premium detailing packages — interior, exterior, full detail, and maintenance wash." },
      { property: "og:title", content: "Services & Pricing | Daily Detailers" },
      { property: "og:description", content: "Every package built to deliver a showroom result." },
    ],
  }),
  component: ServicesPage,
});

type Pkg = {
  slug: "Interior Detail" | "Exterior Detail" | "Full Detail" | "Maintenance Wash";
  title: string;
  blurb: string;
  process: string[];
  pricing: { label: string; price: string }[];
};

const PACKAGES: Pkg[] = [
  {
    slug: "Interior Detail",
    title: "Interior Package",
    blurb: "A thorough, therapeutic deep clean of every inch of your interior — sanitized, conditioned, and refreshed.",
    process: [
      "Deep vacuuming of seats, carpets, floor mats, and trunk areas",
      "Therapeutic steam cleaning to sanitize and lift embedded dirt",
      "Full intensive wipe down of dashboard, center console, and steering wheel",
      "Detailed cleaning of pedals, footwells, crevices, and cup holders / bottle compartments",
      "Streak-free cleaning of all interior windows and mirrors",
      "Conditioning of leather, vinyl, and plastics for UV protection",
    ],
    pricing: [
      { label: "Coupe", price: "$120" },
      { label: "Sedan / Hatchback", price: "$130" },
      { label: "Small SUV", price: "$135" },
      { label: "Truck", price: "$140" },
      { label: "Large SUV", price: "$155" },
    ],
  },
  {
    slug: "Exterior Detail",
    title: "Exterior Package",
    blurb: "A meticulous hand wash, decontamination, and sealant treatment that brings your paint back to a deep, mirror-like shine.",
    process: [
      "Pre-rinse and foam soak to safely lift surface dirt",
      "Hand wash with the two-bucket method and pH-balanced soap",
      "Wheel, tire, and wheel well deep clean",
      "Clay bar decontamination to remove embedded contaminants",
      "Spray sealant for lasting gloss and protection",
      "Tire dressing and trim restoration",
    ],
    pricing: [
      { label: "Coupe", price: "$90" },
      { label: "Sedan / Hatchback", price: "$100" },
      { label: "Small SUV", price: "$110" },
      { label: "Truck", price: "$120" },
      { label: "Large SUV", price: "$130" },
    ],
  },
  {
    slug: "Full Detail",
    title: "Full Detail Package",
    blurb: "The complete transformation — every interior surface and exterior panel brought back to showroom standard. Our best value.",
    process: [
      "Everything in the Interior Package",
      "Everything in the Exterior Package",
      "Engine bay light wipe-down (on request)",
      "Final inspection and touch-up pass",
    ],
    pricing: [
      { label: "Coupe", price: "$200" },
      { label: "Sedan / Hatchback", price: "$220" },
      { label: "Small SUV", price: "$235" },
      { label: "Truck", price: "$250" },
      { label: "Large SUV", price: "$275" },
    ],
  },
  {
    slug: "Maintenance Wash",
    title: "Maintenance Wash",
    blurb: "A quick refresh between full details to keep your vehicle clean week after week.",
    process: [
      "Exterior hand wash and rinse",
      "Wheel and tire clean",
      "Quick interior vacuum",
      "Window cleaning inside and out",
    ],
    pricing: [
      { label: "Any vehicle", price: "from $60" },
    ],
  },
];

function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative pt-20">
        <div className="absolute inset-0">
          <img src="/images/hero.jpg" alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">Services & Pricing</p>
          <h1 className="mt-6 text-5xl font-extrabold tracking-[-0.045em] sm:text-6xl lg:text-7xl">The Spec Sheet</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Transparent pricing. Premium process. Every package built to deliver a showroom result.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-5 pb-24 lg:px-8 lg:pb-32">
        {PACKAGES.map((pkg) => (
          <article key={pkg.slug} className="border border-border bg-card">
            <header className="flex items-start gap-5 border-b border-border p-7 lg:p-10">
              <span className="grid size-12 shrink-0 place-items-center border border-border bg-background text-primary">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h2 className="text-2xl font-bold">{pkg.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{pkg.blurb}</p>
              </div>
            </header>
            <div className="grid gap-px bg-border lg:grid-cols-[1.4fr_1fr]">
              <div className="bg-card p-7 lg:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Our process</p>
                <ul className="mt-5 space-y-4">
                  {pkg.process.map((step) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <Check className="mt-1 size-4 shrink-0 text-primary" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card p-7 lg:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Pricing by vehicle</p>
                <ul className="mt-5 divide-y divide-border">
                  {pkg.pricing.map((p) => (
                    <li key={p.label} className="flex items-center justify-between py-4">
                      <span className="text-sm text-muted-foreground">{p.label}</span>
                      <span className="text-lg font-bold">{p.price}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="luxury" className="mt-6 w-full justify-center">
                  <Link to="/contact" search={{ service: pkg.slug } as never}>
                    Book this service <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
