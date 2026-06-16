import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Instagram, MapPin, Menu, Phone, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { createBooking } from "@/lib/bookings.functions";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Auto Detailing | Daily Detailers" },
      { name: "description", content: "Fast, reliable, high-quality auto detailing in Grand Rapids, MI. Book your detail online with Daily Detailers." },
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

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Daily Detailers home">
            <span className="grid size-9 place-items-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-foreground">DD</span>
            <span><strong className="block text-sm tracking-tight">DAILY DETAILERS</strong><small className="block font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">Grand Rapids, MI</small></span>
          </Link>
          <nav className="hidden items-center gap-9 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:flex">
            <a className="text-primary" href="#home">Home</a><a className="hover:text-primary" href="#gallery">Gallery</a><a className="hover:text-primary" href="#services">Services</a><a className="hover:text-primary" href="#reviews">Reviews</a><a className="hover:text-primary" href="#book">Book</a>
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <a href="tel:6162801218" className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted-foreground"><Phone className="size-3" /> (616) 280-1218</a>
            {user ? (
              <button onClick={handleSignOut} className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">Sign out</button>
            ) : (
              <Link to="/auth" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">Sign in</Link>
            )}
            <Button asChild variant="luxury" size="luxury"><a href="#book">Book now</a></Button>
          </div>
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
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild variant="luxury" size="luxury"><a href="#book">Book now <ArrowRight /></a></Button><Button asChild variant="luxuryOutline" size="luxury"><a href="tel:6162801218"><Phone /> Call now</a></Button></div>
          </div>
          <div className="mt-16 flex gap-10 reveal-up reveal-delay sm:gap-16">
            {[['50+','Cars detailed'],['5★','Avg. rating'],['99%','Satisfaction']].map(([n,l]) => <div key={l}><strong className="text-2xl">{n}</strong><span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{l}</span></div>)}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeading eyebrow="What we do" title="Our Services" />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-3">{services.map((service) => <article key={service.title} className="group bg-background"><div className="relative aspect-[4/3] overflow-hidden"><img src={service.image} alt={`${service.title} by Daily Detailers`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />{service.best && <span className="absolute right-4 top-4 bg-primary px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-primary-foreground">Best value</span>}</div><div className="p-7"><h3 className="text-xl font-bold">{service.title}</h3><p className="mt-3 min-h-18 text-sm leading-6 text-muted-foreground">{service.text}</p><a href="#book" className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">Book this <ArrowRight className="size-3" /></a></div></article>)}</div>
      </section>

      <section id="gallery" className="border-y border-border bg-card py-24 lg:py-32"><div className="mx-auto max-w-6xl px-5 lg:px-8"><div className="flex items-end justify-between"><SectionHeading eyebrow="Real results" title="Before & After" /><Button asChild variant="luxuryOutline" className="hidden sm:inline-flex"><a href="https://instagram.com/daily_detailers_">View gallery</a></Button></div><div className="mt-12 grid gap-4 md:grid-cols-2"><figure className="relative overflow-hidden"><img src="/images/before.png" alt="Vehicle interior before detailing" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" /><figcaption className="absolute bottom-4 left-4 bg-background px-4 py-2 font-mono text-[10px] uppercase tracking-widest">Before</figcaption></figure><figure className="relative overflow-hidden"><img src="/images/after.png" alt="Vehicle interior after detailing" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" /><figcaption className="absolute bottom-4 left-4 bg-primary px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">After</figcaption></figure></div></div></section>

      <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32"><SectionHeading eyebrow="The difference" title="Why Choose Daily Detailers" /><div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">{[['Fast Turnaround','Quick, efficient service without cutting corners.'],['Premium Products','Professional-grade products for lasting results.'],['Experienced Team','Skilled detailers with a passion for perfection.'],['Reliable Service','Consistent quality you can count on every time.'],['99% Satisfaction','We stand behind every detail and every result.'],['Attention to Detail','Every inch gets the precision treatment it deserves.']].map(([t,d]) => <div key={t} className="border-b border-r border-border p-8"><Check className="mb-6 size-5 text-primary" /><h3 className="font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p></div>)}</div></section>

      <section id="reviews" className="border-y border-border bg-card py-24 lg:py-32"><div className="mx-auto max-w-6xl px-5 lg:px-8"><SectionHeading eyebrow="Testimonials" title="What Our Clients Say" /><div className="mt-12 grid gap-px bg-border md:grid-cols-2">{[["Great experience, good kids. Fast, reliable, and hardworking. Highly recommend them if you want fast and high-quality cleaning!",'Mia Africa'],["They do a great job and get it done quick!",'Esand']].map(([q,a]) => <blockquote key={a} className="bg-card p-8 lg:p-12"><div className="flex gap-1 text-primary">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-4 fill-current" />)}</div><p className="mt-7 text-xl font-medium leading-8">“{q}”</p><footer className="mt-7 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">— {a}</footer></blockquote>)}</div></div></section>

      <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-5"><SectionHeading eyebrow="Follow our work" title="@daily_detailers_" /><a href="https://instagram.com/daily_detailers_" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary"><Instagram className="size-4" /> Follow on Instagram</a></div><div className="mt-12 grid grid-cols-2 gap-4"><img src="/images/instagram-truck.png" alt="Detailed black RAM truck" loading="lazy" className="aspect-square w-full object-cover" /><img src="/images/instagram-wash.jpg" alt="GMC truck receiving foam wash" loading="lazy" className="aspect-square w-full object-cover" /></div></section>

      <BookSection user={user} />

      <footer className="flex flex-col items-center justify-between gap-4 border-t border-border px-5 py-8 font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:flex-row lg:px-12"><span>© 2026 Daily Detailers</span><span>Grand Rapids, Michigan · <a href="tel:6162801218" className="hover:text-primary">(616) 280-1218</a></span></footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{eyebrow}</p><h2 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">{title}</h2></div>;
}

function BookSection({ user }: { user: User | null }) {
  return (
    <section id="book" className="border-t border-border bg-background px-5 py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Get in touch</p>
          <h2 className="mt-5 text-5xl font-extrabold tracking-[-0.035em] sm:text-6xl">Get a Quote</h2>
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
          {user ? <BookingForm /> : <SignInPrompt />}
        </div>
      </div>
    </section>
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

function SignInPrompt() {
  return (
    <div className="border border-border bg-card p-8 text-center lg:p-12">
      <h3 className="text-2xl font-bold">Sign in to request a quote</h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Create a free account so we can keep track of your requests and reach you when we have a quote.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild variant="luxury" size="luxury"><Link to="/auth">Sign in <ArrowRight /></Link></Button>
        <Button asChild variant="luxuryOutline" size="luxury"><a href="tel:6162801218"><Phone /> Call us instead</a></Button>
      </div>
    </div>
  );
}

const VEHICLE_TYPES = ["Sedan", "SUV", "Truck", "Coupe", "Minivan", "Other"] as const;
const SERVICES = [
  "Interior Detail",
  "Exterior Detail",
  "Full Detail",
  "Maintenance Wash",
  "Not Sure / Other",
] as const;

function BookingForm() {
  const submit = useServerFn(createBooking);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle_type: "" as (typeof VEHICLE_TYPES)[number] | "",
    service_type: "" as (typeof SERVICES)[number] | "",
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
      setForm({ name: "", phone: "", email: "", vehicle_type: "", service_type: "", notes: "" });
    } catch (err: any) {
      toast.error(err.message ?? "Could not submit request");
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
