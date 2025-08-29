import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AudioPlayerSection from "@/components/AudioPlayerSection";
import CreateSection from "@/components/CreateSection";
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
      <CreateSection />
      <TestimonialsSection />
      <StatisticsSection />
      <Footer />
    </div>
  );
};

export default Index;
