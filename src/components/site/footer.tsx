import { Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-border px-5 py-8 font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:flex-row lg:px-12">
      <span>© 2026 Daily Detailers</span>
      <a
        href="https://instagram.com/daily_detailers_"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:text-primary"
        aria-label="Daily Detailers on Instagram"
      >
        <Instagram className="size-3.5" /> @daily_detailers_
      </a>
      <span>
        Grand Rapids, Michigan ·{" "}
        <a href="tel:6162801218" className="hover:text-primary">(616) 280-1218</a>
      </span>
    </footer>
  );
}
