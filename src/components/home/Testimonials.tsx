import { Quote, Star } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const reviews = [
  {
    name: "Nusrat & Rafi",
    place: "Dhaka",
    text: "We found our venue and photographer in a single evening. Everything was clear, and the booking was confirmed the next morning.",
  },
  {
    name: "Tasnim & Arif",
    place: "Cumilla",
    text: "The decoration team was beyond our imagination. Planning felt light and joyful from start to finish.",
  },
  {
    name: "Farhana & Imran",
    place: "Chattogram",
    text: "As a vendor, the dashboard made it simple to manage requests. As a couple, it saved us weeks of searching.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="Love notes"
        title="Stories from happy couples"
        text="Real words from people who planned their day with WedPlan."
      />

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {reviews.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.12}>
            <div className="relative h-full rounded-3xl border border-sand/60 bg-cream/70 p-8">
              <Quote className="size-10 text-caramel/60" />
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-caramel text-caramel" />
                ))}
              </div>
              <p className="mt-5 leading-relaxed text-cocoa">{item.text}</p>
              <div className="mt-7 flex items-center gap-3 border-t border-sand/60 pt-6">
                <span className="flex size-12 items-center justify-center rounded-full bg-espresso font-(family-name:--font-playfair) text-lg italic text-ivory">
                  {item.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-espresso">{item.name}</p>
                  <p className="text-sm text-mocha">{item.place}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
