"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { Service } from "@/lib/types";

export default function ServiceCard({ service }: { service: Service }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleView = () => {
    const path = `/services/${service._id}`;
    router.push(session ? path : `/login?redirect=${encodeURIComponent(path)}`);
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-sand/60 bg-white transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(62,46,39,0.14)]">
      <div className="relative h-56 overflow-hidden bg-latte">
        {service.images[0] && (
          <Image
            src={service.images[0]}
            alt={service.serviceName}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-espresso/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-4 py-1.5 text-xs font-semibold not-italic text-cocoa backdrop-blur">
          {service.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="line-clamp-1 text-2xl text-espresso">
          {service.serviceName}
        </h3>

        <div className="mt-3 flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-latte text-sm font-semibold not-italic text-cocoa">
            {service.vendorName.charAt(0).toUpperCase()}
          </span>
          <p className="truncate text-sm text-mocha">by {service.vendorName}</p>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-sm text-cocoa">
          <MapPin className="size-4 text-caramel" />
          {service.location}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-latte pt-5">
          <p className="text-sm text-mocha">
            From{" "}
            <span className="font-(family-name:--font-playfair) text-2xl italic text-espresso">
              ${service.price}
            </span>
          </p>
          <button
            onClick={handleView}
            className="flex items-center gap-2 rounded-full bg-latte px-5 py-2.5 text-sm font-medium not-italic text-cocoa transition hover:bg-espresso hover:text-ivory"
          >
            View Details
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
