import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import { works } from "@/data/works";

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
  { label: "Contact", href: "mailto:hello@abukaradan.com" },
];

const fuse = new Fuse(works, {
  keys: ["title", "studio", "role", "description"],
  threshold: 0.4,
  distance: 100,
  includeScore: true,
});

function WorkPage() {
  const [query, setQuery] = useState("");
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
            </div>
          </article>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-6 md:px-12 md:py-10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-foreground/50 md:flex-row md:items-center">
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
