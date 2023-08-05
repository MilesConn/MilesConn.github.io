import { writable } from "svelte/store";
type ThemeType = "dark" | "light";
// TODO: move this to nano
// https://docs.astro.build/en/core-concepts/sharing-state/

export const theme = writable<ThemeType>("dark");
