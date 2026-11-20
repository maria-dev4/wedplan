import RoleGuard from "@/components/dashboard/RoleGuard";
import BookingRequestsView from "@/components/dashboard/vendor/BookingRequestsView";

export default function BookingRequestsPage() {
  return (
    <RoleGuard roles={["vendor"]}>
      <BookingRequestsView />
    </RoleGuard>
  );
}
