export interface Friend {
  id: string;
  name: string;
  role: string;
  isBestFriend?: boolean;
  image: string;
  badge: string;
  description: string;
  themeColor: string;
  tagline: string;
  facebook?: string;
  instagram?: string;
}

export const FRIENDS_DATA: Friend[] = [
  {
    id: "rasel-hossain",
    name: "Rasel Hossain",
    role: "Best Friend",
    isBestFriend: true,
    image: "./images/friends/rasel.jpg",
    badge: "★ BEST FRIEND",
    tagline: "Lifelong Brother & True Companion",
    description: "The closest bond forged through shared memories, unconditional trust, unwavering loyalty, and endless late-night conversations. More than just a best friend—a true brother in every walk of life.",
    themeColor: "#00f2fe", // Cyber Cyan Glow
    facebook: "https://www.facebook.com/senhajrasel"
  },
  {
    id: "shakib",
    name: "Shakib",
    role: "Close Friend",
    image: "./images/friends/shakib.jpg",
    badge: "CLOSE FRIEND",
    tagline: "Partner in Ambition & Creativity",
    description: "Always bringing incredible energy, visionary perspectives, and genuine support to every adventure and milestone.",
    themeColor: "#38bdf8",
    facebook: "https://www.facebook.com/sakhoyata.hosena.2025"
  },
  {
    id: "rakib",
    name: "Rakib",
    role: "Close Friend",
    image: "./images/friends/rakib.jpg",
    badge: "CLOSE FRIEND",
    tagline: "Always Loyal & High Energy",
    description: "The life of every gathering, known for steadfast loyalty, great humor, and always standing by in times of need.",
    themeColor: "#a855f7",
    facebook: "https://www.facebook.com/profile.php?id=61578995022250"
  },
  {
    id: "tahajjul",
    name: "Tahajjul",
    role: "Close Friend",
    image: "./images/friends/tahajjul.jpg",
    badge: "CLOSE FRIEND",
    tagline: "Brother in Spirit & Good Times",
    description: "A cherished friend whose sincerity, kindness, and positivity illuminate every conversation and shared memory.",
    themeColor: "#10b981",
    facebook: "https://www.facebook.com/md.tahajjul.2025"
  },
  {
    id: "asif",
    name: "Asif",
    role: "Close Friend",
    image: "./images/friends/asif.jpg",
    badge: "CLOSE FRIEND",
    tagline: "Tech & Visionary Companion",
    description: "A trusted friend with unmatched dedication, calm wisdom, and a spirit of constant curiosity and growth.",
    themeColor: "#f59e0b",
    facebook: "https://www.facebook.com/md.asif.sardar.449088"
  }
];
