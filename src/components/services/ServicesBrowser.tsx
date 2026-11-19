import ServiceCard from "@/components/ServiceCard";
import type { Service } from "@/lib/types";

type ServicesBrowserProps = {
  services: Service[];
  loading?: boolean;
};

const skeletonSlots = [0, 1, 2, 3, 4, 5];

export default function ServicesBrowser({
  services,
  loading = false,
}: ServicesBrowserProps) {
  if (loading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skeletonSlots.map((slot) => (
          <div
            key={slot}
            className="h-[27rem] animate-pulse overflow-hidden rounded-[2rem] border border-sand/50 bg-linear-to-br from-cream via-latte to-sand/70"
          >
            <div className="flex h-full items-end p-3 sm:p-4">
              <div className="w-full rounded-3xl border border-white/50 bg-ivory/50 p-4 sm:p-5">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-sand/60" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-24 rounded-full bg-sand/60" />
                    <div className="h-2 w-16 rounded-full bg-sand/40" />
                  </div>
                </div>
                <div className="mt-4 h-2 w-16 rounded-full bg-sand/50" />
                <div className="mt-2 h-7 w-3/4 rounded-full bg-sand/50" />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="h-11 rounded-2xl bg-white/40" />
                  <div className="h-11 rounded-2xl bg-white/40" />
                </div>
                <div className="mt-4 h-px bg-sand/50" />
                <div className="mt-4 flex items-center justify-between">
                  <div className="h-7 w-20 rounded-full bg-sand/50" />
                  <div className="h-9 w-28 rounded-full bg-sand/60" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
