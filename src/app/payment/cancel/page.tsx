import Link from "next/link";
import { CircleX } from "lucide-react";
import RequireAuth from "@/components/RequireAuth";

export default function PaymentCancelPage() {
  return (
    <RequireAuth>
      <section className="flex min-h-screen items-center justify-center bg-linear-to-b from-cream to-ivory px-5 pb-16 pt-32">
        <div className="w-full max-w-lg rounded-4xl border border-sand/60 bg-white p-10 text-center shadow-[0_30px_80px_rgba(62,46,39,0.12)]">
          <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-latte text-cocoa">
            <CircleX className="size-10" />
          </span>
          <h1 className="mt-6 text-4xl text-espresso">Payment cancelled</h1>
          <p className="mt-3 text-mocha">
            No charge was made. You can upgrade whenever you are ready.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard/subscription"
              className="rounded-full bg-espresso px-7 py-3 font-medium not-italic text-ivory transition hover:bg-cocoa"
            >
              Try again
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-sand px-7 py-3 font-medium not-italic text-cocoa transition hover:bg-latte"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </section>
    </RequireAuth>
  );
}
