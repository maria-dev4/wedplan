import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";

export default function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-cocoa via-espresso to-espresso px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-caramel/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-sand/10 blur-3xl" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-4xl text-ivory md:text-6xl">
              Are you a wedding vendor?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-sand">
              Join WedPlan, showcase your services to thousands of couples and
              grow your business with ease.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-ivory px-8 py-4 font-medium text-espresso transition hover:-translate-y-0.5 hover:bg-latte"
              >
                Join as a vendor
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-sand/50 px-8 py-4 font-medium text-ivory transition hover:bg-white/10"
              >
                Browse services
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
