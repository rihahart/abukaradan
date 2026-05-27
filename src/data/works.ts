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

export type Work = {
  title: string;
  cover: string;
  studio: string;
  role: string;
  award?: string;
  description?: string;
};

export const works: Work[] = [
  {
    title: "Wild Boys",
    cover: wildBoysCover,
    studio: "A Campside Media Original",
    role: "Producer",
    award: "Ambie Winner — Podcast of the Year · #1 Apple Podcasts",
    description:
      "A coming-of-age story about four friends from a small Midwestern town whose lives are forever changed by a single violent night. Reported and produced over two years across multiple states.",
  },
  {
    title: "Run, Fool!",
    cover: runFool,
    studio: "Ballen Studios × Campside",
    role: "Showrunner",
    award: "Signal Award Winner · 10M+ Downloads",
    description:
      "A comedy anthology series about people who made the wrong call at exactly the wrong moment — and lived to tell the tale.",
  },
  {
    title: "Origin Stories",
    cover: originStories,
    studio: "A Campside Media Original",
    role: "Executive Producer",
    description:
      "A series exploring how the world's most recognizable brands, movements, and myths were actually born — and how the real story is almost always stranger than the legend.",
  },
  {
    title: "Chameleon: Hollywood Con Queen",
    cover: chameleon,
    studio: "A Campside Media Original",
    role: "Lead Producer",
    description:
      "The story of a mysterious con artist who spent years impersonating powerful Hollywood executives and defrauding aspiring filmmakers across the globe.",
  },
  {
    title: "Catch Me If You Ken",
    cover: catchKen,
    studio: "A Campside Media Original",
    role: "Senior Producer",
    description:
      "A true-crime series following one of the most audacious financial frauds in recent memory — and the investigators who spent years trying to bring the perpetrator to justice.",
  },
  {
    title: "Chameleon: Dr. Dante",
    cover: drDante,
    studio: "A Campside Media Original",
    role: "Producer",
    description:
      "The second season of the Chameleon franchise, tracing the incredible double life of a man who convinced an entire community he was a doctor for over a decade.",
  },
  {
    title: "Witnessed: Night Shift",
    cover: nightShift,
    studio: "Sony Music · The Binge",
    role: "Lead Producer",
    description:
      "A documentary series placing ordinary people inside extraordinary moments — told entirely through firsthand accounts and immersive soundscapes.",
  },
  {
    title: "We Came to the Forest",
    cover: weCameToTheForest,
    studio: "Wondery · Campside · Tenderfoot",
    role: "Producer",
    description:
      "An environmental mystery and survival story set deep in the Pacific Northwest, uncovering what happens when idealism collides with the unforgiving wild.",
  },
  {
    title: "Cover Up: The Anthrax Threat",
    cover: anthraxThreat,
    studio: "Sony Music · The Binge",
    role: "Producer",
    description:
      "An investigative series re-examining the 2001 anthrax letter attacks — the deadliest biological assault in US history — and the troubled FBI investigation that followed.",
  },
  {
    title: "The Bering",
    cover: theBering,
    studio: "Audible Original",
    role: "Producer",
    description:
      "An immersive audio drama set aboard a research vessel in the Bering Sea, blurring the line between documentary and fiction to explore isolation, memory, and survival.",
  },
];
