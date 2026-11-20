import RoleGuard from "@/components/dashboard/RoleGuard";
import SubscriptionView from "@/components/dashboard/vendor/SubscriptionView";

export default function SubscriptionPage() {
  return (
    <RoleGuard roles={["vendor"]}>
      <SubscriptionView />
    </RoleGuard>
  );
}
