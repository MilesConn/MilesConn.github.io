import path from "path";
import { promises as fs } from "fs";
import { globby } from "globby";
import grayMatter from "gray-matter";

(async function () {
  // prepare the dirs
  const blogSrcDir = "../";
  const srcDir = path.join(blogSrcDir, "src");
  const publicDir = path.join(blogSrcDir, "public");
  const contentDir = path.join(srcDir, "pages", "blog");
  const contentFilePattern = path.join(contentDir, "*.md");
  const indexFile = path.join(publicDir, "search-index.json");
  const getSlugFromPathname = (pathname) =>
    path.basename(pathname, path.extname(pathname));

  const contentFilePaths = await globby([contentFilePattern]);

  console.log("Found the following content: ", contentFilePaths);
  console.log("Generating slug.....");
  if (contentFilePaths.length) {
    const files = contentFilePaths.map(
      async (filePath) => await fs.readFile(filePath, "utf8")
    );
    const index = [];
    let i = 0;
    for await (let file of files) {
      const {
        data: { title, description, tags },
        content,
      } = grayMatter(file);
      index.push({
        slug: getSlugFromPathname(contentFilePaths[i]),
        category: "blog",
        title,
        description,
        tags,
        body: content,
      });
      i++;
    }
    await fs.writeFile(indexFile, JSON.stringify(index));
    console.log(
      `Indexed ${index.length} documents from ${contentDir} to ${indexFile}`
    );
  }
  console.log("Done.");
})();
