import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedServices from "@/components/home/FeaturedServices";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <FeaturedServices />
      <WhyUs />
      <Testimonials />
      <CallToAction />
    </>
  );
}
