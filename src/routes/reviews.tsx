import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Clock, Quote, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews | Daily Detailers" },
      { name: "description", content: "Real reviews from real customers — see what people say about Daily Detailers in Grand Rapids." },
      { property: "og:title", content: "Customer Reviews | Daily Detailers" },
      { property: "og:description", content: "Our reputation speaks for itself." },
    ],
  }),
  component: ReviewsPage,
});

const REVIEWS = [
  {
    quote:
      "Great experience good kids. Fast, Reliable, and Hardworking. Highly Recommend them if you want fast and high quality cleaning!!",
    author: "Mia Africa",
    service: "Full Detail",
  },
  {
    quote: "They do a great job and get it done quick!",
    author: "Esand",
    service: "Exterior Detail",
  },
];

const TRUST = [
  { icon: ShieldCheck, label: "99% Satisfaction Guaranteed" },
  { icon: Clock, label: "Fast & Reliable Service" },
  { icon: Award, label: "Professional Grade Products" },
];

function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-20">
        <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">Customer reviews</p>
          <h1 className="mt-6 text-5xl font-extrabold tracking-[-0.045em] sm:text-6xl lg:text-7xl">What People Say</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Real reviews from real customers. Our reputation speaks for itself.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <strong className="text-5xl font-extrabold">5.0</strong>
            <div className="flex gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-5 fill-current" />)}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Based on {REVIEWS.length} reviews</span>
          </div>

          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-center gap-4 bg-card p-6">
                <span className="grid size-10 place-items-center border border-border text-primary"><t.icon className="size-4" /></span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{t.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <blockquote key={r.author} className="border border-border bg-card p-8 lg:p-10">
                <Quote className="size-6 text-muted-foreground" />
                <div className="mt-6 flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                </div>
                <p className="mt-6 text-lg font-medium leading-8">“{r.quote}”</p>
                <footer className="mt-7 flex items-center justify-between border-t border-border pt-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>— {r.author}</span>
                  <span>{r.service}</span>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-10">
            <p className="text-sm text-muted-foreground">Ready to experience the difference?</p>
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
