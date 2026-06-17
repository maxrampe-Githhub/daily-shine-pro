export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-border px-5 py-8 font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:flex-row lg:px-12">
      <span>© 2026 Daily Detailers</span>
      <span>
        Grand Rapids, Michigan ·{" "}
        <a href="tel:6162801218" className="hover:text-primary">(616) 280-1218</a>
      </span>
    </footer>
  );
}
