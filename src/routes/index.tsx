import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import portrait from "@/assets/abukar-adan.jpg";
import wildBoys from "@/assets/podcasts/run-fool.webp";
import runFool from "@/assets/podcasts/run-fool.webp";
import chameleon from "@/assets/podcasts/hollywood-con-queen.webp";
import drDante from "@/assets/podcasts/dr-dante.webp";
import catchKen from "@/assets/podcasts/catch-me-if-you-ken.webp";
import nightShift from "@/assets/podcasts/night-shift.webp";
import originStories from "@/assets/podcasts/origin-stories.webp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Abukar Adan — Producer. Reporter. Editor. Showrunner." },
      {
        name: "description",
        content:
          "Abukar Adan develops and produces narrative, investigative, and experimental audio stories — from the first idea to the final cut.",
      },
      { property: "og:title", content: "Abukar Adan" },
      {
        property: "og:description",
        content: "Producer. Reporter. Editor. Showrunner.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

type Work = {
  title: string;
  cover: string;
  studio: string;
  role: string;
  accolade: string;
};

const works: Work[] = [
  {
    title: "Catch Me If You Ken",
    cover: catchKen,
    studio: "A Campside Media Original",
    role: "Senior Producer",
    accolade: "#1 Apple Podcasts",
  },
  {
    title: "Chameleon: Hollywood Con Queen",
    cover: chameleon,
    studio: "A Campside Media Original",
    role: "Lead Producer",
    accolade: "#2 Apple Podcasts",
  },
  {
    title: "Chameleon: Dr. Dante",
    cover: drDante,
    studio: "A Campside Media Original",
    role: "Producer",
    accolade: "Master of Deception",
  },
  {
    title: "Run, Fool!",
    cover: runFool,
    studio: "Ballen Studios × Campside",
    role: "Showrunner",
    accolade: "Signal Award Winner · 10M+ Downloads",
  },
  {
    title: "Witnessed: Night Shift",
    cover: nightShift,
    studio: "Sony Music · The Binge",
    role: "Lead Producer",
    accolade: "Investigative Documentary",
  },
  {
    title: "Origin Stories",
    cover: originStories,
    studio: "A Campside Media Original",
    role: "Executive Producer",
    accolade: "Weekly Interviews",
  },
];

const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Approach", href: "#approach" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "mailto:hello@abukaradan.com" },
];

function Index() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-neutral-100 antialiased">
      {/* HERO */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <img
          src={portrait}
          alt="Abukar Adan on location with field recording gear"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-[65%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12 md:py-8">
          <span className="font-serif text-base tracking-[0.2em] text-white/80">
            AA
          </span>
          <nav className="hidden gap-8 text-[11px] font-medium uppercase tracking-[0.22em] text-white/85 md:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="transition-colors hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="mailto:hello@abukaradan.com"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/85 md:hidden"
          >
            Contact
          </a>
        </header>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-32 md:px-12 md:pt-28 md:pb-40">
          <h1 className="font-serif text-[18vw] leading-[0.88] tracking-tight text-white md:text-[9rem] lg:text-[11rem]">
            ABUKAR
            <br />
            ADAN
          </h1>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/85">
            Producer. Reporter. Editor. Showrunner.
          </p>
          <p className="mt-8 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
            I develop and produce narrative, investigative, and experimental
            stories — from the first idea to the final cut.
          </p>
          <a
            href="#work"
            className="mt-10 inline-flex items-center gap-3 border-b border-white/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:border-white"
          >
            Explore the Work
            <span aria-hidden className="text-base leading-none">↓</span>
          </a>
        </div>
      </section>

      {/* WORK GRID */}
      <section
        id="work"
        className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
      >
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-serif text-3xl tracking-tight md:text-5xl">
            Selected Work
          </h2>
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-white/50 md:block">
            2019 — Present
          </span>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-3">
          {works.map((w) => (
            <li key={w.title} className="group">
              <div className="relative aspect-square overflow-hidden bg-neutral-900">
                <img
                  src={w.cover}
                  alt={`${w.title} cover art`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  {w.studio}
                </p>
                <h3 className="mt-2 font-serif text-lg leading-snug tracking-tight text-white md:text-xl">
                  {w.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{w.role}</p>
                <p className="text-xs text-white/45">{w.accolade}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="border-t border-white/10 bg-[#0a0a0a] px-6 py-24 md:px-12 md:py-32"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-5">
          <h2 className="font-serif text-3xl tracking-tight md:col-span-2 md:text-5xl">
            About
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-white/75 md:col-span-3 md:text-lg">
            <p>
              Abukar Adan is an audio producer, reporter, and editor whose work
              spans investigative journalism, narrative non-fiction, and
              experimental documentary. He has produced chart-topping series for
              Campside Media, Sony Music, Audible, and Ballen Studios.
            </p>
            <p>
              His shows have won the Ambie and Signal Awards, reached #1 on
              Apple Podcasts, and been downloaded tens of millions of times. He
              builds stories from the ground up — reporting, scripting,
              interviewing, editing, and shaping the sound of the final cut.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-white/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Abukar Adan</span>
          <a
            href="mailto:hello@abukaradan.com"
            className="transition-colors hover:text-white"
          >
            hello@abukaradan.com
          </a>
        </div>
      </footer>
    </div>
  );
}
