import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing | Daily Detailers" },
      { name: "description", content: "Transparent pricing and premium detailing packages — interior, exterior, and combo." },
      { property: "og:title", content: "Services & Pricing | Daily Detailers" },
      { property: "og:description", content: "Every package built to deliver a showroom result." },
    ],
  }),
  component: ServicesPage,
});

type Pkg = {
  slug: string;
  title: string;
  blurb: string;
  process: string[];
  pricing: { label: string; price: string }[];
  highlight?: string;
  highlightItems?: string[];
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
      { label: "Coupe", price: "$100" },
      { label: "Sedan / Hatchback", price: "$110" },
      { label: "Small SUV", price: "$115" },
      { label: "Truck", price: "$120" },
      { label: "Large SUV", price: "$130" },
    ],
  },
  {
    slug: "Full Detail",
    title: "Combo (Interior & Exterior)",
    blurb: "The complete transformation — every interior surface and exterior panel brought back to showroom standard. Our best value.",
    process: [
      "Everything in the Interior Package",
      "Everything in the Exterior Package",
      "Engine bay light wipe-down (on request)",
      "Final inspection and touch-up pass",
    ],
    pricing: [
      { label: "Coupe", price: "$175" },
      { label: "Sedan / Hatchback", price: "$200" },
      { label: "Small SUV", price: "$210" },
      { label: "Truck", price: "$225" },
      { label: "Large SUV", price: "$235" },
    ],
    highlight: "Includes FREE premium add-ons",
    highlightItems: ["Odor Removal", "Tire Shine", "Wax"],
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
                {pkg.slug === "Full Detail" ? <Flame className="size-5" /> : <Sparkles className="size-5" />}
              </span>
              <div className="min-w-0">
                <h2 className="text-2xl font-bold">{pkg.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{pkg.blurb}</p>
                {pkg.highlight && (
                  <div className="mt-4 flex flex-wrap items-center gap-3 rounded-none border border-primary/30 bg-primary/10 px-4 py-2.5">
                    <Flame className="size-4 shrink-0 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{pkg.highlight}</span>
                    <span className="hidden h-4 w-px bg-primary/30 sm:inline-block" />
                    <div className="flex flex-wrap gap-2">
                      {pkg.highlightItems?.map((item) => (
                        <span key={item} className="rounded-none bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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

