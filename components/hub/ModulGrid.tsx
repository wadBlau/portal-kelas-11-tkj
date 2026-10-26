import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Calendar,
  ClipboardCheck,
  Lock,
  Users,
  Wallet,
} from "lucide-react";
import clsx from "clsx";
import type { Modul } from "@/types";
import { STATUS_LABELS } from "@/lib/navigation";
import Reveal from "@/components/ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  kas: Wallet,
  piket: ClipboardCheck,
  ekskul: Users,
  jadwal: Calendar,
};

const TINT: Record<string, { bg: string; ink: string }> = {
  piket: { bg: "#ffffff", ink: "#1b1c19" },
  ekskul: { bg: "#1b1c19", ink: "#ffffff" },
  jadwal: { bg: "#ffffff", ink: "#1b1c19" },
};

const FALLBACK = { bg: "#ffffff", ink: "#1b1c19" };

function KasBanner({ modul }: { modul: Modul }) {
  const live = modul.status === "online";

  return (
    <div className="kas">
      <div className="kas-copy">
        <h2>{modul.label}</h2>
        <p>
          {modul.desc}
          {live ? "." : ". Tautannya menyusul."}
        </p>
        <div className="kas-meta">
          {modul.badge && <span className="tag tag-light">{modul.badge}</span>}
          <span className="tag tag-light">
            {live ? "Online" : STATUS_LABELS[modul.status]}
          </span>
        </div>
      </div>
      <div className="kas-art" aria-hidden="true">
        <span className="kas-door" />
      </div>
    </div>
  );
}

function Door({ modul }: { modul: Modul }) {
  const live = modul.status === "online";
  const tint = TINT[modul.id] ?? FALLBACK;
  const Icon = ICONS[modul.id] ?? Wallet;

  const body = (
    <>
      <div className="door-top">
        <span className="door-icon">
          <Icon size={20} strokeWidth={1.8} aria-hidden />
        </span>
        {modul.badge && <span className="tag">{modul.badge}</span>}
      </div>
      <h3>{modul.label}</h3>
      <p>{modul.desc}</p>
      <div className="door-foot">
        <span className="door-state">
          <span className="door-state-dot" aria-hidden />
          {live ? "Online" : STATUS_LABELS[modul.status]}
        </span>
        {live ? (
          <ArrowUpRight className="door-go" size={16} aria-hidden />
        ) : (
          <Lock className="door-go" size={14} aria-hidden />
        )}
      </div>
    </>
  );

  const style = {
    "--door-bg": tint.bg,
    "--door-ink": tint.ink,
  } as CSSProperties;

  if (live) {
    return (
      <a
        href={modul.url}
        target="_blank"
        rel="noopener noreferrer"
        className="door-card is-live"
        style={style}
      >
        {body}
      </a>
    );
  }

  return (
    <article className={clsx("door-card")} style={style}>
      {body}
    </article>
  );
}

export default function ModulGrid({
  moduls,
  className,
}: {
  moduls: Modul[];
  className?: string;
}) {
  if (!moduls.length) return null;

  const kas = moduls.find((m) => m.id === "kas");
  const doors = moduls.filter((m) => m.id !== "kas");
  const allLive = moduls.every((m) => m.status === "online");

  return (
    <section
      id="modul"
      className={clsx("section", className)}
      aria-labelledby="modul-title"
    >
      <Reveal>
        <div className="section-head">
          <div>
            <h2 id="modul-title">Pintu masuk</h2>
            <p>
              Empat modul kelas.
              {allLive ? "" : " Tautan resmi menyusul."}
            </p>
          </div>
          <span className="section-side">{moduls.length} modul</span>
        </div>
      </Reveal>

      {kas && (
        <Reveal delay={60}>
          <KasBanner modul={kas} />
        </Reveal>
      )}

      {doors.length > 0 && (
        <div className="door-grid">
          {doors.map((modul, index) => (
            <Reveal
              key={modul.id}
              className="door-slot"
              delay={100 + index * 70}
            >
              <Door modul={modul} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
