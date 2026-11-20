import RoleGuard from "@/components/dashboard/RoleGuard";
import TransactionsView from "@/components/dashboard/admin/TransactionsView";

export default function TransactionsPage() {
  return (
    <RoleGuard roles={["admin"]}>
      <TransactionsView />
    </RoleGuard>
  );
}
