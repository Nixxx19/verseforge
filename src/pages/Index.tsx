import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AudioPlayerSection from "@/components/AudioPlayerSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatisticsSection from "@/components/StatisticsSection";

import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AudioPlayerSection />
      <TestimonialsSection />
      <StatisticsSection />
      <Footer />
    </div>
  );
};

export default Index;
