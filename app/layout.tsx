import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resourcefull — Get Access to Resources Fast",
  description:
    "Resourcefull is trusted by ambitious startups and enterprises of every size. Get access to resources you want as fast and easy as you can imagine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
