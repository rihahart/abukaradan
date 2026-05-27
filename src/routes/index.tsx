import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import portrait from "@/assets/abukar-adan.jpg";
import { works, type Work } from "@/data/works";

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

const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "mailto:hello@abukaradan.com" },
];

function WorkCarousel({ works }: { works: Work[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    containScroll: false,
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
    <div className="relative group/carousel mx-auto max-w-7xl md:max-w-none">
      <div className="overflow-hidden px-6 md:px-6 lg:px-10" ref={emblaRef}>
        <div className="flex">
          {works.map((w) => (
            <div
              key={w.title}
              className="flex-[0_0_60%] min-w-0 sm:flex-[0_0_32%] md:flex-[0_0_25%] lg:flex-[0_0_20%] pl-3 md:pl-4"
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
                <div className="mt-4 md:mt-6">
                  <p className="text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.22em] text-muted">
                    {w.studio}
                  </p>
                  <h3 className="mt-1.5 font-serif text-[18px] font-bold leading-snug text-foreground md:text-[24px]">
                    {w.title}
                  </h3>
                  <p className="mt-1.5 text-[10px] md:text-[12px] font-semibold text-muted">{w.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Controls */}
      <div className="mt-8 md:mt-12 flex items-center justify-end md:justify-between px-6 md:px-6 lg:px-10">
        <a
          href="/work"
          className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground"
        >
          See all work
          <ChevronRight size={14} strokeWidth={2.5} />
        </a>

        <div className="hidden md:flex gap-2">
          {works.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === selectedIndex
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="hidden lg:flex gap-6">
          <button
            onClick={scrollPrev}
            disabled={!prevEnabled}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-muted/70 text-foreground/70 transition-colors hover:border-foreground hover:text-foreground disabled:opacity-30"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextEnabled}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-muted/70 text-foreground/70 transition-colors hover:border-foreground hover:text-foreground disabled:opacity-30"
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
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["press"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0, rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-black text-neutral-100 antialiased">
      {/* HERO */}
      <section className="relative min-h-[100svh] w-full flex flex-col min-[1600px]:min-h-[88svh] min-[1900px]:min-h-[82svh]">
        <img
          src={portrait}
          alt="Abukar Adan on location with field recording gear"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-[60%_center] lg:object-[50%_center] xl:object-[45%_center] min-[1600px]:object-[47%_0%] min-[1900px]:object-[50%_0%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <header className="relative z-10 flex w-full max-w-[1600px] mx-auto items-center justify-between px-6 pt-6 pb-2 md:px-12 md:py-8">
          <nav className="mx-auto flex gap-5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/85 md:ml-auto md:mr-0 md:gap-8 md:text-[12px]">
            {nav.map((n) => {
              const id = n.href.replace("#", "");
              const isActive = n.href === "/" || activeSection === id;
              return (
                <a
                  key={n.label}
                  href={n.href}
                  className={`transition-colors hover:text-foreground ${isActive ? "text-foreground underline underline-offset-4" : ""}`}
                >
                  {n.label}
                </a>
              );
            })}
          </nav>
        </header>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto  px-6 pt-8 pb-4 md:px-16 md:py-16">
          <h1 className="font-serif text-[18vw] leading-[0.88] tracking-tight text-foreground md:text-[9rem] lg:text-[11rem]">
            ABUKAR
            <br />
            ADAN
          </h1>
          <p className="mt-3 text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.32em] text-secondary-foreground md:pb-2 ">
            Producer. Reporter.{" "}
            <br className="md:hidden" />
            Editor. Showrunner.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-secondary-foreground md:text-lg">
            I develop and produce narrative, investigative, and experimental
            stories — from the first idea to the final cut.
          </p>
        </div>

        {/* WORK CAROUSEL — 3xl gap below hero text */}
        <div id="work" className="relative z-20 w-full mt-12 pb-8 md:pb-10">
          <WorkCarousel works={works} />
        </div>
      </section>


      {/* ABOUT */}
      <section
        id="about"
        className="border-t border-border bg-black py-12 md:py-24"
      >
        <div className="mx-auto grid max-w-[1600px] px-6 md:px-16 gap-8 md:grid-cols-5 md:gap-12">
          <h2 className="font-serif text-foreground text-3xl tracking-tight md:col-span-2 md:text-5xl">
            About
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-secondary-foreground md:col-span-3 md:space-y-6 md:text-lg">
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
        className="border-t border-border py-12 md:py-24"
      >
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <h2 className="mb-12 md:mb-20 font-serif text-3xl tracking-tight text-foreground md:text-5xl">
            Award-Winning Work
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-16 sm:grid-cols-2 md:gap-20">
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
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-foreground/50">
                    {w.studio}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
                    {w.role}
                  </p>
                  {w.title === 'Wild Boys' && (
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#C9A96A]">
                      Ambie Winner — Podcast of the Year · #1 Apple Podcasts
                    </p>
                  )}
                  {w.title === 'Run, Fool!' && (
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#C9A96A]">
                      Signal Award Winner · 10M+ Downloads
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 md:mt-16 flex justify-end md:justify-start">
            <a
              href="/work"
              className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground"
            >
              See all work
              <ChevronRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-6 md:px-12 md:py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-foreground/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Abukar Adan</span>
          <a
            href="mailto:hello@abukaradan.com"
            className="transition-colors hover:text-foreground"
          >
            hello@abukaradan.com
          </a>
        </div>
      </footer>
    </div>
  );
}
