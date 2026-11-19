import { Suspense } from "react";
import ServicesBrowser from "@/components/services/ServicesBrowser";

export default function ServicesPage() {
  return (
    <Suspense fallback={null}>
      <ServicesBrowser />
    </Suspense>
  );
}
