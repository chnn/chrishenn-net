import type { Schema } from "@markdoc/markdoc";

export function Aside({
  children,
  type,
}: {
  children: React.ReactNode;
  type?: "info" | "warning";
}) {
  return (
    <aside
      className={`text-sm border-l-8 ${
        type === "warning" ? "border-l-red-400" : "border-l-blue-400"
      } px-6 py-1 text-gray-700 italic my-8 not-prose`}
    >
      {children}
    </aside>
  );
}

export const schema: Schema = {
  render: "Aside",
  attributes: {
    type: {
      type: String,
      required: false,
    },
  },
};

export const components = { Aside };
