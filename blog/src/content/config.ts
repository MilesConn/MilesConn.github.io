import { defineCollection, z } from "astro:content";

// TODO: this is so cool and I'll deal with this later
// https://docs.astro.build/en/guides/content-collections/#what-are-content-collections
const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      cover: image().refine((img) => img.width >= 1080, {
        message: "Cover image must be at least 1080 pixels wide!",
      }),
      coverAlt: z.string(),
    }),
});

export const collections = {
  blog: blogCollection,
};
