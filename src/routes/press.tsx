import { createFileRoute } from "@tanstack/react-router";
import { LinkedinIcon, InstagramIcon } from "lucide-react";
import pressImage from "@/assets/Press.jpeg";

export const Route = createFileRoute("/press")({
  component: PressPage,
  head: () => ({
    meta: [
      { title: "Press — Abukar Adan" },
      { name: "description", content: "Press coverage for Abukar Adan." },
    ],
  }),
});

const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" },
];

const selectedPress = [
  { label: "Wild Boys Wins Podcast of The Year", pub: "The Hollywood Reporter", href: "https://www.hollywoodreporter.com/business/digital/2023-ambie-awards-winners-list-chameleon-wild-boys-podcast-of-the-year-1235343389/" },
  { label: "The best podcasts of 2022", pub: "The Atlantic", href: "https://www.theatlantic.com/culture/archive/2022/12/best-podcasts-2022/672613/" },
  { label: "The Best True Crime Podcasts of 2022", pub: "Vulture", href: "https://www.vulture.com/article/best-true-crime-podcasts-2022.html" },
  { label: "Best Podcasts of 2020", pub: "Rolling Stone", href: "https://www.rollingstone.com/culture/culture-features/best-podcasts-2020-1105406/" },
  { label: "The Best Podcasts for Everyone", pub: "Wired", href: "https://www.wired.com/story/best-podcasts/" },
  { label: "7 Podcasts About the Art of the Scam", pub: "NYT", href: "https://www.nytimes.com/2021/02/16/arts/podcasts-scams-pyramid-schemes.html" },
];

const aboutMe = [
  { label: "Abukar Adan and Host Natalie Robehmed discuss Catch Me If You Ken", pub: "Inside the Tent", href: "https://join.campsidemedia.com/p/inside-the-tent-podcast-catch-me-if-you-ken-natalie-robehmed-abukar-adan" },
  { label: "Abukar Adan and Host Sam Mullins discuss Wild Boys", pub: "Inside the Tent", href: "https://join.campsidemedia.com/p/inside-the-tent-podcast-wild-boys-sam-mullins-abukar-adan" },
  { label: "The Path to Podcasting", pub: "Colby News", href: "https://news.colby.edu/story/the-path-to-podcasting/" },
  { label: "Crossover Artist", pub: "Down East Magazine", href: "https://downeast.com/arts-leisure/crossover-artist/" },
];

const quotes = [
  {
    author: "Nicholas Quah,",
    pub: "Vulture",
    text: "Hosted by Vernon native Sam Mullins and produced by Abukar Adan, Wild Boys starts out as a quirky mystery and becomes something tender and soulful by the end as it sits with the emotional aftermath of this strange spectacle.",
  },
  {
    author: "Laura Jane Standley and Eric McQuade,",
    pub: "The Atlantic",
    text: "The brilliance of Wild Boys is that it shows the manipulative power of perspective.",
  },
  {
    author: "Simon Hill,",
    pub: "Wired",
    text: "This weird, compelling, investigative podcast [Hollywood Con Queen] unwinds a satisfyingly twisty tale that's mercifully free of blood and violence.",
  },
];

function PressPage() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 antialiased">
      {/* Sticky nav */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] items-center px-6 py-5 md:px-12">
          <nav className="mx-auto flex gap-5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/70 md:ml-auto md:mr-0 md:gap-8 md:text-[12px]">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className={`transition-colors hover:text-foreground ${
                  n.label === "Press" ? "text-foreground underline underline-offset-4" : ""
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero photo banner */}
      <div className="relative h-[50vw] max-h-[70vh] w-full overflow-hidden">
        <img
          src={pressImage}
          alt="Abukar Adan"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 px-6 pb-8 md:px-16 md:pb-12">
          <h1 className="font-serif text-[12vw] leading-[0.88] tracking-tight text-foreground md:text-[7rem] lg:text-[9rem]">
            PRESS
          </h1>
        </div>
      </div>

      {/* Press lists */}
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-16 md:py-24 space-y-16 md:space-y-20">

        {/* Selected Press */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-12">
          <h2 className="font-serif text-foreground text-3xl tracking-tight md:col-span-2 md:text-5xl">
            Selected Press
          </h2>
          <ul className="md:col-span-3">
            {selectedPress.map((item, i) => (
              <li key={i} className={`py-4 ${i > 0 ? "border-t border-white/[0.07]" : ""}`}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4"
                >
                  <span className="text-sm leading-snug text-foreground/75 transition-colors group-hover:text-foreground">
                    {item.label}
                  </span>
                  <em className="flex-shrink-0 text-[11px] not-italic text-foreground/35 transition-colors group-hover:text-foreground/60">
                    {item.pub}
                  </em>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* About Me */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-12">
          <h2 className="font-serif text-foreground text-3xl tracking-tight md:col-span-2 md:text-5xl">
            About Me
          </h2>
          <ul className="md:col-span-3">
            {aboutMe.map((item, i) => (
              <li key={i} className={`py-4 ${i > 0 ? "border-t border-white/[0.07]" : ""}`}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4"
                >
                  <span className="text-sm leading-snug text-foreground/75 transition-colors group-hover:text-foreground">
                    {item.label}
                  </span>
                  <em className="flex-shrink-0 text-[11px] not-italic text-foreground/35 transition-colors group-hover:text-foreground/60">
                    {item.pub}
                  </em>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Quotes */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-16 md:py-24">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
            {quotes.map((q, i) => (
              <div key={i} className={`md:border-l md:border-white/[0.07] md:pl-10 ${i === 0 ? "md:border-l-0 md:pl-0" : ""}`}>
                <p className="text-lg leading-relaxed text-foreground/65 md:text-xl">
                  "{q.text}"
                </p>
                <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.24em] text-foreground/35">
                  {q.author} <em className="not-italic">{q.pub}</em>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
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
