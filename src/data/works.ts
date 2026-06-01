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
    studio: "Sony Music · Campside Media",
    role: "Producer",
    award: "Ambie Winner — Podcast of the Year · #1 Apple Podcasts",
    description:
      "Two young men arrive in a Canadian town claiming they were raised in the wilderness. Nearly twenty years later, journalists Sam Mullins and Abukar Adan set out to uncover the truth.",
  },
  {
    title: "Run, Fool!",
    cover: runFool,
    studio: "Campside Media · Ballen Studios · At Will Media",
    role: "Managing Producer · Editor ",
    award: "Signal Award Winner · 11M+ Downloads",
    description:
      "A weekly horror anthology from Rodney Barnes, featuring original stories inspired by folklore, the supernatural, and the unknown.",
  },
  {
    title: "Origin Stories",
    cover: originStories,
    studio: "A Campside Media Original",
    role: "Showrunner",
    description:
      "A weekly show where acclaimed journalists, filmmakers, authors, and creators unpack the projects that defined their careers.",
  },
  {
    title: "Hollywood Con Queen",
    cover: chameleon,
    studio: "A Campside Media Original",
    role: "Associate Producer",
    description:
      "Hundreds of aspiring filmmakers are lured to Indonesia by a powerful Hollywood executive who doesn't exist.",
  },
  {
    title: "Catch Me If You Ken",
    cover: catchKen,
    studio: "Sony Music · Campside Media",
    role: "Senior Producer",
    description:
      "A globe-spanning investigation into an alleged con artist who left behind a trail of scams, aliases, and unanswered questions.",
  },
  {
    title: "Dr. Dante",
    cover: drDante,
    studio: "Sony Music · Campside Media",
    role: "Producer",
    description:
      "The story of a hypnotist-turned-con man who spent decades reinventing himself while leaving a trail of fraud and deception.",
  },
  {
    title: "Witnessed: Night Shift",
    cover: nightShift,
    studio: "Sony Music · Campside Media",
    role: "Fact-Checker",
    description:
      "Veterans begin dying under suspicious circumstances at a Missouri VA hospital. Families search for answers as questions mount around a nurse, hospital leadership, and the FBI.",
  },
  {
    title: "We Came to the Forest",
    cover: weCameToTheForest,
    studio: "Wondery · Campside · Tenderfoot",
    role: "Producer",
    description:
      "A young activist finds purpose, love, and community in a Georgia forest, until one morning changes everything.",
  },
  {
    title: "Cover Up: The Anthrax Threat",
    cover: anthraxThreat,
    studio: "Sony Music · Campside Media",
    role: "Producer",
    description:
      "After anthrax-laced letters kill five people in the weeks following 9/11, one of the largest investigations in FBI history spirals into uncertainty.",
  },
  {
    title: "The Bering",
    cover: theBering,
    studio: "Audible Original",
    role: "Associate Producer",
    description:
      "When an Alaskan fishing vessel sinks in freezing waters, 47 crew members find themselves at the center of a daring rescue mission.",
  },
];
