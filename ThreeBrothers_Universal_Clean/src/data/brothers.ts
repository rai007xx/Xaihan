export interface Brother {
  number: string;
  name: string;
  relationship: string;
  role: string;
  company?: string;
  description: string;
  image: string;
  website?: string;
  websiteLabel?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  themeColor: string;
}

export const BROTHERS_DATA: Brother[] = [
  {
    number: "01",
    name: "Raihan Hossain",
    relationship: "The Youngest Brother",
    role: "Student",
    description: "Raihan Hossain is the youngest brother and a student with a passion for learning, technology, creativity, and building a future through knowledge and digital skills.",
    image: "./images/raihan.jpg",
    website: "https://Xaihan.yzz.me",
    websiteLabel: "VISIT MY WEBSITE",
    facebook: "https://www.facebook.com/raihan.hossain.135758",
    themeColor: "#00f2fe"
  },
  {
    number: "02",
    name: "Ibrahim Hossain",
    relationship: "The Middle Brother",
    role: "Owner — Brothers Digital",
    company: "Brothers Digital",
    description: "Ibrahim Hossain is the middle brother and the owner of Brothers Digital. He is passionate about digital business, online opportunities, creative work, and building modern digital solutions.",
    image: "./images/ibrahim.jpg",
    website: "YOUR_BROTHERS_DIGITAL_WEBSITE_URL",
    websiteLabel: "BROTHERS DIGITAL",
    facebook: "https://www.facebook.com/ibrahim.hossain.97637",
    themeColor: "#f59e0b" // Epic Gold / Amber theme! (Changed from Purple)
  },
  {
    number: "03",
    name: "Rabiul Islam",
    relationship: "The Eldest Brother",
    role: "Founder — Flarko LLC",
    company: "Flarko LLC",
    description: "Rabiul Islam is the eldest brother and an entrepreneur focused on building and growing digital businesses. He leads Flarko LLC with a vision centered around innovation, creativity, technology, and long-term growth.",
    image: "./images/rabiul.jpg",
    website: "https://flarko.com/",
    websiteLabel: "VISIT FLARKO LLC",
    facebook: "https://www.facebook.com/HeyRabiul",
    themeColor: "#2563eb"
  }
];

export const BRAND_CONFIG = {
  mainTitle: "THE THREE BROTHERS",
  subtitle: "Three Journeys. One Family. Endless Possibilities.",
  tagline: "Different paths. One family. One vision.",
  namesShort: "RAIHAN • IBRAHIM • RABIUL",
  aboutText: `We are three brothers following three different paths.
Rabiul Islam is building businesses and leading Flarko LLC.
Ibrahim Hossain is developing his digital journey through Brothers Digital.
Raihan Hossain is currently focused on education, learning, and preparing for the future.
Our paths may be different, but our bond as brothers connects every journey.`
};
