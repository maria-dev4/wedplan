import Link from "next/link";
import { Heart } from "lucide-react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLink: string;
  footerLabel: string;
};

export default function AuthShell({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLabel,
}: AuthShellProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-cream to-ivory px-5 pb-16 pt-32">
      <div className="pointer-events-none absolute -left-28 top-20 size-96 rounded-full bg-sand/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-96 rounded-full bg-caramel/25 blur-3xl" />

      <div className="relative w-full max-w-md rounded-4xl border border-sand/60 bg-white/80 p-8 shadow-[0_30px_80px_rgba(62,46,39,0.14)] backdrop-blur md:p-10">
        <div className="text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-linear-to-br from-cocoa to-espresso text-ivory shadow-lg">
            <Heart className="size-6 fill-current" />
          </span>
          <h1 className="mt-5 text-4xl text-espresso">{title}</h1>
          <p className="mt-2 text-mocha">{subtitle}</p>
        </div>

        <div className="mt-8">{children}</div>

        <p className="mt-8 text-center text-sm text-mocha">
          {footerText}{" "}
          <Link
            href={footerLink}
            className="font-semibold text-espresso underline-offset-4 hover:underline"
          >
            {footerLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}
