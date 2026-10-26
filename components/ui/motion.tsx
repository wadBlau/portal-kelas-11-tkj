"use client";

import { useEffect, useRef, useState } from "react";

/** Number that counts up once on mount. Respects reduced motion. */
export function CountUp({
  to,
  duration = 700,
  className,
  style,
}: {
  to: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.textContent = String(to);
      return;
    }

    const animation = el.animate(
      [
        { transform: "scale(0.95)", opacity: 0 },
        { transform: "scale(1)", opacity: 1 },
      ],
      {
        duration: 120,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        fill: "both",
      }
    );

    // Count up using WAAPI on a separate timed value, off the React render loop
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      animation.cancel();
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {to}
    </span>
  );
}

/** Live clock, updates every 30 seconds. */
export function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--.--"}
    </span>
  );
}
