import Link from "next/link";
import {
  Camera,
  Flower2,
  Landmark,
  Music,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const categories = [
  { name: "Venue", icon: Landmark, text: "Grand halls, gardens and resorts" },
  { name: "Photography", icon: Camera, text: "Moments captured forever" },
  {
    name: "Catering",
    icon: UtensilsCrossed,
    text: "Feasts your guests will love",
  },
  { name: "Decoration", icon: Flower2, text: "Stages, flowers and lighting" },
  { name: "Makeup", icon: Sparkles, text: "Bridal looks that glow" },
  { name: "Music", icon: Music, text: "Bands, DJs and live singers" },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <SectionHeading
        eyebrow="Categories"
        title="Everything your big day needs"
        text="Explore the services couples love most and find the perfect match for your style."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.08}>
            <Link
              href={`/services?category=${item.name}`}
              className="group flex items-center gap-5 rounded-3xl border border-sand/60 bg-cream/60 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-caramel hover:bg-white hover:shadow-[0_24px_50px_rgba(62,46,39,0.12)]"
            >
              <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-latte text-cocoa transition group-hover:bg-espresso group-hover:text-ivory">
                <item.icon className="size-7" />
              </span>
              <div>
                <h3 className="text-2xl text-espresso">{item.name}</h3>
                <p className="mt-1 text-sm text-mocha">{item.text}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
