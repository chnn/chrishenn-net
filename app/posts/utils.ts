import fs from "fs";
import path from "path";

import fg from "fast-glob";
import type { RenderableTreeNode } from "@markdoc/markdoc";

import { transformMarkdoc, renderMarkdoc } from "./markdoc";
import { findRoot } from "./findRoot";

const REPO_ROOT = findRoot(".git", __dirname);
const POST_DIR = path.join(REPO_ROOT, "content");
const POST_BASENAME_FORMAT = /^(?<date>\d\d\d\d-\d\d-\d\d)-(?<slug>.+)\.md$/;

export type Post = {
  path: string;
  slug: string;
  title: string;
  date: string;
  content: RenderableTreeNode;
};

function validatePost(
  maybePost: Record<string, unknown>,
  basename: string
): asserts maybePost is Post {
  if (typeof maybePost.slug !== "string") {
    throw new Error(`failed to parse slug from ${basename}`);
  }

  if (typeof maybePost.title !== "string") {
    throw new Error(`failed to parse title from ${basename}`);
  }

  if (typeof maybePost.date !== "string") {
    throw new Error(`failed to parse date from ${basename}`);
  }

  if (typeof maybePost.content !== "object") {
    throw new Error(
      `failed to read parse and transform content from ${basename}`
    );
  }
}

let cachedPosts: null | Post[] = null;

export async function getPosts(): Promise<Post[]> {
  if (cachedPosts) {
    return cachedPosts;
  }

  const postPaths = await fg("*.md", { cwd: POST_DIR, absolute: true });

  const posts = postPaths.map((postPath) => {
    const basename = path.basename(postPath);
    const result = POST_BASENAME_FORMAT.exec(basename);

    const source = fs.readFileSync(postPath, "utf8");
    const { frontmatter, content } = transformMarkdoc(source);

    const post = {
      path: postPath,
      title: frontmatter.title,
      slug: result?.groups?.slug,
      date: result?.groups?.date,
      content,
    };

    validatePost(post, basename);

    return post;
  });

  if (process.env.NODE_ENV === "production") {
    cachedPosts = posts;
  }

  return posts;
}
