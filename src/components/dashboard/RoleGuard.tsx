"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import PageLoader from "@/components/PageLoader";

export default function RoleGuard({
  roles,
  children,
}: {
  roles: string[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const allowed = Boolean(session && roles.includes(session.user.role));

  useEffect(() => {
    if (isPending || !session || allowed) return;
    toast.error("You do not have access to that page.");
    router.replace("/dashboard");
  }, [isPending, session, allowed, router]);

  if (!allowed) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
