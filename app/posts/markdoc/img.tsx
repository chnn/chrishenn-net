import Image from "next/image";

import type { Schema } from "@markdoc/markdoc";

export function Img({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  const img = (
    <Image
      className="mx-auto max-w-full"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );

  if (caption) {
    return (
      <figure>
        {img}
        <figcaption className="text-center">{caption}</figcaption>
      </figure>
    );
  }

  return img;
}

export const schema: Schema = {
  render: "Img",
  children: [],
  selfClosing: true,
  attributes: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    caption: {
      type: String,
      required: false,
    },
  },
};

export const components = { Img };
