import { Reveal } from "./reveal";

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <Reveal>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">{title}</h2>
      {description && (
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{description}</p>
      )}
    </Reveal>
  );
}
