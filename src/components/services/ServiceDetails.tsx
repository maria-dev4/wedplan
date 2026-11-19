"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Info, MapPin, TriangleAlert } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { publicFetch } from "@/lib/api";
import type { Service } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import BookingDialog from "./BookingDialog";

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = authClient.useSession();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError("");

    publicFetch(`/api/services/${id}`)
      .then((data) => {
        if (!ignore) setService(data.service);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="h-112 w-full rounded-4xl bg-latte" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 bg-latte" />
            <Skeleton className="h-12 w-3/4 bg-latte" />
            <Skeleton className="h-6 w-1/2 bg-latte" />
            <Skeleton className="h-40 w-full bg-latte" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-5 pb-24 pt-44 text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-latte text-cocoa">
          <TriangleAlert className="size-9" />
        </span>
        <h1 className="mt-6 text-4xl text-espresso">Service unavailable</h1>
        <p className="mt-3 text-mocha">
          {error || "This service could not be found."}
        </p>
        <Link
          href="/services"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3 font-medium not-italic text-ivory transition hover:bg-cocoa"
        >
          <ArrowLeft className="size-4" />
          Back to services
        </Link>
      </div>
    );
  }

  const role = session?.user.role;
  const isOwner = session?.user.id === service.vendorId;

  return (
    <section className="bg-linear-to-b from-cream to-ivory pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm not-italic text-cocoa transition hover:text-espresso"
        >
          <ArrowLeft className="size-4" />
          Back to services
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="relative h-80 overflow-hidden rounded-4xl bg-latte shadow-[0_30px_60px_rgba(62,46,39,0.15)] md:h-112">
              {service.images[active] && (
                <Image
                  src={service.images[active]}
                  alt={service.serviceName}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  className="object-cover"
                />
              )}
            </div>

            {service.images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {service.images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActive(index)}
                    className={`relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                      active === index
                        ? "border-espresso"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="5rem"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="inline-block rounded-full bg-latte px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] not-italic text-cocoa">
              {service.category}
            </span>
            <h1 className="mt-4 text-4xl text-espresso md:text-5xl">
              {service.serviceName}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-cocoa">
              <MapPin className="size-5 text-caramel" />
              {service.location}
            </p>

            <p className="mt-6 text-sm text-mocha">
              Starting from{" "}
              <span className="font-(family-name:--font-playfair) text-5xl italic text-espresso">
                ${service.price}
              </span>
            </p>

            <div className="mt-8 flex items-center gap-4 rounded-3xl border border-sand/60 bg-white p-5">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-espresso font-(family-name:--font-playfair) text-2xl italic text-ivory">
                {service.vendorName.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-mocha">
                  Vendor
                </p>
                <p className="truncate text-lg font-semibold not-italic text-espresso">
                  {service.vendorName}
                </p>
                <p className="truncate text-sm text-mocha">
                  {service.vendorEmail}
                </p>
              </div>
            </div>

            <div className="mt-8">
              {role === "admin" && (
                <p className="flex items-start gap-3 rounded-2xl bg-latte px-5 py-4 text-sm not-italic text-cocoa">
                  <Info className="mt-0.5 size-5 shrink-0" />
                  Admin accounts cannot submit booking requests.
                </p>
              )}
              {role !== "admin" && isOwner && (
                <p className="flex items-start gap-3 rounded-2xl bg-latte px-5 py-4 text-sm not-italic text-cocoa">
                  <Info className="mt-0.5 size-5 shrink-0" />
                  This is your own service, so you cannot book it.
                </p>
              )}
              {role !== "admin" && !isOwner && (
                <BookingDialog service={service} />
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-4xl border border-sand/60 bg-white p-8 md:p-10">
          <h2 className="text-3xl text-espresso">About this service</h2>
          <p className="mt-4 whitespace-pre-line leading-relaxed text-cocoa">
            {service.description}
          </p>
        </div>
      </div>
    </section>
  );
}
