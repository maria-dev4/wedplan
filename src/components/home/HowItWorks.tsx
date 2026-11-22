import { CalendarCheck, PartyPopper, Search } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const steps = [
  {
    icon: Search,
    title: "Discover",
    text: "Search and filter verified vendors by category, price and rating until you find your match.",
  },
  {
    icon: CalendarCheck,
    title: "Book",
    text: "Pick your event date, send a booking request and get a quick response from the vendor.",
  },
  {
    icon: PartyPopper,
    title: "Celebrate",
    text: "Relax while everything comes together, then enjoy a day made of your favourite moments.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="How it works"
          title="Three simple steps to your perfect day"
          text="Planning a wedding should feel joyful, not stressful."
        />

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-11 hidden border-t-2 border-dashed border-sand md:block" />
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.12}
              className="relative text-center"
            >
              <span className="relative mx-auto flex size-22 items-center justify-center rounded-full bg-ivory text-cocoa shadow-xl ring-8 ring-cream">
                <step.icon className="size-9" />
                <span className="absolute -right-1 -top-1 flex size-8 items-center justify-center rounded-full bg-espresso text-sm font-semibold text-ivory">
                  {index + 1}
                </span>
              </span>
              <h3 className="mt-6 text-3xl text-espresso">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-mocha">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
