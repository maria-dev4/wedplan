"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CircleCheck, Hourglass, Loader2, TriangleAlert } from "lucide-react";
import { apiFetch } from "@/lib/api";

type Result = {
  status: string;
  plan?: string;
  amount?: number;
  currency?: string;
};

export default function PaymentSuccess() {
  const sessionId = useSearchParams().get("session_id");
  const [result, setResult] = useState<Result | null>(null);
  const [gaveUp, setGaveUp] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const check = async () => {
      const data = await apiFetch(`/api/payments/session/${sessionId}`).catch(
        () => null,
      );
      if (cancelled) return;

      if (data?.status === "paid") {
        setResult(data);
        return;
      }

      attempts += 1;
      if (attempts >= 10) {
        setGaveUp(true);
        return;
      }
      timer = setTimeout(check, 2000);
    };

    check();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [sessionId]);

  let icon = <Loader2 className="size-10 animate-spin" />;
  let title = "Confirming your payment";
  let text = "Please wait a moment while we verify your payment with Stripe.";

  if (!sessionId) {
    icon = <TriangleAlert className="size-10" />;
    title = "Payment details missing";
    text =
      "We could not find a payment session. Check your subscription page for the latest status.";
  } else if (result) {
    icon = <CircleCheck className="size-10" />;
    title = "Payment confirmed";
    text = `Thank you! Your ${result.plan ?? "Premium"} plan is now active${
      result.amount
        ? ` (${result.amount.toFixed(2)} ${result.currency?.toUpperCase()})`
        : ""
    }.`;
  } else if (gaveUp) {
    icon = <Hourglass className="size-10" />;
    title = "Still confirming";
    text =
      "Your payment is taking longer than usual to verify. Premium turns on as soon as it is confirmed. Check your subscription page in a minute.";
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-linear-to-b from-cream to-ivory px-5 pb-16 pt-32">
      <div className="w-full max-w-lg rounded-4xl border border-sand/60 bg-white p-10 text-center shadow-[0_30px_80px_rgba(62,46,39,0.12)]">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-latte text-cocoa">
          {icon}
        </span>
        <h1 className="mt-6 text-4xl text-espresso">{title}</h1>
        <p className="mt-3 text-mocha">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/dashboard/subscription"
            className="rounded-full bg-espresso px-7 py-3 font-medium not-italic text-ivory transition hover:bg-cocoa"
          >
            View subscription
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
  );
}
