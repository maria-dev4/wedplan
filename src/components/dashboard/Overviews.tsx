"use client";

import Link from "next/link";
import {
  CalendarCheck,
  CalendarClock,
  CalendarX,
  CircleCheck,
  ClipboardList,
  CreditCard,
  Crown,
  Hourglass,
  Package,
  Store,
  UserRound,
  Users,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useApi } from "@/lib/use-api";
import PageHeader from "./PageHeader";
import StatCard from "./StatCard";

type VendorStats = {
  totalServices: number;
  activeServices: number;
  pendingRequests: number;
  acceptedBookings: number;
  plan: string;
  subscriptionExpiresAt: string | null;
};

type CustomerStats = {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
};

type AdminStats = {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalServices: number;
  pendingServices: number;
  totalTransactions: number;
};

function useName() {
  const { data: session } = authClient.useSession();
  return session?.user.name.split(" ")[0] ?? "";
}

export function VendorOverview() {
  const name = useName();
  const { data, loading } = useApi<VendorStats>("/api/stats/vendor");
  const premium = data?.plan === "premium";

  return (
    <>
      <PageHeader
        title={`Welcome back, ${name}`}
        text="Here is how your business is doing."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total services"
          value={data?.totalServices ?? 0}
          icon={Package}
          loading={loading}
        />
        <StatCard
          label="Active services"
          value={data?.activeServices ?? 0}
          icon={CircleCheck}
          loading={loading}
        />
        <StatCard
          label="Pending requests"
          value={data?.pendingRequests ?? 0}
          icon={Hourglass}
          loading={loading}
        />
        <StatCard
          label="Accepted bookings"
          value={data?.acceptedBookings ?? 0}
          icon={CalendarCheck}
          loading={loading}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-sand/60 bg-white p-7">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-espresso text-ivory">
            <Crown className="size-7" />
          </span>
          <div>
            <p className="text-sm text-mocha">Current subscription plan</p>
            <p className="text-3xl capitalize text-espresso">
              {loading ? "..." : data?.plan}
            </p>
            {premium && data?.subscriptionExpiresAt && (
              <p className="text-xs text-mocha">
                Active until{" "}
                {new Date(data.subscriptionExpiresAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        <Link
          href="/dashboard/subscription"
          className="rounded-full bg-espresso px-7 py-3 font-medium not-italic text-ivory transition hover:bg-cocoa"
        >
          {premium ? "Manage plan" : "Upgrade to Premium"}
        </Link>
      </div>
    </>
  );
}

export function CustomerOverview() {
  const name = useName();
  const { data, loading } = useApi<CustomerStats>("/api/stats/customer");

  return (
    <>
      <PageHeader
        title={`Welcome back, ${name}`}
        text="Track every booking request in one place."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total booking requests"
          value={data?.total ?? 0}
          icon={ClipboardList}
          loading={loading}
        />
        <StatCard
          label="Pending bookings"
          value={data?.pending ?? 0}
          icon={CalendarClock}
          loading={loading}
        />
        <StatCard
          label="Accepted bookings"
          value={data?.accepted ?? 0}
          icon={CalendarCheck}
          loading={loading}
        />
        <StatCard
          label="Rejected bookings"
          value={data?.rejected ?? 0}
          icon={CalendarX}
          loading={loading}
        />
      </div>

      <div className="mt-8 rounded-3xl border border-sand/60 bg-white p-7">
        <h2 className="text-2xl text-espresso">Planning something new?</h2>
        <p className="mt-2 text-mocha">
          Explore verified vendors and send a booking request in minutes.
        </p>
        <Link
          href="/services"
          className="mt-5 inline-block rounded-full bg-espresso px-7 py-3 font-medium not-italic text-ivory transition hover:bg-cocoa"
        >
          Browse services
        </Link>
      </div>
    </>
  );
}

export function AdminOverview() {
  const name = useName();
  const { data, loading } = useApi<AdminStats>("/api/stats/admin");

  return (
    <>
      <PageHeader
        title={`Welcome back, ${name}`}
        text="A quick look at the whole platform."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Registered users"
          value={data?.totalUsers ?? 0}
          icon={Users}
          loading={loading}
        />
        <StatCard
          label="Vendors"
          value={data?.totalVendors ?? 0}
          icon={Store}
          loading={loading}
        />
        <StatCard
          label="Customers"
          value={data?.totalCustomers ?? 0}
          icon={UserRound}
          loading={loading}
        />
        <StatCard
          label="Total services"
          value={data?.totalServices ?? 0}
          icon={Package}
          loading={loading}
        />
        <StatCard
          label="Pending services"
          value={data?.pendingServices ?? 0}
          icon={Hourglass}
          loading={loading}
        />
        <StatCard
          label="Transactions"
          value={data?.totalTransactions ?? 0}
          icon={CreditCard}
          loading={loading}
        />
      </div>
    </>
  );
}
