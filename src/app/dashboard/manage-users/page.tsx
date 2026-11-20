import RoleGuard from "@/components/dashboard/RoleGuard";
import ManageUsersView from "@/components/dashboard/admin/ManageUsersView";

export default function ManageUsersPage() {
  return (
    <RoleGuard roles={["admin"]}>
      <ManageUsersView />
    </RoleGuard>
  );
}
