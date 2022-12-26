export function objectToCss(styles: Record<string, string>) {
  return Object.entries(styles)
    .map(([key, value]) => `--${key}:${value}`)
    .join(";");
}
