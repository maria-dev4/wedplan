"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";

const stats = [
  { value: "500+", label: "Trusted vendors" },
  { value: "12k+", label: "Happy couples" },
  { value: "4.9", label: "Average rating" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pb-20 pt-32">
      <Image
        src="/images/hero.jpg"
        alt="Elegant wedding decoration"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-ivory via-ivory/90 to-ivory/25" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ivory to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-ivory/80 px-4 py-2 text-sm text-cocoa shadow-sm backdrop-blur"
          >
            <Heart className="size-4 fill-caramel text-caramel" />
            Your wedding, beautifully planned
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 text-5xl leading-[1.1] text-espresso md:text-7xl"
          >
            Plan the day you have{" "}
            <span className="text-mocha">always dreamed</span> of
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cocoa"
          >
            Discover verified venues, photographers, caterers and decorators.
            Compare, book and celebrate, all in one graceful place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-espresso px-8 py-4 text-base font-medium not-italic text-ivory shadow-xl shadow-espresso/25 transition hover:-translate-y-0.5 hover:bg-cocoa"
            >
              Explore Wedding Services
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center rounded-full border border-espresso/30 bg-ivory/70 px-8 py-4 text-base font-medium not-italic text-espresso backdrop-blur transition hover:bg-ivory"
            >
              Join as a vendor
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 flex flex-wrap gap-10"
          >
            {stats.map((item) => (
              <div key={item.label}>
                <p className="font-(family-name:--font-playfair) text-4xl italic text-espresso">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-mocha">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
