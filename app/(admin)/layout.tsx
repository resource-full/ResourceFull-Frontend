import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Resourcefull",
  description: "Platform overview and management.",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
