import React from "react";
import type { ReactNode } from "react";
import yaml from "js-yaml";
import Markdoc from "@markdoc/markdoc";
import type { RenderableTreeNode, Config } from "@markdoc/markdoc";

import * as aside from "./aside";
import * as tex from "./tex";
import * as iframe from "./iframe";
import * as img from "./img";

const MARKDOC_CONFIG: Config = {
  tags: {
    aside: aside.schema,
    tex: tex.schema,
    iframe: iframe.schema,
    img: img.schema,
  },
};

const COMPONENTS = {
  ...aside.components,
  ...tex.components,
  ...iframe.components,
  ...img.components,
};

function parseFrontmatter(frontmatter: string): Record<string, unknown> {
  return yaml.load(frontmatter) as Record<string, unknown>;
}

export function transformMarkdoc(source: string): {
  frontmatter: Record<string, unknown>;
  content: RenderableTreeNode;
} {
  const ast = Markdoc.parse(source);

  // TODO: Display this in the UI during development
  // const errors = Markdoc.validate(ast, MARKDOC_CONFIG);

  const result = {
    frontmatter: parseFrontmatter(ast.attributes.frontmatter),
    content: Markdoc.transform(ast, MARKDOC_CONFIG),
  };

  return result;
}

export function renderMarkdoc(content: RenderableTreeNode): ReactNode {
  return Markdoc.renderers.react(content, React, {
    components: COMPONENTS,
  });
}
