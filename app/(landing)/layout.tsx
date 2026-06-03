import type { Metadata } from "next";
import LandingNavbar from "../components/landing/LandingNavbar";
import LandingFooter from "../components/landing/LandingFooter";

export const metadata: Metadata = {
  title: "Resourcefull — Your Gateway to Professional Growth",
  description:
    "Find the perfect resources to help you secure a job and achieve your goals.",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingNavbar />
      <main className="flex-grow">{children}</main>
      <LandingFooter />
    </div>
  );
}
