"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { CalendarCheck, Heart, Search, Star } from "lucide-react";

const stats = [
  { value: "500+", label: "Trusted vendors" },
  { value: "12k+", label: "Happy couples" },
  { value: "4.9", label: "Average rating" },
];

const categories = [
  "Venue",
  "Photography",
  "Catering",
  "Decoration",
  "Makeup",
  "Music",
];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("search", query.trim());
    if (category) params.set("category", category);
    router.push(`/services?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-cream via-ivory to-ivory pb-24 pt-36 md:pt-44">
      <div className="pointer-events-none absolute -left-32 top-10 size-96 rounded-full bg-sand/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 size-112 rounded-full bg-caramel/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-ivory px-4 py-2 text-sm text-cocoa shadow-sm"
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

          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col gap-3 rounded-4xl border border-sand/70 bg-white/70 p-3 shadow-[0_20px_60px_rgba(62,46,39,0.12)] backdrop-blur sm:flex-row sm:items-center sm:rounded-full"
          >
            <div className="flex flex-1 items-center gap-3 px-4">
              <Search className="size-5 shrink-0 text-mocha" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search venues, photographers..."
                className="w-full bg-transparent py-3 text-espresso outline-none placeholder:text-mocha/70"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-full bg-cream px-5 py-3 text-cocoa outline-none"
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-full bg-espresso px-8 py-3.5 font-medium text-ivory transition hover:bg-cocoa"
            >
              Search
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-10"
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

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto h-130 w-full max-w-md"
        >
          <div className="absolute inset-x-6 bottom-0 top-0 rounded-t-full bg-linear-to-b from-sand via-caramel to-mocha shadow-[0_40px_80px_rgba(62,46,39,0.25)]" />
          <div className="absolute inset-x-14 bottom-8 top-10 rounded-t-full border border-ivory/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="size-32 fill-ivory/90 text-ivory/90 drop-shadow-xl" />
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-16 flex items-center gap-3 rounded-2xl bg-ivory p-4 shadow-2xl"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-latte text-cocoa">
              <CalendarCheck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold not-italic text-espresso">
                Booking confirmed
              </p>
              <p className="text-xs text-mocha">Grand Palace Venue</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 bottom-24 flex items-center gap-3 rounded-2xl bg-ivory p-4 shadow-2xl"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-latte text-cocoa">
              <Star className="size-5 fill-caramel text-caramel" />
            </span>
            <div>
              <p className="text-sm font-semibold not-italic text-espresso">
                4.9 rating
              </p>
              <p className="text-xs text-mocha">From 2,300 reviews</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
