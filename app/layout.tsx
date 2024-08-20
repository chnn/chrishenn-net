import Link from "next/link";
import "./globals.css";
import Providers from "@/app/Providers";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
