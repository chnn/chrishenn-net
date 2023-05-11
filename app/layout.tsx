import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "chrishenn.net",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="prose mx-auto my-8">
        <nav className="mb-16 flex justify-between">
          <Link href="/posts">chrishenn.net</Link>
          <Link href="/about">About</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
