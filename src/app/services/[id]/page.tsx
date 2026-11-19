import RequireAuth from "@/components/RequireAuth";
import ServiceDetails from "@/components/services/ServiceDetails";

export default function ServiceDetailsPage() {
  return (
    <RequireAuth>
      <ServiceDetails />
    </RequireAuth>
  );
}
