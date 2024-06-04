import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import Testimonial from "@/components/UI/HomePage/Testimonial/Testimonial";
import RecentLostItem from "@/components/UI/RecentLostItem/RecentLostItem";

export default function page() {
  return (
    <>
      <HeroSection />
      <RecentLostItem />
      <Testimonial />
    </>
  );
}
