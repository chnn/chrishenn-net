import Link from "next/link";

export function Nav() {
  return (
    <nav className="prose mx-auto p-4 lg:p-8 flex justify-between">
      <Link href="/posts">chrishenn.net</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
