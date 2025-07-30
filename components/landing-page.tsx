"use client";
import { FAQSection } from "./faq-section";
import MeetContributors from "./meet-contibuters";
import ContactSection from "./contact-section";
import Reviews from "./Reviews";
import Hero from "./hero";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Contributors Section */}
      <MeetContributors />

      {/* Reviews Section */}
      <Reviews />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
