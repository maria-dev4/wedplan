import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, Wallet } from "lucide-react";

type ServiceGlassCardProps = {
  serviceName: string;
  category: string;
  price: number;
  location: string;
  vendorName: string;
  image?: string;
  href?: string;
  onSelect?: () => void;
};

export default function ServiceGlassCard({
  serviceName,
  category,
  price,
  location,
  vendorName,
  image,
  href,
  onSelect,
}: ServiceGlassCardProps) {
  const words = serviceName.trim().split(/\s+/);
  const accentWord = words.pop() ?? "";
  const leadingWords = words.join(" ");
  const priceLabel = new Intl.NumberFormat("en-US").format(price);
  const vendorInitial = vendorName.trim().charAt(0).toUpperCase() || "W";
  const actionClass =
    "absolute inset-0 z-30 rounded-[2rem] border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-inset";

  return (
    <article className="group relative h-[27rem] w-full overflow-hidden rounded-[2rem] bg-espresso shadow-[0_20px_50px_rgba(62,46,39,0.18)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_38px_70px_rgba(62,46,39,0.32)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="absolute inset-0">
        {image ? (
          <Image
            src={image}
            alt={`${serviceName} by ${vendorName}`}
            fill
            unoptimized
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08] motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-sand to-caramel">
            <Heart className="size-20 fill-ivory/20 text-ivory/70" />
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-espresso/95 via-espresso/40 to-espresso/5" />
      <div className="absolute inset-0 bg-linear-to-br from-cocoa/20 via-transparent to-espresso/25" />

      <div className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%] motion-reduce:hidden" />

      <span className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] not-italic text-ivory shadow-[0_8px_24px_rgba(62,46,39,0.18)]">
        <span className="size-1.5 rounded-full bg-sand" />
        {category}
      </span>

      <div className="relative z-20 flex h-full flex-col justify-end p-3 sm:p-4">
        <div className="relative rounded-3xl border border-white/50 bg-ivory/55 p-4 shadow-[0_20px_50px_rgba(62,46,39,0.25),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-2xl backdrop-saturate-150 sm:p-5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-espresso font-(family-name:--font-playfair) text-sm italic text-ivory">
              {vendorInitial}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold not-italic text-cocoa">
                {vendorName}
              </p>
              <p className="text-[9px] uppercase tracking-[0.16em] not-italic text-mocha/80">
                Verified vendor
              </p>
            </div>
          </div>

          <p className="mt-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] not-italic text-mocha">
            {category}
          </p>

          <h3 className="mt-1.5 line-clamp-2 text-3xl leading-[1.08] text-espresso">
            {leadingWords && <>{leadingWords} </>}
            <span className="text-mocha">{accentWord}</span>
          </h3>

          <div className="mt-3.5 grid grid-cols-2 gap-2">
            <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-white/60 bg-white/40 px-2.5 py-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-ivory/70 text-caramel">
                <MapPin className="size-3.5" />
              </span>
              <div className="min-w-0">
                <p className="text-[8px] font-semibold uppercase tracking-[0.14em] not-italic text-mocha/80">
                  Location
                </p>
                <p className="truncate text-[11px] leading-tight not-italic text-cocoa">
                  {location}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-white/60 bg-white/40 px-2.5 py-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-ivory/70 text-caramel">
                <Wallet className="size-3.5" />
              </span>
              <div className="min-w-0">
                <p className="text-[8px] font-semibold uppercase tracking-[0.14em] not-italic text-mocha/80">
                  Starting from
                </p>
                <p className="truncate text-[11px] leading-tight not-italic text-cocoa">
                  ${priceLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3.5 border-t border-sand/60" />

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="font-(family-name:--font-playfair) text-3xl italic leading-none text-espresso">
                ${priceLabel}
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.14em] not-italic text-mocha/80">
                per service
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-linear-to-r from-caramel to-cocoa px-4 py-2.5 text-xs font-semibold not-italic text-ivory shadow-[0_10px_24px_rgba(62,46,39,0.25)]">
              View Details
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
            </span>
          </div>
        </div>
      </div>

      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          aria-label={`View details for ${serviceName}`}
          className={`${actionClass} cursor-pointer`}
        />
      ) : (
        <Link
          href={href ?? "/services"}
          aria-label={`View details for ${serviceName}`}
          className={actionClass}
        />
      )}
    </article>
  );
}
