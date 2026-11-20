"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import { publicFetch } from "@/lib/api";
import type { Service } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import ServiceCard from "../ServiceCard";

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    publicFetch("/api/services/featured")
      .then((data) => setServices(data.services))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <SectionHeading
        eyebrow="Featured"
        title="Popular services this season"
        text="Hand-picked favourites from our most loved vendors."
      />

      {loading && (
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-96 w-full rounded-3xl bg-latte"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-14 rounded-3xl border border-sand/60 bg-white p-12 text-center">
          <p className="not-italic text-espresso">{error}</p>
        </div>
      )}

      {!loading && !error && services.length === 0 && (
        <div className="mt-14 rounded-3xl border border-dashed border-sand bg-white/60 p-14 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-latte text-cocoa">
            <PackageSearch className="size-8" />
          </span>
          <h3 className="mt-5 text-3xl text-espresso">
            Services are coming soon
          </h3>
          <p className="mt-2 text-mocha">
            Our vendors are preparing something beautiful. Check back shortly.
          </p>
        </div>
      )}

      {!loading && !error && services.length > 0 && (
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service._id} delay={(index % 3) * 0.1}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mt-14 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full border border-espresso px-8 py-3.5 font-medium not-italic text-espresso transition hover:bg-espresso hover:text-ivory"
        >
          View all services
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </section>
  );
}
