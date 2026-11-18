"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-sand/50 bg-ivory/80 py-3 shadow-[0_8px_30px_rgba(62,46,39,0.08)] backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-cocoa to-espresso text-ivory shadow-lg">
            <Heart className="size-5 fill-current" />
          </span>
          <span className="font-(family-name:--font-playfair) text-2xl font-semibold italic text-espresso">
            WedPlan
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-full px-5 py-2 text-[15px] font-medium transition-colors ${
                    active
                      ? "bg-latte text-espresso"
                      : "text-cocoa hover:bg-cream hover:text-espresso"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
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

        <button
          onClick={() => setOpen(!open)}
          className="flex size-11 items-center justify-center rounded-full bg-latte text-espresso md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-5 mt-3 rounded-3xl border border-sand/60 bg-ivory p-5 shadow-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-2xl px-4 py-3 font-medium ${
                      pathname === link.href
                        ? "bg-latte text-espresso"
                        : "text-cocoa"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                href="/login"
                className="rounded-full border border-sand py-3 text-center font-medium text-espresso"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-espresso py-3 text-center font-medium text-ivory"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
