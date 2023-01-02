import path, { dirname } from "path";
import { fileURLToPath } from "url";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { preprocessThrelte } from "@threlte/preprocess";
import { defineConfig } from "astro/config";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename); // Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
// @ts-check

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */
  {
    // root: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
    // outDir: './dist',       // When running `astro build`, path to final static output
    // publicDir: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
    // site: "https://astro-ink.vercel.app",
    integrations: [
      mdx(),
      // Adding the preprocessor here does something weird
      // and breaks typescript support
      // svelte({ preprocess: [preprocessThrelte()] }),
      svelte(),
      tailwind({
        config: {
          applyBaseStyles: false,
        },
      }),
      sitemap(),
    ],
    vite: {
      plugins: [],
      resolve: {
        alias: {
          $: path.resolve(__dirname, "./src"),
        },
      },
      ssr: {
        noExternal: ["three", "troika-three-text"],
      },
      optimizeDeps: {
        allowNodeBuiltins: true,
      },
    },
  }
);
