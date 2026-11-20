import Hero from "@/components/home/Hero";
import FeaturedServices from "@/components/home/FeaturedServices";
import Categories from "@/components/home/Categories";
import WhyUs from "@/components/home/WhyUs";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <Categories />
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </>
  );
}
