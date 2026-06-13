import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturedRecipes } from "@/components/landing/FeaturedRecipes";
import { AboutPreview } from "@/components/landing/AboutPreview";
import { NewsletterTeaser } from "@/components/landing/NewsletterTeaser";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedRecipes />
      <AboutPreview />
      <NewsletterTeaser />
    </>
  );
}