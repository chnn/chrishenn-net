import type { Metadata } from "next";

import { getPosts } from "@/app/posts/utils";
import { renderMarkdoc } from "@/app/posts/markdoc";

export default async function Post({ params }: { params: { slug: string } }) {
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return "Post not found :0";
  }

  return (
    <>
      <header className="mb-4">
        <h1 className="mb-2">{post.title}</h1>
        <div className="text-lg">{post.date}</div>
      </header>
      {renderMarkdoc(post.content)}
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post not found | chrishenn.net",
    };
  }

  return {
    title: `${post.title} | chrishenn.net`,
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;
