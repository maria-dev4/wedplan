import type { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatCard({
  label,
  value,
  icon: Icon,
  loading,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  loading?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-sand/60 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(62,46,39,0.1)]">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-latte text-cocoa">
        <Icon className="size-6" />
      </span>
      {loading ? (
        <Skeleton className="mt-5 h-9 w-16 bg-latte" />
      ) : (
        <p className="mt-5 font-(family-name:--font-playfair) text-4xl italic text-espresso">
          {value}
        </p>
      )}
      <p className="mt-1 text-sm text-mocha">{label}</p>
    </div>
  );
}
