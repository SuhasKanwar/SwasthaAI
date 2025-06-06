import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}