import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LinkedinIcon, InstagramIcon } from "lucide-react";
import contactImage from "@/assets/ContactImage.jpeg";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Abukar Adan" },
      { name: "description", content: "Get in touch with Abukar Adan." },
    ],
  }),
});

const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/" },
  { label: "Press", href: "/#press" },
  { label: "Contact", href: "/contact" },
];

const inputClass =
  "w-full border-b border-white/20 bg-transparent py-3 text-sm text-foreground placeholder:text-foreground/25 focus:border-foreground/50 focus:outline-none transition-colors";
const labelClass =
  "block text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground mb-2";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/abukar.adan@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 antialiased">
      {/* Mobile-only sticky header */}
      <header className="md:hidden sticky top-0 z-20 border-b border-border bg-black/90 backdrop-blur-sm">
        <div className="flex items-center px-6 py-5">
          <nav className="mx-auto flex gap-5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/70">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className={`transition-colors hover:text-foreground ${
                  n.label === "Contact" ? "text-foreground underline underline-offset-4" : ""
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Split layout */}
      <div className="flex flex-col md:flex-row md:gap-16">
      {/* Left: photo */}
      <div className="relative h-[55vw] md:h-screen md:w-[45%] sticky top-0 flex-shrink-0 overflow-hidden">
        <img
          src={contactImage}
          alt="Abukar Adan"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Right: nav + form + footer */}
      <div className="relative z-10 flex flex-1 flex-col bg-black px-8 py-8 md:px-14 md:py-10">
        {/* Nav */}
        <nav className="hidden md:flex justify-end gap-5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/70 md:gap-8 md:text-[12px]">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={`transition-colors hover:text-foreground ${
                n.label === "Contact" ? "text-foreground underline underline-offset-4" : ""
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Heading + form */}
        <div className="flex flex-col justify-center py-10 md:py-14">
          <h1 className="font-serif text-[14vw] leading-[0.9] tracking-tight text-foreground md:text-[4rem] lg:text-[5.5rem]">
            LET'S
            <br />
            TALK
          </h1>

          {status === "success" ? (
            <p className="mt-12 text-sm text-foreground/60">
              Thanks — I'll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 md:mt-14 space-y-8 max-w-md">
              <div>
                <label className={labelClass}>
                  Name
                </label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder=""
                />
              </div>

              <div>
                <label className={labelClass}>
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder=""
                />
              </div>

              <div>
                <label className={labelClass}>
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder=""
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong — try emailing directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 inline-flex items-center gap-2 border border-foreground/30 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <footer className="flex flex-col gap-6 mt-14 max-w-md md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5 text-foreground/50">
            <a
              href="https://linkedin.com/in/abukaradan"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={24} strokeWidth={1.75} />
            </a>
            <a
              href="https://www.instagram.com/byabukar"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="Instagram"
            >
              <InstagramIcon size={24} strokeWidth={1.75} />
            </a>
          </div>
          <a
            href="mailto:abukar.adan@gmail.com"
            className="text-[13px] uppercase tracking-[0.24em] text-foreground/50 transition-colors hover:text-foreground"
          >
            abukar.adan@gmail.com
          </a>
        </footer>
      </div>
      </div>
    </div>
  );
}
