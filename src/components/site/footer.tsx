import { Link } from "@tanstack/react-router";
import { Instagram, Phone, MapPin } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/services", label: "Services & Pricing" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#0a0a0a] text-muted-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-foreground">
                DD
              </span>
              <span>
                <strong className="block text-sm tracking-tight text-foreground">
                  DAILY DETAILERS
                </strong>
                <small className="block font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                  Grand Rapids, MI
                </small>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-6 text-muted-foreground">
              Premium auto detailing in Grand Rapids. Making your car look brand
              new, every single day.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground">
              Navigation
            </p>
            <ul className="mt-6 space-y-3">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground">
              Contact
            </p>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="tel:6162801218"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="size-4 text-primary" />
                  <span>(616) 280-1218</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/daily_detailers_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Instagram className="size-4 text-primary" />
                  <span>@daily_detailers_</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                <span>Grand Rapids, MI</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row lg:px-8">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            © 2026 DAILY DETAILERS. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
}
