import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, LinkedinIcon, InstagramIcon, Play, Pause } from "lucide-react";
import Fuse from "fuse.js";
import { works, toSlug } from "@/data/works";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Work — Abukar Adan" },
      {
        name: "description",
        content: "All projects produced, reported, and edited by Abukar Adan.",
      },
    ],
  }),
});

const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/" },
  { label: "Press", href: "/#press" },
  { label: "Contact", href: "mailto:abukar.adan@gmail.com" },
];

const fuse = new Fuse(works, {
  keys: ["title", "studio", "role", "description"],
  threshold: 0.4,
  distance: 100,
  includeScore: true,
});

const BAR_COUNT = 80;

function TrailerPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const bars = useMemo(() => {
    let h = 0;
    for (let i = 0; i < src.length; i++) h = ((h << 5) - h + src.charCodeAt(i)) | 0;
    const rand = () => {
      h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
      h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
      return (h >>> 0) / 0xffffffff;
    };
    return Array.from({ length: BAR_COUNT }, (_, i) => {
      const x = i / BAR_COUNT;
      // Multi-cycle sine creates repeating peaks like a real waveform
      const wave = Math.abs(Math.sin(x * Math.PI * 16));
      const noise = rand() * 0.18;
      return Math.max(8, Math.min(75, Math.round((wave * 0.70 + noise) * 100)));
    });
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => { setIsPlaying(false); setProgress(0); setCurrentTime(0); };
    const onTime = () => {
      const d = audio.duration || 1;
      setCurrentTime(audio.currentTime);
      setProgress(audio.currentTime / d);
    };
    const onMeta = () => setDuration(audio.duration);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
    } else {
      document.querySelectorAll<HTMLAudioElement>("audio").forEach((a) => {
        if (a !== audio) a.pause();
      });
      audio.play();
    }
  }, []);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.currentTime = ratio * duration;
    },
    [duration]
  );

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const displayTime =
    duration > 0
      ? fmt(isPlaying || currentTime > 0 ? currentTime : duration)
      : "—";

  return (
    <div className="mt-8">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
        Listen to Trailer
      </p>
      <div className="flex items-center gap-3 rounded-sm border border-white/10 bg-black px-4 py-3">
        <button
          onClick={togglePlay}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-80"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={13} fill="currentColor" strokeWidth={0} />
          ) : (
            <Play size={13} fill="currentColor" strokeWidth={0} className="translate-x-px" />
          )}
        </button>

        <div
          className="flex flex-1 cursor-pointer items-center gap-px h-6"
          onClick={seek}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          {bars.map((barH, i) => (
            <div key={i} className="flex-1 h-full flex items-center">
              <div
                className="w-full rounded-full"
                style={{
                  height: `${barH}%`,
                  background:
                    i / BAR_COUNT < progress
                      ? "rgb(255 255 255)"
                      : "rgba(255 255 255 / 0.55)",
                }}
              />
            </div>
          ))}
        </div>

        <span className="flex-shrink-0 tabular-nums text-[11px] text-muted">
          {displayTime}
        </span>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}

function WorkPage() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const filtered = useMemo(
    () =>
      query.trim()
        ? fuse.search(query).map((r) => r.item)
        : works,
    [query]
  );

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] items-center px-6 py-5 md:px-12">
          <nav className="mx-auto flex gap-5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/70 md:ml-auto md:mr-0 md:gap-8 md:text-[12px]">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className={`transition-colors hover:text-foreground ${n.label === "Work" ? "text-foreground underline underline-offset-4" : ""}`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* PAGE TITLE */}
      <div className="mx-auto max-w-[1600px] px-6 pt-8 pb-8 md:px-16 md:pt-24 md:pb-8">
        <h1 className="font-serif text-5xl leading-tight tracking-tight text-foreground md:text-7xl">
          Abukar Adan
        </h1>
        <p className="mt-4 text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.28em] text-muted md:max-w-3xl">
         I collaborate with creators and studios alike to develop stories from the first spark to the final mix.
        </p>
      </div>

      {/* SEARCH */}
      <div>
        <div className="mx-auto max-w-[1600px] px-6 py-6 md:px-16 flex justify-end">
          <div className="relative w-full md:w-[20%] md:focus-within:w-[35%] md:hover:w-[35%] transition-all duration-300 ease-in-out">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-sm border border-muted/60 bg-transparent py-3 pl-11 pr-4 text-[10px] md:text-[12px] text-foreground placeholder:text-muted focus:border-foreground/40 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* WORK LIST */}
      <div className="mx-auto max-w-[1600px] px-6 pb-24 md:px-16">
        {filtered.length === 0 && (
          <p className="border-t border-border py-16 text-sm text-muted">No results for "{query}"</p>
        )}
        {filtered.map((w, i) => (
          <article
            key={w.title}
            id={toSlug(w.title)}
            className={`group flex flex-col gap-8 py-12 md:flex-row md:gap-24 md:py-16 ${i > 0 ? "border-t border-border" : ""}`}
          >
            {/* Cover */}
            <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-neutral-900 md:w-[340px] md:flex-shrink-0 lg:w-[400px]">
              <img
                src={w.cover}
                alt={`${w.title} cover art`}
                loading={i < 2 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
                {w.studio}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {w.title}
              </h2>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
                {w.role}
              </p>
              {w.award && (
                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[#C9A96A]">
                  {w.award}
                </p>
              )}
              {w.description && (
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {w.description}
                </p>
              )}
              {w.trailer && <TrailerPlayer src={w.trailer} />}
            </div>
          </article>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-6 md:px-12 md:py-10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-foreground/50 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com/in/abukaradan"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={19} strokeWidth={1.75} />
            </a>
            <a
              href="https://www.instagram.com/byabukar"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="Instagram"
            >
              <InstagramIcon size={19} strokeWidth={1.75} />
            </a>
          </div>
          <a
            href="mailto:abukar.adan@gmail.com"
            className="transition-colors hover:text-foreground"
          >
            abukar.adan@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
