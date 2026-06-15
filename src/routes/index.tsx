import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Instagram, Menu, Phone, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Auto Detailing | Daily Detailers" },
      { name: "description", content: "Fast, reliable, high-quality auto detailing in Grand Rapids, MI. Get a free quote from Daily Detailers today." },
      { property: "og:title", content: "Premium Auto Detailing | Daily Detailers" },
      { property: "og:description", content: "Precision detailing that makes your car look brand new." },
    ],
  }),
  component: Index,
});

function Index() {
  const services = [
    { title: "Interior Detail", image: "/images/interior.png", text: "Deep cleaning of every interior surface, carpet, seat, and dashboard. Leave your cabin spotless." },
    { title: "Exterior Detail", image: "/images/exterior.jpg", text: "Full exterior wash, clay bar, polish, and sealant to restore your paint to showroom condition." },
    { title: "Full Detail", image: "/images/full.jpg", text: "The complete package — inside and out. Our best-value, comprehensive vehicle transformation.", best: true },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Daily Detailers home">
            <span className="grid size-9 place-items-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-foreground">DD</span>
            <span><strong className="block text-sm tracking-tight">DAILY DETAILERS</strong><small className="block font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">Grand Rapids, MI</small></span>
          </Link>
          <nav className="hidden items-center gap-9 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:flex">
            <a className="text-primary" href="#home">Home</a><a className="hover:text-primary" href="#gallery">Gallery</a><a className="hover:text-primary" href="#services">Services</a><a className="hover:text-primary" href="#reviews">Reviews</a><a className="hover:text-primary" href="#contact">Contact</a>
          </nav>
          <div className="hidden items-center gap-5 lg:flex"><a href="tel:6162801218" className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted-foreground"><Phone className="size-3" /> (616) 280-1218</a><Button asChild variant="luxury" size="luxury"><a href="#contact">Get a quote</a></Button></div>
          <Menu className="size-6 md:hidden" aria-label="Menu" />
        </div>
      </header>

      <section id="home" className="relative flex min-h-[760px] items-center pt-20 lg:min-h-screen">
        <img src="/images/hero.jpg" alt="Luxury Porsche interior after premium detailing" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-24 lg:px-8">
          <div className="max-w-3xl reveal-up">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-primary">Premium auto detailing — Grand Rapids, MI</p>
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Premium Auto Detailing That Makes Your Car Look <span className="text-primary">Brand New</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Fast, reliable, high-quality detailing in Grand Rapids. We transform every vehicle with precision and care.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild variant="luxury" size="luxury"><a href="#contact">Get a quote <ArrowRight /></a></Button><Button asChild variant="luxuryOutline" size="luxury"><a href="tel:6162801218"><Phone /> Call now</a></Button></div>
          </div>
          <div className="mt-16 flex gap-10 reveal-up reveal-delay sm:gap-16">
            {[['50+','Cars detailed'],['5★','Avg. rating'],['99%','Satisfaction']].map(([n,l]) => <div key={l}><strong className="text-2xl">{n}</strong><span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{l}</span></div>)}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeading eyebrow="What we do" title="Our Services" />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-3">{services.map((service) => <article key={service.title} className="group bg-background"><div className="relative aspect-[4/3] overflow-hidden"><img src={service.image} alt={`${service.title} by Daily Detailers`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />{service.best && <span className="absolute right-4 top-4 bg-primary px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-primary-foreground">Best value</span>}</div><div className="p-7"><h3 className="text-xl font-bold">{service.title}</h3><p className="mt-3 min-h-18 text-sm leading-6 text-muted-foreground">{service.text}</p><a href="#contact" className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">Learn more <ArrowRight className="size-3" /></a></div></article>)}</div>
      </section>

      <section id="gallery" className="border-y border-border bg-card py-24 lg:py-32"><div className="mx-auto max-w-6xl px-5 lg:px-8"><div className="flex items-end justify-between"><SectionHeading eyebrow="Real results" title="Before & After" /><Button asChild variant="luxuryOutline" className="hidden sm:inline-flex"><a href="https://instagram.com/daily_detailers_">View gallery</a></Button></div><div className="mt-12 grid gap-4 md:grid-cols-2"><figure className="relative overflow-hidden"><img src="/images/before.png" alt="Vehicle interior before detailing" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" /><figcaption className="absolute bottom-4 left-4 bg-background px-4 py-2 font-mono text-[10px] uppercase tracking-widest">Before</figcaption></figure><figure className="relative overflow-hidden"><img src="/images/after.png" alt="Vehicle interior after detailing" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" /><figcaption className="absolute bottom-4 left-4 bg-primary px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">After</figcaption></figure></div></div></section>

      <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32"><SectionHeading eyebrow="The difference" title="Why Choose Daily Detailers" /><div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">{[['Fast Turnaround','Quick, efficient service without cutting corners.'],['Premium Products','Professional-grade products for lasting results.'],['Experienced Team','Skilled detailers with a passion for perfection.'],['Reliable Service','Consistent quality you can count on every time.'],['99% Satisfaction','We stand behind every detail and every result.'],['Attention to Detail','Every inch gets the precision treatment it deserves.']].map(([t,d]) => <div key={t} className="border-b border-r border-border p-8"><Check className="mb-6 size-5 text-primary" /><h3 className="font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p></div>)}</div></section>

      <section id="reviews" className="border-y border-border bg-card py-24 lg:py-32"><div className="mx-auto max-w-6xl px-5 lg:px-8"><SectionHeading eyebrow="Testimonials" title="What Our Clients Say" /><div className="mt-12 grid gap-px bg-border md:grid-cols-2">{[["Great experience, good kids. Fast, reliable, and hardworking. Highly recommend them if you want fast and high-quality cleaning!",'Mia Africa'],["They do a great job and get it done quick!",'Esand']].map(([q,a]) => <blockquote key={a} className="bg-card p-8 lg:p-12"><div className="flex gap-1 text-primary">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-4 fill-current" />)}</div><p className="mt-7 text-xl font-medium leading-8">“{q}”</p><footer className="mt-7 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">— {a}</footer></blockquote>)}</div></div></section>

      <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-5"><SectionHeading eyebrow="Follow our work" title="@daily_detailers_" /><a href="https://instagram.com/daily_detailers_" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary"><Instagram className="size-4" /> Follow on Instagram</a></div><div className="mt-12 grid grid-cols-2 gap-4"><img src="/images/instagram-truck.png" alt="Detailed black RAM truck" loading="lazy" className="aspect-square w-full object-cover" /><img src="/images/instagram-wash.jpg" alt="GMC truck receiving foam wash" loading="lazy" className="aspect-square w-full object-cover" /></div></section>

      <section id="contact" className="relative border-t border-border bg-primary px-5 py-24 text-primary-foreground"><Sparkles className="absolute right-[10%] top-12 size-12 opacity-20" /><div className="mx-auto max-w-3xl text-center"><p className="font-mono text-[10px] uppercase tracking-[0.3em]">Ready to transform your vehicle?</p><h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">Let’s Make Your Car Look Brand New</h2><p className="mx-auto mt-5 max-w-xl opacity-70">Get a free quote today. We’ll have your vehicle looking showroom-ready in no time.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Button asChild variant="luxury" size="luxury" className="bg-background text-foreground hover:bg-card"><a href="mailto:hello@dailydetailers.com">Get a quote <ArrowRight /></a></Button><Button asChild variant="luxuryOutline" size="luxury" className="border-primary-foreground/40 text-primary-foreground hover:border-primary-foreground hover:text-primary-foreground"><a href="tel:6162801218">(616) 280-1218</a></Button></div></div></section>
      <footer className="flex flex-col items-center justify-between gap-4 border-t border-border px-5 py-8 font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:flex-row lg:px-12"><span>© 2026 Daily Detailers</span><span>Grand Rapids, Michigan</span></footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{eyebrow}</p><h2 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">{title}</h2></div>;
}
