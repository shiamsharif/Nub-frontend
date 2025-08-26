"use client";
import { FAQSection } from "./faq-section";
// import MeetContributors from "./meet-contibuters";
import ContactSection from "./contact-section";
import Reviews from "./Reviews";
import Hero from "./hero";

export function LandingPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Contributors Section */}
      {/* <MeetContributors /> */}

      {/* Reviews Section */}
      <Reviews />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
