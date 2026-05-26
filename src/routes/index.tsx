import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import portrait from "@/assets/abukar-adan.jpg";
import wildBoys from "@/assets/podcasts/run-fool.webp";
import runFool from "@/assets/podcasts/run-fool.webp";
import chameleon from "@/assets/podcasts/hollywood-con-queen.webp";
import drDante from "@/assets/podcasts/dr-dante.webp";
import catchKen from "@/assets/podcasts/catch-me-if-you-ken.webp";
import nightShift from "@/assets/podcasts/night-shift.webp";
import originStories from "@/assets/podcasts/origin-stories.webp";
import anthraxThreat from "@/assets/podcasts/anthrax-threat.webp";
import theBering from "@/assets/podcasts/the-bering.webp";
import weCameToTheForest from "@/assets/podcasts/we-came-to-the-forest.webp";
import wildBoysCover from "@/assets/podcasts/wild-boys.webp";

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
    title: "Wild Boys",
    cover: wildBoysCover,
    studio: "A Campside Media Original",
    role: "Producer",
    accolade: "Narrative Mystery",
  },
  {
    title: "Run, Fool!",
    cover: runFool,
    studio: "Ballen Studios × Campside",
    role: "Showrunner",
    accolade: "Signal Award Winner · 10M+ Downloads",
  },
  {
    title: "Origin Stories",
    cover: originStories,
    studio: "A Campside Media Original",
    role: "Executive Producer",
    accolade: "Weekly Interviews",
  },
  {
    title: "Chameleon: Hollywood Con Queen",
    cover: chameleon,
    studio: "A Campside Media Original",
    role: "Lead Producer",
    accolade: "#2 Apple Podcasts",
  },
  {
    title: "Catch Me If You Ken",
    cover: catchKen,
    studio: "A Campside Media Original",
    role: "Senior Producer",
    accolade: "#1 Apple Podcasts",
  },
  {
    title: "Chameleon: Dr. Dante",
    cover: drDante,
    studio: "A Campside Media Original",
    role: "Producer",
    accolade: "Master of Deception",
  },
  {
    title: "Witnessed: Night Shift",
    cover: nightShift,
    studio: "Sony Music · The Binge",
    role: "Lead Producer",
    accolade: "Investigative Documentary",
  },
  {
    title: "We Came to the Forest",
    cover: weCameToTheForest,
    studio: "Wondery · Campside · Tenderfoot",
    role: "Producer",
    accolade: "Documentary Series",
  },
  {
    title: "Cover Up: The Anthrax Threat",
    cover: anthraxThreat,
    studio: "Sony Music · The Binge",
    role: "Producer",
    accolade: "Investigative Series",
  },
  {
    title: "The Bering",
    cover: theBering,
    studio: "Audible Original",
    role: "Producer",
    accolade: "with Sean Flynn",
  },
];

const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "mailto:hello@abukaradan.com" },
];

function WorkCarousel({ works }: { works: Work[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group/carousel mx-auto max-w-7xl">
      <div className="overflow-hidden px-6 md:px-12" ref={emblaRef}>
        <div className="flex gap-3 md:gap-4">
          {works.map((w, i) => (
            <div
              key={w.title}
              className="flex-[0_0_60%] min-w-0 sm:flex-[0_0_32%] md:flex-[0_0_22%] lg:flex-[0_0_16.5%]"
            >
              <div className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-neutral-900 rounded-sm">
                  <img
                    src={w.cover}
                    alt={`${w.title} cover art`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#E8DDD0]/45">
                    {w.studio}
                  </p>
                  <h3 className="mt-1.5 font-serif text-sm font-bold leading-snug tracking-tight text-[#E8DDD0] md:text-base">
                    {w.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#E8DDD0]/70">{w.role}</p>
                  <p className={`text-[11px] ${w.accolade.includes('Signal Award') ? 'text-[#C9A96A]' : 'text-[#E8DDD0]/45'}`}>{w.accolade}</p>
                  {w.title === 'Wild Boys' && (
                    <p className="mt-1 text-[11px] tracking-[1px] text-[#C9A96A]">Ambie Winner — Podcast of the Year · #1 Apple Podcasts</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Controls */}
      <div className="mt-8 md:mt-12 flex items-center justify-start md:justify-between px-6 md:px-12">
        <a
          href="#work"
          className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8DDD0]/70 transition-colors hover:text-[#E8DDD0]"
        >
          See all
          <ChevronRight size={14} strokeWidth={2.5} />
        </a>

        <div className="hidden md:flex gap-2">
          {works.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === selectedIndex
                  ? "w-6 bg-[#E8DDD0]"
                  : "w-1.5 bg-[#E8DDD0]/30 hover:bg-[#E8DDD0]/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="hidden lg:flex gap-3">
          <button
            onClick={scrollPrev}
            disabled={!prevEnabled}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DDD0]/20 text-[#E8DDD0]/70 transition-all hover:border-[#E8DDD0]/40 hover:text-[#E8DDD0] disabled:opacity-30"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextEnabled}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DDD0]/20 text-[#E8DDD0]/70 transition-all hover:border-[#E8DDD0]/40 hover:text-[#E8DDD0] disabled:opacity-30"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>

    </div>
  );
}

function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-neutral-100 antialiased">
      {/* HERO */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <img
          src={portrait}
          alt="Abukar Adan on location with field recording gear"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-[65%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-6 pb-2 md:px-12 md:py-8">
          <nav className="ml-auto hidden gap-8 text-[11px] font-medium uppercase tracking-[0.22em] text-[#E8DDD0]/85 md:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="transition-colors hover:text-[#E8DDD0]"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="ml-auto -mr-2 p-2 text-[#E8DDD0] md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isMenuOpen && (
            <div className="absolute top-full right-6 z-50 mt-2 flex flex-col gap-4 rounded-md bg-black/95 px-6 py-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#E8DDD0]/85 md:hidden">
              {nav.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="transition-colors hover:text-[#E8DDD0]"
                >
                  {n.label}
                </a>
              ))}
            </div>
          )}
        </header>


        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-8 pb-16 md:px-12 md:pt-28 md:pb-40">
          <h1 className="font-serif text-[18vw] leading-[0.88] tracking-tight text-[#E8DDD0] md:text-[9rem] lg:text-[11rem]">
            ABUKAR
            <br />
            ADAN
          </h1>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#E8DDD0]/85">
            Producer. Reporter.{" "}
            <br className="md:hidden" />
            Editor. Showrunner.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#E8DDD0]/75 md:text-lg">
            I develop and produce narrative, investigative, and experimental
            stories — from the first idea to the final cut.
          </p>
        </div>
      </section>

      {/* WORK CAROUSEL */}
      <section
        id="work"
        className="relative z-20 -mt-80 w-full pb-8 md:-mt-56 md:pb-32"
      >
        <WorkCarousel works={works} />
      </section>


      {/* ABOUT */}
      <section
        id="about"
        className="border-t border-[#E8DDD0]/10 bg-black px-6 py-6 md:px-12 md:py-32"
      >
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-5 md:gap-12">
          <h2 className="font-serif text-3xl tracking-tight md:col-span-2 md:text-5xl">
            About
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-[#E8DDD0]/75 md:col-span-3 md:space-y-6 md:text-lg">
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

      {/* AWARD-WINNING */}
      <section
        id="award-winning"
        className="border-t border-[#E8DDD0]/10 bg-black px-6 py-20 md:px-12 md:py-40"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 font-serif text-4xl tracking-tight text-[#E8DDD0] md:mb-12 md:text-6xl lg:text-7xl">
            AWARD-WINNING
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 md:gap-10">
            {works.slice(0, 2).map((w) => (
              <div key={w.title} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-sm bg-neutral-900">
                  <img
                    src={w.cover}
                    alt={`${w.title} cover art`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E8DDD0]/50">
                    {w.studio}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#E8DDD0] md:text-3xl">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8DDD0]/70">
                    {w.role}
                  </p>
                  <p className={`mt-1 text-[11px] uppercase tracking-[0.22em] ${w.accolade.includes('Signal Award') ? 'text-[#C9A96A]' : 'text-[#E8DDD0]/50'}`}>
                    {w.accolade}
                  </p>
                  {w.title === 'Wild Boys' && (
                    <p className="mt-1 text-[11px] tracking-[1px] text-[#C9A96A]">
                      Ambie Winner — Podcast of the Year · #1 Apple Podcasts
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8DDD0]/10 px-6 py-6 md:px-12 md:py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-[#E8DDD0]/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Abukar Adan</span>
          <a
            href="mailto:hello@abukaradan.com"
            className="transition-colors hover:text-[#E8DDD0]"
          >
            hello@abukaradan.com
          </a>
        </div>
      </footer>
    </div>
  );
}
