"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Crown, Heart, MapPin, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { Service } from "@/lib/types";

const blurAmounts = [1, 2, 4, 8, 16, 28];

const maskGradients = [
  "linear-gradient(to bottom, transparent 55%, black 65%, black 100%)",
  "linear-gradient(to bottom, transparent 60%, black 70%, black 100%)",
  "linear-gradient(to bottom, transparent 65%, black 75%, black 100%)",
  "linear-gradient(to bottom, transparent 70%, black 82%, black 100%)",
  "linear-gradient(to bottom, transparent 75%, black 88%, black 100%)",
  "linear-gradient(to bottom, transparent 80%, black 94%, black 100%)",
];

export default function ServiceCard({ service }: { service: Service }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const path = `/services/${service._id}`;
  const loginRedirect = `/login?redirect=${encodeURIComponent(path)}`;

  const handleClick = () => {
    router.push(session ? path : loginRedirect);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(session ? path : loginRedirect);
    }
  };

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group relative block overflow-hidden rounded-[2rem] border border-sand/60 bg-white h-[26rem] transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(62,46,39,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
    >
      <div className="relative h-full overflow-hidden">
        {service.images[0] ? (
          <Image
            src={service.images[0]}
            alt={service.serviceName}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-sand to-caramel flex items-center justify-center">
            <Heart className="size-12 text-ivory/70" />
          </div>
        )}

        <div className="absolute inset-0 z-10 pointer-events-none">
          {blurAmounts.map((blur, index) => (
            <div
              key={blur}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                maskImage: maskGradients[index],
                WebkitMaskImage: maskGradients[index],
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 z-10 bg-gradient-to-t pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(62,46,39,0) 0%, rgba(62,46,39,0) 58%, rgba(62,46,39,0.12) 68%, rgba(62,46,39,0.35) 80%, rgba(62,46,39,0.62) 92%, rgba(62,46,39,0.8) 100%)",
          }}
        />

        <span className="absolute left-4 top-4 z-20 rounded-full bg-ivory/80 backdrop-blur px-4 py-1.5 text-xs font-semibold not-italic text-cocoa">
          {service.category}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 p-4">
        <h3 className="line-clamp-2 text-xl text-ivory font-(family-name:--font-playfair) italic leading-tight mb-2">
          {service.serviceName}
        </h3>

        <div className="flex items-center gap-x-3 text-sm text-ivory/90">
          <span className="flex items-center gap-1.5 min-w-0">
            <MapPin className="size-4 text-caramel shrink-0" />
            <span className="line-clamp-1 min-w-0">{service.location}</span>
          </span>
          <span className="flex items-center gap-1.5 min-w-0">
            <User className="size-4 text-caramel shrink-0" />
            <span className="line-clamp-1 min-w-0 truncate">{service.vendorName}</span>
            {service.vendorPremium && (
              <span className="flex items-center gap-1 rounded-full bg-caramel/20 px-2 py-0.5 text-[10px] font-medium not-italic text-ivory">
                <Crown className="size-3" />
                Premium
              </span>
            )}
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between w-full gap-4">
          <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur h-10 px-4 text-sm font-(family-name:--font-playfair) italic text-ivory w-fit">
            ${service.price}
          </span>
          <span className="group inline-flex items-center gap-2 rounded-full bg-white/18 border border-white/35 backdrop-blur-[12px] h-10 px-4 font-medium not-italic text-ivory hover:bg-white/25 transition-colors shadow-sm">
            View Details
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-[3px]" />
          </span>
        </div>
      </div>
    </article>
  );
}
