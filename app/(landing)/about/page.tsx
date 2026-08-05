import AboutHero from "@/app/components/landing/AboutHero";
import AboutBackstory from "@/app/components/landing/AboutBackstory";
import AboutBackstory2 from "@/app/components/landing/AboutBackstory2";
import TopResources from "@/app/components/landing/TopResources";
import PopularCategories from "@/app/components/landing/PopularCategories";
import CtaSection from "@/app/components/landing/CtaSection";

export default function About() {
    return (
        <main>
            <AboutHero />

            <AboutBackstory />

            <AboutBackstory2 />

            <TopResources />

            <PopularCategories />

            <CtaSection />
        </main>
    )
}