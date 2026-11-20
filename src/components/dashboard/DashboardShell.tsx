"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { navByRole } from "@/lib/dashboard-nav";
import PageLoader from "@/components/PageLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function NavList({
  role,
  onNavigate,
  collapsed = false,
}: {
  role: string;
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const items = navByRole[role] || [];

  return (
    <nav aria-label="Dashboard navigation" className="space-y-1.5">
      {items.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
            className={`flex items-center rounded-2xl py-3 text-[15px] font-medium not-italic transition-all duration-300 ${
              collapsed ? "justify-center px-0" : "gap-3 px-4"
            } ${
              active
                ? "bg-espresso text-ivory shadow-lg shadow-espresso/20"
                : "text-cocoa hover:bg-latte hover:text-espresso"
            }`}
          >
            <item.icon className="size-5 shrink-0" />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                collapsed ? "max-w-0 opacity-0" : "max-w-48 opacity-100"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function UserCard({
  name,
  email,
  image,
  role,
  premium,
  collapsed = false,
}: {
  name: string;
  email: string;
  image?: string | null;
  role: string;
  premium: boolean;
  collapsed?: boolean;
}) {
  return (
    <div
      className={`mb-5 flex items-center rounded-3xl bg-cream transition-all duration-300 ${
        collapsed ? "justify-center gap-0 p-1" : "gap-3 p-4"
      }`}
    >
      <Avatar className="size-12 shrink-0" title={collapsed ? name : undefined}>
        <AvatarImage src={image || undefined} alt={name} />
        <AvatarFallback className="bg-espresso font-(family-name:--font-playfair) text-xl italic text-ivory">
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          collapsed ? "max-w-0 opacity-0" : "min-w-0 max-w-full opacity-100"
        }`}
      >
        <p className="truncate font-semibold not-italic text-espresso">
          {name}
        </p>
        <p className="truncate text-xs text-mocha">{email}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-espresso px-2.5 py-0.5 text-[11px] capitalize not-italic text-ivory">
            {role}
          </span>
          {premium && (
            <span className="flex items-center gap-1 rounded-full bg-caramel px-2.5 py-0.5 text-[11px] not-italic text-ivory">
              <Crown className="size-3" />
              Premium
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (!session) {
    return <PageLoader />;
  }

  const { name, email, image, role, subscriptionPlan, subscriptionExpiresAt } =
    session.user;
  const premium =
    role === "vendor" &&
    subscriptionPlan === "premium" &&
    !!subscriptionExpiresAt &&
    new Date(subscriptionExpiresAt) > new Date();
  return (
    <section className="min-h-screen bg-linear-to-b from-cream to-ivory pb-16 pt-28">
      <div className="mx-auto flex max-w-7xl gap-8 px-5 md:px-8">
        <aside
          id="dashboard-sidebar"
          className={`hidden shrink-0 transition-[width] duration-300 ease-in-out lg:block ${
            collapsed ? "w-20" : "w-72"
          }`}
        >
          <div
            className={`sticky top-28 rounded-4xl border border-sand/60 bg-white/80 shadow-[0_20px_50px_rgba(62,46,39,0.08)] backdrop-blur transition-[padding] duration-300 ease-in-out ${
              collapsed ? "p-3" : "p-5"
            }`}
          >
            <div
              className={`mb-4 flex ${
                collapsed ? "justify-center" : "justify-end"
              }`}
            >
              <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                aria-expanded={!collapsed}
                aria-controls="dashboard-sidebar"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="flex size-9 items-center justify-center rounded-full bg-latte text-espresso transition-colors hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
              >
                {collapsed ? (
                  <PanelLeftOpen className="size-4" />
                ) : (
                  <PanelLeftClose className="size-4" />
                )}
              </button>
            </div>
            <UserCard
              name={name}
              email={email}
              image={image}
              role={role}
              premium={premium}
              collapsed={collapsed}
            />{" "}
            <NavList role={role} collapsed={collapsed} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between rounded-3xl border border-sand/60 bg-white/80 p-3 lg:hidden">
            <span className="px-3 text-lg capitalize text-espresso">
              {role} dashboard
            </span>
            <button
              onClick={() => setOpen(true)}
              className="flex size-11 items-center justify-center rounded-full bg-latte text-espresso"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>

          {children}
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-80 bg-ivory p-5">
          <SheetHeader className="p-0">
            <SheetTitle className="text-2xl text-espresso">
              Dashboard
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <UserCard
              name={name}
              email={email}
              image={image}
              role={role}
              premium={premium}
            />{" "}
            <NavList role={role} onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
