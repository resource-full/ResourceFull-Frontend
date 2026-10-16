import Hero from "@/app/components/landing/Hero";
import Pathways from "@/app/components/landing/Pathways";
import HowItWorks from "@/app/components/landing/HowItWorks";
import TopContributors from "@/app/components/landing/TopContributors";
import CtaSection from "@/app/components/landing/CtaSection";
import CommunityTestimonials from "@/app/components/landing/CommunityTestimonials";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Pathways />
      <CommunityTestimonials />
      <TopContributors />
      <CtaSection />
    </>
  );
}
