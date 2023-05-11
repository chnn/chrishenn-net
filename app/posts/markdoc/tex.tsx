import { Tag } from "@markdoc/markdoc";
import type {
  Config,
  Node,
  RenderableTreeNode,
  Schema,
} from "@markdoc/markdoc";
import katex from "katex";

export function TeX({
  children,
  display,
}: {
  children: string;
  display: boolean;
}) {
  const html = katex.renderToString(children, {
    displayMode: display,
    output: "mathml",
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function transform(node: Node, config: Config): RenderableTreeNode {
  let childTextContent = "";
  for (const n of node.walk()) {
    if (n.type === "text") {
      const content = n.attributes.content
        .trim()
        .replace(/\\(\[.*\])?$/, (p1: string) => `\\${p1}`); // lol

      childTextContent += content;
      childTextContent += "\n";
    }
  }

  return new Tag("TeX", node.transformAttributes(config), [
    childTextContent.trim(),
  ]);
}

export const schema: Schema = {
  render: "TeX",
  children: ["text"],
  transform,
  attributes: {
    display: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};

export const components = {
  TeX,
};
