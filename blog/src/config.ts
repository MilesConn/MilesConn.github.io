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
  "email me if you want to see something here",
  "YOUR AD HERE",
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
  "Sometimes we talk about compilers, sometimes not",
  "Iͪ͢ w͇̓̓o̦ͨn̢̢̿̿d̦ͤͤeͤ͜r᷀͢͢ w̳͛ẖ̌a̹͆t͈͈͒͒ e͇ͨš̞c̗̗̀̀a̛̻p̼̼̓e̘︢︢ ç͆͆h̲̿̿a̟̟͝ṙ̢̢a᷿ͤc̘̄̄t̩͐e̳ͬr̜̜ͭͭs̻ͤͤ a̬᷉r̡̔e̱̱͞͞ a͈᷈l͎᷄᷄l᷊᷊͒o̗ͮͮw̹͂ẻ̉͟͟d᷿ͬ h̼̼͗eͦͦ͜r̠̠͘͘e̝͠",
];

export const SITE = {
  // Your site's detail?
  name: "Ink",
  title: "Astro - Ink",
  description: "Crisp, minimal, personal blog theme for Astro",
  url: "https://astro-ink.vercel.app",
  githubUrl: "https://github.com/MilesConn",
  siteNames,
  descriptions,
};

export const PAGE_SIZE = 8;
