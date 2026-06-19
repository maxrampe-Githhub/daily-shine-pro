import { useEffect, useRef, useState, type ReactNode, type ElementType, type CSSProperties } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}

export function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = { transitionDelay: shown ? `${delay}ms` : "0ms" };

  return (
    <Tag
      ref={ref as never}
      style={style}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
