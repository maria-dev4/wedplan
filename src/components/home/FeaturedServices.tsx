import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import ServiceGlassCard from "../ServiceGlassCard";

const services = [
  {
    title: "Royal Garden Venue",
    category: "Venue",
    vendor: "Grand Palace Events",
    location: "Dhaka",
    price: 2500,
    rating: 4.9,
    tone: "from-sand to-caramel",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cinematic Wedding Shoot",
    category: "Photography",
    vendor: "Lens & Light Studio",
    location: "Cumilla",
    price: 800,
    rating: 4.8,
    tone: "from-latte to-mocha",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Signature Feast Catering",
    category: "Catering",
    vendor: "Spice Route Kitchen",
    location: "Chattogram",
    price: 1200,
    rating: 4.7,
    tone: "from-caramel to-cocoa",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Floral Dream Stage",
    category: "Decoration",
    vendor: "Petal & Pearl",
    location: "Dhaka",
    price: 950,
    rating: 4.9,
    tone: "from-cream to-caramel",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Bridal Glow Package",
    category: "Makeup",
    vendor: "Aura Beauty Lounge",
    location: "Cumilla",
    price: 450,
    rating: 4.8,
    tone: "from-sand to-mocha",
    image:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Live Band Evening",
    category: "Music",
    vendor: "Sundown Sessions",
    location: "Sylhet",
    price: 700,
    rating: 4.6,
    tone: "from-latte to-cocoa",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function FeaturedServices() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <SectionHeading
        eyebrow="Featured"
        title="Popular services this season"
        text="Hand-picked favourites from our most loved vendors."
      />

      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((item, index) => (
          <Reveal key={item.title} delay={(index % 3) * 0.1}>
            <ServiceGlassCard
              serviceName={item.title}
              vendorName={item.vendor}
              category={item.category}
              location={item.location}
              price={item.price}
              image={item.image}
              href="/services"
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full border border-espresso px-8 py-3.5 font-medium text-espresso transition hover:bg-espresso hover:text-ivory"
        >
          View all services
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </section>
  );
}
