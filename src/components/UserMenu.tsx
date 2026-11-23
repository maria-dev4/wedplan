"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return <div className="h-11 w-28 animate-pulse rounded-full bg-latte" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-full px-5 py-2.5 text-[15px] font-medium text-espresso transition hover:text-espresso"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-espresso px-6 py-2.5 text-[15px] font-medium text-ivory shadow-lg shadow-espresso/20 transition hover:-translate-y-0.5 hover:bg-cocoa"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-sand bg-ivory py-1.5 pl-1.5 pr-3 outline-none transition hover:bg-latte">
        <Avatar className="size-9">
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback className="bg-espresso font-(family-name:--font-playfair) text-lg italic text-ivory">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="size-4 text-cocoa" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-3xl border-sand/60 bg-ivory p-3"
      >
        <div className="rounded-2xl bg-cream px-4 py-3">
          <p className="truncate font-semibold not-italic text-espresso">
            {user.name}
          </p>
          <p className="truncate text-xs text-mocha">{user.email}</p>
          <span className="mt-2 inline-block rounded-full bg-espresso px-3 py-0.5 text-xs capitalize text-ivory">
            {user.role}
          </span>
        </div>

        <DropdownMenuItem
          render={<Link href="/dashboard" />}
          className="mt-2 cursor-pointer rounded-2xl px-4 py-3 text-cocoa"
        >
          <LayoutDashboard className="size-5" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link href="/dashboard/profile" />}
          className="cursor-pointer rounded-2xl px-4 py-3 text-cocoa"
        >
          <Settings className="size-5" />
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-sand/60" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer rounded-2xl px-4 py-3 text-cocoa"
        >
          <LogOut className="size-5" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
