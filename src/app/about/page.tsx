import type { Metadata } from "next";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { DishPlaceholder } from "@/components/shared/DishPlaceholder";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${SITE_NAME} — ${SITE_TAGLINE}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="eyebrow">About</p>
      <h1 className="mt-4 mb-3 font-serif text-4xl font-light leading-[1.05] sm:text-6xl">
        {SITE_NAME}
      </h1>
      <p className="mb-10 font-serif text-xl font-light italic text-muted-foreground">
        {SITE_TAGLINE}
      </p>
      <div className="mb-12 rule rule-accent" />

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg prose-headings:font-serif prose-headings:font-normal prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        <DishPlaceholder className="not-prose mb-10 aspect-[2/1] w-full" />

        <h2>Your Food, My Way</h2>

        <p>
          Welcome to <strong>{SITE_NAME}</strong> — a cooking blog that believes great food 
          shouldn&apos;t be complicated. Every recipe here has been tested, tweaked, and perfected 
          so you can cook with confidence.
        </p>

        <p>
          The name says it all: we take the food you already love and give it our own spin. 
          Classic techniques with modern shortcuts. Familiar flavors with unexpected twists. 
          <em> Your food, my way.</em>
        </p>

        <h2>What You&apos;ll Find Here</h2>

        <ul>
          <li>
            <strong>Approachable recipes</strong> — No 20-step processes for a Tuesday dinner. 
            Every recipe is designed to fit into real life.
          </li>
          <li>
            <strong>Nutritional information</strong> — Every recipe includes per-serving nutrition 
            data so you can make informed choices.
          </li>
          <li>
            <strong>Printable recipe cards</strong> — Print-friendly layouts so you can cook 
            without a screen.
          </li>
          <li>
            <strong>Honest opinions</strong> — I&apos;ll tell you what worked, what didn&apos;t, 
            and what I&apos;d change next time.
          </li>
        </ul>

        <h2>The Philosophy</h2>

        <p>
          Cooking should be joyful, not stressful. It should bring people together, not 
          overwhelm them with obscure ingredients and restaurant techniques. My grandmother 
          never used a recipe — she cooked by feel, by taste, by memory. This blog is my 
          attempt to capture that spirit and share it with you.
        </p>

        <h2>Let&apos;s Connect</h2>

        <p>
          Found a recipe you love? Made something your own? I&apos;d love to hear about it. 
          Follow along on social media for daily updates, behind-the-scenes content, and 
          plenty of food photography.
        </p>

        <div className="not-prose mt-6">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}