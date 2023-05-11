import type { Schema } from "@markdoc/markdoc";

export function Iframe({ src }: { src: string }) {
  return (
    <iframe
      src={src}
      width="100%"
      height="400"
      frameBorder="0"
      allowFullScreen
    />
  );
}

export const schema: Schema = {
  render: "Iframe",
  children: [],
  selfClosing: true,
  attributes: {
    src: {
      type: String,
      required: true,
    },
  },
};

export const components = {
  Iframe,
};
