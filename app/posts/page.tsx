import Link from "next/link";

import { getPosts } from "@/app/posts/utils";
import { Metadata } from "next";
import { Nav } from "@/app/posts/Nav";

const EXTERNAL_POSTS = [
  {
    url: "https://observablehq.com/@chnn/running-ramer-douglas-peucker-on-typed-arrays",
    date: "2018-08-11",
    title:
      "A fast JavaScript implementation of the Ramer-Douglas-Peucker algorithm",
  },
  {
    url: "https://observablehq.com/@chnn/2d-lattices-and-finite-subsets-of-a-circle",
    date: "2018-05-02",
    title: "A homeomorphism from 2D lattices to finite subsets of the circle",
  },
  {
    url: "https://observablehq.com/@chnn/the-action-of-the-modular-group-on-the-upper-half-plane",
    date: "2018-04-20",
    title: "The action of the modular group on the upper half plane",
  },
];

export default async function Posts() {
  const posts = await getPosts();

  const listItems = [
    ...EXTERNAL_POSTS,
    ...posts.map((post) => ({
      url: `/posts/${post.slug}`,
      title: post.title,
      date: post.date,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <h1>Posts</h1>
      {listItems.map((item) => (
        <h2 key={item.url} className="prose-lg my-4">
          <Link className="" href={item.url}>
            {item.title}
          </Link>
          <div className="prose-base font-normal text-gray-600">
            {item.date}
          </div>
        </h2>
      ))}
    </>
  );
}

export const metadata: Metadata = {
  title: "Posts | chrishenn.net",
};
