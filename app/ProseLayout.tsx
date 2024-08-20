import Link from "next/link";
import { ReactNode } from "react";

export function ProseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="prose mx-auto p-4 lg:p-8 flex justify-between">
        <Link href="/posts">chrishenn.net</Link>
        <Link href="/about">About</Link>
      </nav>
      <div className="prose mx-auto p-4 lg:p-8">{children}</div>
    </>
  );
}
