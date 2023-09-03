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
  // TODO: get rid of this
  // tags: {
  //   path: "/tags",
  //   title: "tags",
  // },
};

const siteNames = [
  "Ephemeral Homestead",
  "99% Downtime",
  "Teenage Caveman",
  "underdefined?",
  ":O",
  "0:",
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

// TODO: check env for URL
// const URL = process.env.

export const SITE = {
  name: "Miles",
  title: "the ephemeral homestead",
  description: "Crisp, minimal, personal blog theme for Astro",
  url: "https://milesconn.io",
  githubUrl: "https://github.com/MilesConn",
  twitterUrl: "https://twitter.com/technoHimbo",
  siteNames,
  descriptions,
};

export const PAGE_SIZE = 8;
