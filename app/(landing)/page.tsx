import Hero from "@/app/components/landing/Hero";
import Pathways from "@/app/components/landing/Pathways";
import PopularCategories from "@/app/components/landing/PopularCategories";
import HowItWorks from "@/app/components/landing/HowItWorks";
import RelevantResources from "@/app/components/landing/RelevantResources";
import TopContributors from "@/app/components/landing/TopContributors";
import CtaSection from "@/app/components/landing/CtaSection";
import CommunityTestimonials from "@/app/components/landing/CommunityTestimonials";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <PopularCategories />
      <Pathways />
      <CommunityTestimonials />
      <TopContributors />
      <CtaSection />
    </>
  );
}
