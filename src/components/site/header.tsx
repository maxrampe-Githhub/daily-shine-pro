import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setUser(session?.user ?? null),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Daily Detailers home">
          <span className="grid size-9 place-items-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-foreground">DD</span>
          <span>
            <strong className="block text-sm tracking-tight">DAILY DETAILERS</strong>
            <small className="block font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">Grand Rapids, MI</small>
          </span>
        </Link>
        <nav className="hidden items-center gap-9 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <a href="tel:6162801218" className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted-foreground hover:text-primary">
            <Phone className="size-3" /> (616) 280-1218
          </a>
          {user ? (
            <button onClick={handleSignOut} className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">Sign out</button>
          ) : (
            <Link to="/auth" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">Sign in</Link>
          )}
          <Button asChild variant="luxury" size="luxury"><Link to="/contact">Get a quote</Link></Button>
        </div>
        <button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-none border border-transparent px-3 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:border-border hover:text-primary"
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-primary border-border" }}
              >
                {n.label}
              </Link>
            ))}
            <Button asChild variant="luxury" className="mt-3 justify-center">
              <Link to="/contact" onClick={() => setOpen(false)}>Get a quote</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
