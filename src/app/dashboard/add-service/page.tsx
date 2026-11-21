import RoleGuard from "@/components/dashboard/RoleGuard";
import AddServiceView from "@/components/dashboard/vendor/AddServiceView";

export default function AddServicePage() {
  return (
    <RoleGuard roles={["vendor"]}>
      <AddServiceView />
    </RoleGuard>
  );
}
