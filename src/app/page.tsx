import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompanyOverviewSection from "@/components/CompanyOverviewSection";
import ServicesSection from "@/components/ServicesSection";
import PGBNSection from "@/components/PGBNSection";
import FleetTechSection from "@/components/FleetTechSection";
import CoverageSection from "@/components/CoverageSection";
import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CompanyOverviewSection />
        <ServicesSection />
        <PGBNSection />
        <FleetTechSection />
        <CoverageSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
