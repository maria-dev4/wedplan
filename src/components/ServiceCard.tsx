"use client";

import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { Service } from "@/lib/types";
import ServiceGlassCard from "./ServiceGlassCard";

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const handleView = () => {
    if (!session) {
      router.push(`/login?redirect=${pathname ?? `/services/${service.id}`}`);
      return;
    }

    router.push(`/services/${service.id}`);
  };

  return (
    <ServiceGlassCard
      serviceName={service.serviceName}
      category={service.category}
      price={service.price}
      location={service.location}
      vendorName={service.vendorName}
      image={service.images?.[0]}
      onSelect={handleView}
    />
  );
}
