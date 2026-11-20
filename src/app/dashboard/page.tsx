"use client";

import { authClient } from "@/lib/auth-client";
import PageLoader from "@/components/PageLoader";
import {
  AdminOverview,
  CustomerOverview,
  VendorOverview,
} from "@/components/dashboard/Overviews";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return <PageLoader />;
  }

  const role = session.user.role;

  if (role === "vendor") return <VendorOverview />;
  if (role === "admin") return <AdminOverview />;
  return <CustomerOverview />;
}
