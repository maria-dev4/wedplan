"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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
}: {
  role: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const items = navByRole[role] || [];

  return (
    <nav className="space-y-1.5">
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
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium not-italic transition ${
              active
                ? "bg-espresso text-ivory shadow-lg shadow-espresso/20"
                : "text-cocoa hover:bg-latte hover:text-espresso"
            }`}
          >
            <item.icon className="size-5" />
            {item.label}
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
}: {
  name: string;
  email: string;
  image?: string | null;
  role: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 rounded-3xl bg-cream p-4">
      <Avatar className="size-12">
        <AvatarImage src={image || undefined} alt={name} />
        <AvatarFallback className="bg-espresso font-(family-name:--font-playfair) text-xl italic text-ivory">
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate font-semibold not-italic text-espresso">
          {name}
        </p>
        <p className="truncate text-xs text-mocha">{email}</p>
        <span className="mt-1 inline-block rounded-full bg-espresso px-2.5 py-0.5 text-[11px] capitalize not-italic text-ivory">
          {role}
        </span>
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

  if (!session) {
    return <PageLoader />;
  }

  const { name, email, image, role } = session.user;

  return (
    <section className="min-h-screen bg-linear-to-b from-cream to-ivory pb-16 pt-28">
      <div className="mx-auto flex max-w-7xl gap-8 px-5 md:px-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-28 rounded-4xl border border-sand/60 bg-white/80 p-5 shadow-[0_20px_50px_rgba(62,46,39,0.08)] backdrop-blur">
            <UserCard name={name} email={email} image={image} role={role} />
            <NavList role={role} />
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
            <UserCard name={name} email={email} image={image} role={role} />
            <NavList role={role} onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
