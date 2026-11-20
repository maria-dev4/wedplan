import RoleGuard from "@/components/dashboard/RoleGuard";
import ManageServicesView from "@/components/dashboard/admin/ManageServicesView";

export default function ManageServicesPage() {
  return (
    <RoleGuard roles={["admin"]}>
      <ManageServicesView />
    </RoleGuard>
  );
}
