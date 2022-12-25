// import MarkdownIt from "markdown-it";
import { remark } from "remark";
import remarxMdx from "remark-mdx";
import { visit } from "unist-util-visit";

export function extractLinks(markdownContent: () => string) {
  const links: Array<string> = [];
  remark()
    .use(remarxMdx)
    .use(() => (tree) => {
      visit(tree, ["link"], (node) => {
        // @ts-expect-error
        links.push(node.url);
      });
    })
    .processSync(markdownContent()).value;

  return links;
}
