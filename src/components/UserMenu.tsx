"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
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
          className="rounded-full px-5 py-2.5 text-[15px] font-medium text-cocoa transition hover:text-espresso"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-espresso px-6 py-2.5 text-[15px] font-medium text-ivory shadow-lg shadow-espresso/20 transition hover:-translate-y-0.5 hover:bg-cocoa"
        >
          Get Started
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div ref={boxRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-sand bg-ivory py-1.5 pl-1.5 pr-3 transition hover:bg-latte"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-espresso font-(family-name:--font-playfair) text-lg italic text-ivory">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <ChevronDown
          className={`size-4 text-cocoa transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-3xl border border-sand/60 bg-ivory p-3 shadow-[0_24px_60px_rgba(62,46,39,0.18)]">
          <div className="rounded-2xl bg-cream px-4 py-3">
            <p className="truncate font-semibold not-italic text-espresso">
              {user.name}
            </p>
            <p className="truncate text-xs text-mocha">{user.email}</p>
            <span className="mt-2 inline-block rounded-full bg-espresso px-3 py-0.5 text-xs capitalize text-ivory">
              {user.role}
            </span>
          </div>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-cocoa transition hover:bg-latte hover:text-espresso"
          >
            <LayoutDashboard className="size-5" />
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-cocoa transition hover:bg-latte hover:text-espresso"
          >
            <LogOut className="size-5" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
