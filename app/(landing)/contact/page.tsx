import ContactHero from "@/app/components/landing/ContactHero";
import ContactForm from "@/app/components/landing/ContactForm";
import CtaSection from "@/app/components/landing/CtaSection";
import PopularCategories from "@/app/components/landing/PopularCategories";

export default function Contact() {
    return (
        <main>
            <ContactHero />
            <ContactForm />
            <PopularCategories />
            <CtaSection />
        </main>
    )
}