import RoleGuard from "@/components/dashboard/RoleGuard";
import MyBookingsView from "@/components/dashboard/customer/MyBookingsView";

export default function MyBookingsPage() {
  return (
    <RoleGuard roles={["customer"]}>
      <MyBookingsView />
    </RoleGuard>
  );
}
