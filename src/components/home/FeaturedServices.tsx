import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const services = [
  {
    title: "Royal Garden Venue",
    category: "Venue",
    vendor: "Grand Palace Events",
    location: "Dhaka",
    price: 2500,
    rating: 4.9,
    tone: "from-sand to-caramel",
  },
  {
    title: "Cinematic Wedding Shoot",
    category: "Photography",
    vendor: "Lens & Light Studio",
    location: "Cumilla",
    price: 800,
    rating: 4.8,
    tone: "from-latte to-mocha",
  },
  {
    title: "Signature Feast Catering",
    category: "Catering",
    vendor: "Spice Route Kitchen",
    location: "Chattogram",
    price: 1200,
    rating: 4.7,
    tone: "from-caramel to-cocoa",
  },
  {
    title: "Floral Dream Stage",
    category: "Decoration",
    vendor: "Petal & Pearl",
    location: "Dhaka",
    price: 950,
    rating: 4.9,
    tone: "from-cream to-caramel",
  },
  {
    title: "Bridal Glow Package",
    category: "Makeup",
    vendor: "Aura Beauty Lounge",
    location: "Cumilla",
    price: 450,
    rating: 4.8,
    tone: "from-sand to-mocha",
  },
  {
    title: "Live Band Evening",
    category: "Music",
    vendor: "Sundown Sessions",
    location: "Sylhet",
    price: 700,
    rating: 4.6,
    tone: "from-latte to-cocoa",
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
            <article className="group overflow-hidden rounded-3xl border border-sand/60 bg-white transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(62,46,39,0.14)]">
              <div className={`relative h-52 bg-linear-to-br ${item.tone}`}>
                <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-4 py-1.5 text-xs font-semibold text-cocoa backdrop-blur">
                  {item.category}
                </span>
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-espresso/80 px-3 py-1.5 text-xs text-ivory backdrop-blur">
                  <Star className="size-3.5 fill-current" />
                  {item.rating}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl text-espresso">{item.title}</h3>
                <p className="mt-1 text-sm text-mocha">by {item.vendor}</p>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-cocoa">
                  <MapPin className="size-4 text-caramel" />
                  {item.location}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-latte pt-5">
                  <p className="text-sm text-mocha">
                    From{" "}
                    <span className="font-(family-name:--font-playfair) text-2xl italic text-espresso">
                      ${item.price}
                    </span>
                  </p>
                  <Link
                    href="/services"
                    className="flex size-11 items-center justify-center rounded-full bg-latte text-cocoa transition group-hover:bg-espresso group-hover:text-ivory"
                  >
                    <ArrowRight className="size-5" />
                  </Link>
                </div>
              </div>
            </article>
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
