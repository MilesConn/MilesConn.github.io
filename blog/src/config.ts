import type { NavItems } from "./types";

export const NAV_ITEMS: NavItems = {
  home: {
    path: "/",
    title: "home",
  },
  blog: {
    path: "/blog",
    title: "blog",
  },
  tags: {
    path: "/tags",
    title: "tags",
  },
  about: {
    path: "/about",
    title: "about",
  },
};

const siteNames = [
  "Ephemeral Homestead",
  "99% Downtime",
  "Teenage Caveman",
  "underdefined?",
  ":O",
];
const descriptions = [
  "ummmmmmmmmmmm",
  "You know this is randomly generated right?",
  "Adventures through the nth dimension",
  "Literally just vibes",
  "DROP database important_stuff;",
  "This website is DEFINITELY written in Rust",
  "This website is DEFINITELY written in COBOL",
  "Welcome to part 88/1204 on my fortran 2 html transpiler",
];

export const SITE = {
  // Your site's detail?
  name: "Ink",
  title: "Astro - Ink",
  description: "Crisp, minimal, personal blog theme for Astro",
  url: "https://astro-ink.vercel.app",
  githubUrl: "https://github.com/one-aalam/astro-ink",
  listDrafts: true,
  siteNames,
  descriptions,
  // description ?
};

export const PAGE_SIZE = 8;
