"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import PageLoader from "./PageLoader";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (session.user.isBlocked) {
      toast.error("Your account has been blocked. Please contact support.");
      authClient.signOut().then(() => router.replace("/login"));
    }
  }, [isPending, session, pathname, router]);

  if (isPending || !session || session.user.isBlocked) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
