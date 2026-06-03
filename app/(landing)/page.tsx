import Hero from "@/app/components/landing/Hero";
import PopularCategories from "@/app/components/landing/PopularCategories";
import HowItWorks from "@/app/components/landing/HowItWorks";
import Stories from "@/app/components/landing/Stories";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <HowItWorks />
      <Stories />
    </>
  );
}
