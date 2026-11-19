"use client";

import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-40">
      <h1 className="text-4xl text-espresso">Dashboard</h1>
      <p className="mt-3 text-cocoa">
        Signed in as {session?.user.name} ({session?.user.role})
      </p>
    </div>
  );
}
