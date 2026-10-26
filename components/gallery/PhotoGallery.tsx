"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { Mark } from "@/components/ui/Mark";
import styles from "./gallery.module.css";

type Photo = {
  src: string;
  alt: string;
  title: string;
  meta: string;
  width: number;
  height: number;
  ratio: string;
  frame: string;
};

const photos: Photo[] = [
  {
    src: "/assets/photos/kelas-hero.jpg",
    alt: "Siswa 11TKJ1 mengikuti pelajaran di ruang kelas",
    title: "Pagi di kelas",
    meta: "Ruang 11TKJ1 · 2026",
    width: 1920,
    height: 1280,
    ratio: "aspect-[16/10]",
    frame: "rotate-[-1.1deg]",
  },
  {
    src: "/assets/photos/siswa-sedang-belajar.jpg",
    alt: "Siswa berseragam tertawa saat jam pelajaran",
    title: "Tertawa",
    meta: "Jam istirahat · 2026",
    width: 1920,
    height: 1280,
    ratio: "aspect-[4/5]",
    frame: "rotate-[1.7deg]",
  },
  {
    src: "/assets/photos/murid-menulis-labkom.jpg",
    alt: "Dua siswa menulis catatan di meja lab komputer",
    title: "Catatan lab",
    meta: "Lab komputer · 2026",
    width: 1920,
    height: 1440,
    ratio: "aspect-[4/3]",
    frame: "rotate-[0.8deg]",
  },
  {
    src: "/assets/photos/belajar-kelompok.jpg",
    alt: "Siswa duduk melingkar mengerjakan tugas kelompok di meja kayu",
    title: "Kelompok",
    meta: "Tugas bersama · 2026",
    width: 1920,
    height: 1280,
    ratio: "aspect-[4/5]",
    frame: "rotate-[-1.3deg]",
  },
  {
    src: "/assets/photos/foto-siswa-sedang-belajar.jpg",
    alt: "Proyektor menyala di ruang kelas yang penuh siswa",
    title: "Proyektor",
    meta: "Presentasi · 2026",
    width: 1920,
    height: 1440,
    ratio: "aspect-[16/9]",
    frame: "rotate-[0.5deg]",
  },
];

const INDEX_ROWS = [
  { label: "Bingkai", value: "05" },
  { label: "Tahun", value: "2026" },
  { label: "Kelas", value: "11TKJ1" },
];

const UI = "font-['Nunito']";

function PhotoFrame({
  photo,
  className = "",
  eager = false,
  onOpen,
}: {
  photo: Photo;
  className?: string;
  eager?: boolean;
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
}) {
  const index = photos.indexOf(photo);

  return (
    <figure
      className={`group relative min-w-0 self-start ${className} ${photo.frame} transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rotate-0`}
    >
      <button
        type="button"
        onClick={(event) => onOpen(index, event.currentTarget)}
        aria-label={`Perbesar foto ${photo.title}`}
        className="block w-full cursor-zoom-in rounded-[var(--radius-photo)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text)]"
      >
        <div className="relative overflow-hidden rounded-[var(--radius-photo)] border border-[var(--border)] bg-[var(--surface)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={`${photo.ratio} w-full scale-[1.02] object-cover opacity-75 grayscale blur-[1.5px] transition-[filter,opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100 group-hover:opacity-100 group-hover:grayscale-0 group-hover:blur-none`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,20,19,0.55),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className={`${UI} pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--text)] opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
          >
            Lihat
            <ArrowUpRight size={12} />
          </span>
        </div>
      </button>

      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        <span className="font-['Lora'] text-[15px] text-[var(--muted)] transition-colors duration-500 group-hover:text-[var(--text)]">
          {photo.title}
        </span>
        <span
          className={`${UI} flex-none text-[10px] uppercase tracking-[0.18em] text-[var(--muted-2)]`}
        >
          {photo.meta}
        </span>
      </figcaption>
    </figure>
  );
}

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
  closeRef,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  closeRef: React.RefObject<HTMLButtonElement>;
}) {
  const photo = photos[index];
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(
    photos.length
  ).padStart(2, "0")}`;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      data-theme="dark"
      aria-label={`${photo.title} — foto diperbesar`}
      className={`fixed inset-0 z-[80] flex flex-col bg-[rgba(20,20,19,0.97)] backdrop-blur-md ${styles.lightbox}`}
    >
      <div className="flex items-center justify-between px-5 py-5 md:px-8">
        <span
          className={`${UI} text-[11px] uppercase tracking-[0.2em] text-[var(--muted-2)]`}
        >
          {counter}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className={`${UI} inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border)] px-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--text)] hover:text-[var(--text)]`}
        >
          Tutup
          <X size={14} aria-hidden />
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-4 pb-2"
        onClick={onClose}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          onClick={(event) => event.stopPropagation()}
          className={`max-h-[68vh] max-w-[92vw] select-none rounded-[var(--radius-photo)] object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ${styles.lightboxImage}`}
        />
      </div>

      <div className="flex items-end justify-between gap-6 px-5 pb-7 md:px-8">
        <div className="min-w-0">
          <p className="truncate font-['Lora'] text-2xl leading-none text-[var(--text)] md:text-3xl">
            {photo.title}
          </p>
          <p
            className={`${UI} mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-2)]`}
          >
            {photo.meta}
          </p>
        </div>

        <div className="flex flex-none gap-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Foto sebelumnya"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--text)] hover:text-[var(--text)]"
          >
            <ArrowLeft size={17} aria-hidden />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Foto berikutnya"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--text)] hover:text-[var(--text)]"
          >
            <ArrowRight size={17} aria-hidden />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null);
  const [developing, setDeveloping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (active === null) return;

    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((current) =>
          current === null ? current : (current + 1) % photos.length
        );
      }
      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null
            ? current
            : (current - 1 + photos.length) % photos.length
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  const close = () => {
    setActive(null);
    triggerRef.current?.focus();
  };

  const open = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive(index);
  };

  const step = (direction: 1 | -1) => {
    setActive((current) =>
      current === null
        ? current
        : (current + direction + photos.length) % photos.length
    );
  };

  return (
    <div className={styles.frame}>
      <div
        data-theme="dark"
        data-gallery-room=""
        id="galeri-atas"
        onPointerEnter={() => setDeveloping(true)}
        onPointerLeave={() => setDeveloping(false)}
        className={styles.room}
      >
        <div
          aria-hidden="true"
          className={`${styles.grain} ${developing ? styles.grainActive : ""}`}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(130%_100%_at_50%_0%,transparent_52%,rgba(0,0,0,0.5)_100%)]"
        />

        <div className="relative z-10 px-6 pb-20 pt-24 md:px-12 md:pb-24 md:pt-10">
          <header className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-5">
            <Link href="/dashboard" className="group flex min-w-0 items-center gap-3">
              <Mark className="h-9 w-9 flex-none text-[var(--accent)] transition-transform duration-300 group-hover:-rotate-3" />
              <span className="min-w-0 leading-tight">
                <span className={`${UI} block truncate text-[13px] font-semibold`}>
                  Galeri 11TKJ1
                </span>
                <span
                  className={`${UI} hidden truncate text-[12px] text-[var(--muted)] sm:block`}
                >
                  SMKN 54 · Computer Engineering
                </span>
              </span>
            </Link>

            <div className="flex flex-none items-center gap-3">
              <span
                className={`${UI} hidden text-[11px] uppercase tracking-[0.18em] text-[var(--muted-2)] lg:inline`}
              >
                Vol. 01 — 2026
              </span>
              <Link
                href="/dashboard"
                className={`${UI} inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--text)] hover:text-[var(--text)]`}
              >
                Papan kelas
                <ArrowUpRight size={13} aria-hidden />
              </Link>
            </div>
          </header>

          <section className="grid gap-10 pb-14 pt-12 md:grid-cols-12 md:items-end md:gap-6 md:pb-20 md:pt-20">
            <div className="md:col-span-8">
              <p
                className={`${UI} text-[11px] uppercase tracking-[0.22em] text-[var(--muted-2)]`}
              >
                Galeri kelas — Vol. 01
              </p>
              <h1 className="mt-5 font-['Lora'] text-[clamp(2.6rem,7vw,6rem)] font-normal leading-[0.95] tracking-[-0.02em]">
                Kelas kami,
                <br />
                <span className="italic text-[var(--muted)]">
                  dalam cahaya.
                </span>
              </h1>
            </div>

            <div className="md:col-span-4 md:pb-2">
              <p className="max-w-sm font-['Lora'] text-[15px] leading-relaxed text-[var(--muted)]">
                Lima bingkai dari 11TKJ1 — wajah, tawa, dan pagi yang selalu
                lewat terlalu cepat.
              </p>
              <p
                className={`${UI} mt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-2)]`}
              >
                Arahkan kursor untuk menajamkan · Klik untuk memperbesar
              </p>
            </div>
          </section>

          <section
            aria-label="Galeri foto kelas"
            className="grid grid-cols-6 gap-x-4 gap-y-12 md:grid-cols-12 md:gap-x-6 md:gap-y-10"
          >
            <PhotoFrame
              photo={photos[0]}
              eager
              onOpen={open}
              className="col-span-6 md:col-span-7 md:col-start-1 md:row-start-1"
            />

            <PhotoFrame
              photo={photos[1]}
              onOpen={open}
              className="col-span-5 col-start-2 md:col-span-4 md:col-start-9 md:row-start-1 md:mt-32"
            />

            <div className="col-span-6 md:col-span-5 md:col-start-2 md:row-start-2 md:mt-4">
              <PhotoFrame photo={photos[2]} onOpen={open} />

              <aside aria-hidden="true" className="mt-12">
                <div className="border-t border-[var(--border)] pt-4">
                  <p
                    className={`${UI} text-[10px] uppercase tracking-[0.2em] text-[var(--muted-2)]`}
                  >
                    Indeks
                  </p>
                  <dl className="mt-4 space-y-2">
                    {INDEX_ROWS.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] pb-2"
                      >
                        <dt
                          className={`${UI} text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]`}
                        >
                          {row.label}
                        </dt>
                        <dd className="font-['Lora'] text-[15px]">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            </div>

            <PhotoFrame
              photo={photos[3]}
              onOpen={open}
              className="col-span-5 col-start-2 md:col-span-5 md:col-start-8 md:row-start-2 md:mt-28"
            />

            <PhotoFrame
              photo={photos[4]}
              onOpen={open}
              className="col-span-6 md:col-span-8 md:col-start-4 md:row-start-3 md:mt-10"
            />
          </section>

          <footer className="mt-24 border-t border-[var(--border)] pt-6">
            <div
              className={`${UI} flex flex-col gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] md:flex-row md:items-center md:justify-between`}
            >
              <span>© 2026 11TKJ1 · SMKN 54</span>
              <span>05 bingkai — foto contoh</span>
              <a
                href="#galeri-atas"
                className="transition-colors duration-200 hover:text-[var(--text)]"
              >
                Kembali ke atas ↑
              </a>
            </div>

            <p className="mt-4 max-w-xl text-[12px] leading-relaxed text-[var(--muted)]">
              Foto contoh sementara dari{" "}
              <a
                href="https://commons.wikimedia.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[var(--border)] underline-offset-2 transition-colors hover:text-[var(--text)]"
              >
                Wikimedia Commons
              </a>{" "}
              (CC BY-SA 4.0 / CC0). Foto asli kelas menyusul.
            </p>
          </footer>
        </div>

        {mounted && active !== null && (
          <Lightbox
            index={active}
            onClose={close}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
            closeRef={closeRef}
          />
        )}
      </div>
    </div>
  );
}
