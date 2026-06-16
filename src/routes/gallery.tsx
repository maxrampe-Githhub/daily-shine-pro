import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Daily Detailers" },
      { name: "description", content: "Browse our portfolio of detailing transformations — interiors, exteriors, foam washes, and before & afters." },
      { property: "og:title", content: "Gallery | Daily Detailers" },
      { property: "og:description", content: "Real vehicles. Real transformations." },
    ],
  }),
  component: GalleryPage,
});

type Category = "All" | "Exterior" | "Interior" | "Foam Wash" | "Before & After";

const ITEMS: { src: string; alt: string; category: Exclude<Category, "All"> }[] = [
  { src: "/images/instagram-truck.png", alt: "Detailed black RAM truck", category: "Exterior" },
  { src: "/images/exterior.jpg", alt: "Polished exterior of a sports car", category: "Exterior" },
  { src: "/images/interior.png", alt: "Detailed Porsche interior with steering wheel", category: "Interior" },
  { src: "/images/before.png", alt: "Vehicle interior before detailing", category: "Before & After" },
  { src: "/images/after.png", alt: "Vehicle interior after detailing", category: "Before & After" },
  { src: "/images/full.jpg", alt: "Full detail result on a luxury vehicle", category: "Interior" },
  { src: "/images/instagram-wash.jpg", alt: "GMC truck receiving foam wash", category: "Foam Wash" },
  { src: "/images/hero.jpg", alt: "Premium detail final result", category: "Exterior" },
];

const CATEGORIES: Category[] = ["All", "Exterior", "Interior", "Foam Wash", "Before & After"];

function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const items = active === "All" ? ITEMS : ITEMS.filter((i) => i.category === active);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-20">
        <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">Our work</p>
          <h1 className="mt-6 text-5xl font-extrabold tracking-[-0.045em] sm:text-6xl lg:text-7xl">Gallery</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Browse our portfolio of transformations. Every vehicle gets the premium treatment.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
                  active === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <figure key={item.src + item.alt} className="group relative overflow-hidden border border-border bg-card">
                <img src={item.src} alt={item.alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute bottom-3 left-3 bg-background/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest">
                  {item.category}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-10">
            <p className="text-sm text-muted-foreground">Want your vehicle to be our next transformation?</p>
            <Button asChild variant="luxury" size="luxury">
              <Link to="/contact">Get a quote <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
