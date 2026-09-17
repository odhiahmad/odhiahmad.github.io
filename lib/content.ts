export type Lang = "id" | "en";

export const SITE = {
  name: "Odhi Ahmad Hidayat",
  role: "Full Stack Developer",
  url: "https://odhiahmad.github.io",
  email: "odhiahmad15@gmail.com",
  wa: "6285272993360",
  github: "https://github.com/odhiahmad",
  descId:
    "Portfolio & CV Odhi Ahmad Hidayat — Full Stack Developer yang membangun aplikasi Android, iOS, dan Web dengan Go, Flutter, React, dan React Native. Berpengalaman di fintech, pemerintahan, kesehatan, dan retail.",
  descEn:
    "Portfolio & CV of Odhi Ahmad Hidayat — Full Stack Developer building Android, iOS, and Web apps with Go, Flutter, React, and React Native. Experienced across fintech, government, healthcare, and retail.",
};

export type ProjectLink = { href: string; labelId: string; labelEn: string };
export type Project = {
  id: string;
  title: string;
  year: string; // i18n key, or a literal prefixed with "@" (e.g. "@2020")
  tagKey: string;
  descKey: string;
  link?: ProjectLink;
  tags: string[];
  images: { src: string; alt: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "klinika",
    title: "Klinika",
    year: "y.nexa",
    tagKey: "p.klinika.tag",
    descKey: "p.klinika.desc",
    link: { href: "https://www.kreativitasinergi.com/#klinika", labelId: "Kreativita Sinergi", labelEn: "Kreativita Sinergi" },
    tags: ["Go", "React", "TypeScript", "PostgreSQL"],
    images: [
      { src: "/assets/klinika-1.jpg", alt: "Klinika — sistem manajemen klinik" },
      { src: "/assets/klinika-2.jpg", alt: "Klinika — dashboard klinik" },
    ],
  },
  {
    id: "inventra",
    title: "Inventra",
    year: "y.nexa",
    tagKey: "p.inventra.tag",
    descKey: "p.inventra.desc",
    link: { href: "https://www.kreativitasinergi.com/#inventra", labelId: "Kreativita Sinergi", labelEn: "Kreativita Sinergi" },
    tags: ["Go", "React", "TypeScript", "Telegram Bot"],
    images: [
      { src: "/assets/inventra-1.jpg", alt: "Inventra — manajemen gudang & stok" },
      { src: "/assets/inventra-2.jpg", alt: "Inventra — ringkasan stok" },
    ],
  },
  {
    id: "nexa",
    title: "NexaCloud",
    year: "y.nexa",
    tagKey: "p.nexa.tag",
    descKey: "p.nexa.desc",
    link: { href: "https://odhiahmad.github.io/nexa-cloud/", labelId: "Live Demo", labelEn: "Live Demo" },
    tags: ["Figma", "HTML", "CSS", "JavaScript"],
    images: [
      { src: "/assets/nexa-cloud-1.jpg", alt: "NexaCloud — hero landing page" },
      { src: "/assets/nexa-cloud-2.jpg", alt: "NexaCloud — marketplace aplikasi" },
      { src: "/assets/nexa-cloud-3.jpg", alt: "NexaCloud — insight & blog" },
    ],
  },
  {
    id: "simrs",
    title: "SIM RS",
    year: "2020",
    tagKey: "p.simrs.tag",
    descKey: "p.simrs.desc",
    link: { href: "https://play.google.com/store/apps/details?id=com.rsudpadangpanjang", labelId: "Play Store", labelEn: "Play Store" },
    tags: ["React Native", "Laravel", "Axios"],
    images: [
      { src: "/assets/sim-rs-1.jpg", alt: "SIM RS — Play Store listing" },
      { src: "/assets/sim-rs-2.jpg", alt: "SIM RS — app detail" },
    ],
  },
  {
    id: "abon",
    title: "ABON — Absensi Online",
    year: "2020",
    tagKey: "p.abon.tag",
    descKey: "p.abon.desc",
    tags: ["React Native", "Geolocation", "Axios"],
    images: [
      { src: "/assets/abon-1.jpg", alt: "ABON — App Store listing" },
      { src: "/assets/abon-2.jpg", alt: "ABON — attendance dashboard" },
    ],
  },
  {
    id: "madani",
    title: "Sumbar Madani",
    year: "2021",
    tagKey: "p.madani.tag",
    descKey: "p.madani.desc",
    link: { href: "https://play.google.com/store/apps/details?id=com.kominfosumbar.sumbarmadani", labelId: "Play Store", labelEn: "Play Store" },
    tags: ["React Native", "Firebase"],
    images: [
      { src: "/assets/sumbar-madani-1.jpg", alt: "Sumbar Madani — home screen" },
      { src: "/assets/sumbar-madani-2.jpg", alt: "Sumbar Madani — App Store" },
      { src: "/assets/sumbar-madani-3.jpg", alt: "Sumbar Madani — Play Store" },
    ],
  },
  {
    id: "warung",
    title: "Warung Tepat",
    year: "y.now",
    tagKey: "p.warung.tag",
    descKey: "p.warung.desc",
    link: { href: "https://play.google.com/store/apps/details?id=com.btpns.lmd", labelId: "Play Store", labelEn: "Play Store" },
    tags: ["React Native", "Redux", "Firebase"],
    images: [
      { src: "/assets/warung-tepat-1.jpg", alt: "Warung Tepat — home screen" },
      { src: "/assets/warung-tepat-2.jpg", alt: "Warung Tepat — login screen" },
    ],
  },
  {
    id: "sitepat",
    title: "Sitepat",
    year: "y.now",
    tagKey: "p.sitepat.tag",
    descKey: "p.sitepat.desc",
    link: { href: "https://play.google.com/store/apps/details?id=com.btpns.individualfinancing", labelId: "Play Store", labelEn: "Play Store" },
    tags: ["React Native", "Redux", "Firebase"],
    images: [
      { src: "/assets/sitepat-1.jpg", alt: "Sitepat — account dashboard" },
      { src: "/assets/sitepat-2.jpg", alt: "Sitepat — login screen" },
    ],
  },
  {
    id: "tepati",
    title: "Tepati",
    year: "y.now",
    tagKey: "p.tepati.tag",
    descKey: "p.tepati.desc",
    tags: ["React Native", "Redux", "SQLite"],
    images: [
      { src: "/assets/tepati-1.jpg", alt: "Tepati — login screen" },
      { src: "/assets/tepati-2.jpg", alt: "Tepati — acquisition pipeline" },
    ],
  },
  {
    id: "websitepat",
    title: "Web Sitepat",
    year: "2021",
    tagKey: "p.websitepat.tag",
    descKey: "p.websitepat.desc",
    tags: ["React", "Redux", "JWT"],
    images: [
      { src: "/assets/web-sitepat-1.jpg", alt: "Web Sitepat — analytics dashboard" },
      { src: "/assets/web-sitepat-2.jpg", alt: "Web Sitepat — login" },
      { src: "/assets/web-sitepat-3.jpg", alt: "Web Sitepat — charts" },
    ],
  },
  {
    id: "rece",
    title: "BRI RECE",
    year: "2021",
    tagKey: "p.rece.tag",
    descKey: "p.rece.desc",
    tags: ["React", "TypeScript"],
    images: [
      { src: "/assets/bri-rece-1.jpg", alt: "BRI RECE — registration screen" },
      { src: "/assets/bri-rece-2.jpg", alt: "BRI RECE — welcome screen" },
    ],
  },
  {
    id: "simpen",
    title: "SIMPEN",
    year: "2020–2021",
    tagKey: "p.simpen.tag",
    descKey: "p.simpen.desc",
    tags: ["Laravel", "MySQL"],
    images: [
      { src: "/assets/simpen-1.jpg", alt: "SIMPEN — login page" },
      { src: "/assets/simpen-2.jpg", alt: "SIMPEN — procurement dashboard" },
    ],
  },
  {
    id: "engine",
    title: "Engine Vue & Express",
    year: "2020–2021",
    tagKey: "p.engine.tag",
    descKey: "p.engine.desc",
    tags: ["Vue", "Express", "Node.js"],
    images: [
      { src: "/assets/engine-1.jpg", alt: "Engine V12 — landing page" },
      { src: "/assets/engine-2.jpg", alt: "Engine V12 — user management" },
    ],
  },
];

export const SKILLS = [
  "Go (Gin)",
  "Flutter & Dart",
  "React / React Native",
  "TypeScript",
  "Next.js",
  "Vue.js",
  "Laravel / PHP",
  "Node.js / Express",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Riverpod / Redux / Zustand",
  "Firebase",
  "REST API Design",
  "JWT Auth",
  "Git & CI/CD",
];

export const STATS = [
  { icon: "rocket", count: 12, key: "stat.apps" },
  { icon: "clock", count: 7, key: "stat.years" },
  { icon: "building", count: 4, key: "stat.industries" },
  { icon: "layers", count: 8, key: "stat.stacks" },
];

// Structural CV timeline (text pulled from dict by key).
export type CvItem = {
  dateKey: string;
  titleKey?: string;
  title?: string;
  placeKey?: string;
  place?: string;
  descKey?: string;
  liKeys?: string[];
  edu?: boolean;
};

export const CV: CvItem[] = [
  { dateKey: "cv.1.date", title: "Founder & Full Stack Developer", placeKey: "cv.1.place", descKey: "cv.1.desc", liKeys: ["cv.1.li1", "cv.1.li2", "cv.1.li3", "cv.1.li4"] },
  { dateKey: "cv.2.date", titleKey: "cv.2.title", place: "BTPN Syariah", descKey: "cv.2.desc", liKeys: ["cv.2.li1", "cv.2.li2", "cv.2.li3"] },
  { dateKey: "cv.3.date", titleKey: "cv.3.title", place: "Sagara Technology", liKeys: ["cv.3.li1", "cv.3.li2"] },
  { dateKey: "cv.4.date", titleKey: "cv.4.title", place: "Binar Academy", descKey: "cv.4.desc" },
  { dateKey: "cv.5.date", titleKey: "cv.5.title", place: "KOMINFO Sumatera Barat", liKeys: ["cv.5.li1", "cv.5.li2"] },
  { dateKey: "cv.6.date", titleKey: "cv.6.title", placeKey: "cv.6.place", descKey: "cv.6.desc" },
  { dateKey: "cv.7.date", titleKey: "cv.7.title", place: "PTIPD UIN SUSKA Riau", descKey: "cv.7.desc" },
  { dateKey: "@2014 — 2019", titleKey: "cv.edu.title", placeKey: "cv.edu.place", descKey: "cv.edu.desc", edu: true },
];
