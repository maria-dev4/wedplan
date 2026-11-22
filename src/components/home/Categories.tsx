import Link from "next/link";
import {
  Camera,
  Flower2,
  Landmark,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/lib/constants";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const categoryDetails: Record<string, { icon: LucideIcon; text: string }> = {
  "Photography & Videography": {
    icon: Camera,
    text: "Moments captured forever",
  },
  "Wedding Venues": {
    icon: Landmark,
    text: "Grand halls, gardens and resorts",
  },
  "Decoration & Florist": {
    icon: Flower2,
    text: "Stages, flowers and lighting",
  },
  "Catering Services": {
    icon: UtensilsCrossed,
    text: "Feasts your guests will love",
  },
  "Makeup & Styling": { icon: Sparkles, text: "Bridal looks that glow" },
  "Wedding Fashion": { icon: Shirt, text: "Outfits for the big day" },
};

const fallback = { icon: Sparkles, text: "Explore trusted vendors" };

export default function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="Categories"
        title="Everything your big day needs"
        text="Explore the services couples love most and find the perfect match for your style."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((name, index) => {
          const { icon: Icon, text } = categoryDetails[name] ?? fallback;

          return (
            <Reveal key={name} delay={index * 0.08}>
              <Link
                href={`/services?category=${encodeURIComponent(name)}`}
                className="group flex items-center gap-5 rounded-3xl border border-sand/60 bg-cream/60 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-caramel hover:bg-white hover:shadow-[0_24px_50px_rgba(62,46,39,0.12)]"
              >
                <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-latte text-cocoa transition group-hover:bg-espresso group-hover:text-ivory">
                  <Icon className="size-7" />
                </span>
                <div>
                  <h3 className="text-xl text-espresso">{name}</h3>
                  <p className="mt-1 text-sm text-mocha">{text}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
