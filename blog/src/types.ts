export type NavItems = {
  [key: string]: NavItem;
};

export type NavItem = {
  path: string;
  title: string;
};

export interface Frontmatter {
  // TODO:
  date: string;
}
