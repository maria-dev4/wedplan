import RoleGuard from "@/components/dashboard/RoleGuard";
import MyServicesView from "@/components/dashboard/vendor/MyServicesView";

export default function MyServicesPage() {
  return (
    <RoleGuard roles={["vendor"]}>
      <MyServicesView />
    </RoleGuard>
  );
}
