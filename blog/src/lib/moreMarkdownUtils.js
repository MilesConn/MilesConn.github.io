import { visit } from "unist-util-visit";

export function randomBorderCaps() {
  return function transformer(tree) {
    visit(tree, "blockquote", (node) => {
      // Get a random number (either 0 or 1)
      const randomNum = Math.floor(Math.random() * 2);

      // Depending on the random number, assign a class
      const randomClass = randomNum === 0 ? "square" : "triangle";
      //   const randomClass = "square";

      console.log("Found a blockquote!");
      // If the node has a data property with an hProperties (often used for HTML attributes like class), use it,
      // else initialize it. Then add or override the class property with the random class.
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.class = node.data.hProperties.class
        ? node.data.hProperties.class + " " + randomClass
        : randomClass;
    });
  };
}
