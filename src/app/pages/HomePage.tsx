import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { OurStorySection } from "../components/OurStorySection";
import { EventDetailsSection } from "../components/EventDetailsSection";
import { RSVPSection } from "../components/RSVPSection";
import { FooterSection } from "../components/FooterSection";

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      <Navbar />
      <HeroSection />
      <OurStorySection />
      <EventDetailsSection />
      <RSVPSection />
      <FooterSection />
    </div>
  );
}
