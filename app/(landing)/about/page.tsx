import AboutHero from "@/app/components/landing/AboutHero";
import AboutBackstory from "@/app/components/landing/AboutBackstory";
import AboutTeam from "@/app/components/landing/AboutTeam";
import PopularCategories from "@/app/components/landing/PopularCategories";
import CtaSection from "@/app/components/landing/CtaSection";

export default function About() {
    return (
        <main>
            <AboutHero />

            <AboutBackstory />

            <AboutTeam />

            <PopularCategories />

            <CtaSection />
        </main>
    )
}