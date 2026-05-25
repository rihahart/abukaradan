import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Abu Karadan — Personal Site" },
      {
        name: "description",
        content:
          "The personal site of Abu Karadan — writer, builder, and curious mind.",
      },
      { property: "og:title", content: "Abu Karadan" },
      {
        property: "og:description",
        content: "Writer, builder, curious mind.",
      },
    ],
  }),
});

function Index() {
  const links = [
    { label: "Writing", href: "#writing" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "mailto:hello@abukaradan.com" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-8">
        <span className="font-serif text-lg tracking-tight">Abu Karadan</span>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <h1 className="font-serif text-5xl leading-tight tracking-tight md:text-6xl">
          Hi, I'm Abu Karadan.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          I write about ideas, build small useful things on the internet, and
          occasionally publish notes from the in-between.
        </p>

        <section id="writing" className="mt-20">
          <h2 className="font-serif text-2xl tracking-tight">Writing</h2>
          <ul className="mt-6 divide-y divide-border">
            {[
              { title: "On building quietly", date: "2026" },
              { title: "Notes from a long walk", date: "2025" },
              { title: "The shape of small ideas", date: "2025" },
            ].map((p) => (
              <li
                key={p.title}
                className="flex items-baseline justify-between py-4"
              >
                <span className="text-foreground">{p.title}</span>
                <span className="text-sm text-muted-foreground">{p.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="mt-20">
          <h2 className="font-serif text-2xl tracking-tight">Projects</h2>
          <p className="mt-4 text-muted-foreground">
            A few things I've made — more coming soon.
          </p>
        </section>

        <footer className="mt-24 border-t border-border pt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Abu Karadan
        </footer>
      </main>
    </div>
  );
}
