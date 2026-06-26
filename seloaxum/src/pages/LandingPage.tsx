import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OperationsSection from "@/components/OperationsSection";
import ImpactSection from "@/components/ImpactSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <OperationsSection />
        <ImpactSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
