import { BadgeCheck, CreditCard, Headset, ShieldCheck } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified vendors",
    text: "Every service is reviewed and approved by our team before it goes live.",
  },
  {
    icon: ShieldCheck,
    title: "Safe bookings",
    text: "Clear booking status from request to confirmation, with no double bookings.",
  },
  {
    icon: CreditCard,
    title: "Secure payments",
    text: "Vendor subscriptions are handled through trusted and encrypted checkout.",
  },
  {
    icon: Headset,
    title: "Friendly support",
    text: "Questions before or after a booking? We are always one message away.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-espresso py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          light
          eyebrow="Why choose us"
          title="Why choose WedPlan?"
          text="We take care of the details so you can enjoy the journey."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1.5 hover:bg-white/10">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-caramel/20 text-sand">
                  <item.icon className="size-7" />
                </span>
                <h3 className="mt-6 text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-sand/80">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
