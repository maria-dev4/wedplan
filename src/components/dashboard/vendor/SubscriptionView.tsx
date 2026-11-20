"use client";

import { useState } from "react";
import { Check, Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageHeader from "../PageHeader";

type Stats = { plan: string; subscriptionExpiresAt: string | null };

const freeFeatures = [
  "Maximum 3 active services",
  "Basic vendor dashboard",
  "Booking request management",
];
const premiumFeatures = [
  "Unlimited active services",
  "Premium vendor badge",
  "All Free plan features",
];

export default function SubscriptionView() {
  const { data, loading, reload } = useApi<Stats>("/api/stats/vendor");
  const [upgrading, setUpgrading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const premium = data?.plan === "premium";

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const result = await apiFetch("/api/payments/checkout", {
        method: "POST",
      });
      window.location.assign(result.url);
    } catch (err) {
      toast.error((err as Error).message);
      setUpgrading(false);
    }
  };

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const result = await apiFetch("/api/payments/cancel", { method: "POST" });
      toast.success(result.message);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setCancelling(false);
      setConfirming(false);
      reload();
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader
          title="Subscription"
          text="Choose the plan that fits your business."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-96 rounded-4xl bg-latte" />
          <Skeleton className="h-96 rounded-4xl bg-latte" />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Subscription"
        text="Choose the plan that fits your business."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-4xl border border-sand/60 bg-white p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl text-espresso">Free</h2>
            {!premium && (
              <span className="rounded-full bg-latte px-3 py-1 text-xs not-italic text-cocoa">
                Current plan
              </span>
            )}
          </div>
          <p className="mt-4 font-(family-name:--font-playfair) text-5xl italic text-espresso">
            $0
          </p>
          <ul className="mt-6 space-y-3">
            {freeFeatures.map((item) => (
              <li key={item} className="flex items-start gap-3 text-cocoa">
                <Check className="mt-0.5 size-5 shrink-0 text-caramel" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-4xl bg-linear-to-br from-cocoa to-espresso p-8 text-ivory shadow-[0_30px_60px_rgba(62,46,39,0.25)]">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-3xl text-ivory">
              <Crown className="size-7 text-sand" />
              Premium
            </h2>
            {premium && (
              <span className="rounded-full bg-ivory px-3 py-1 text-xs not-italic text-espresso">
                Current plan
              </span>
            )}
          </div>
          <p className="mt-4 font-(family-name:--font-playfair) text-5xl italic text-ivory">
            $10<span className="text-xl text-sand"> / month</span>
          </p>
          <ul className="mt-6 space-y-3">
            {premiumFeatures.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sand">
                <Check className="mt-0.5 size-5 shrink-0 text-ivory" />
                {item}
              </li>
            ))}
          </ul>

          {premium ? (
            <div className="mt-8">
              {data?.subscriptionExpiresAt && (
                <p className="text-sm text-sand">
                  Active until {formatDate(data.subscriptionExpiresAt)}
                </p>
              )}
              <Button
                onClick={() => setConfirming(true)}
                variant="outline"
                className="mt-4 h-12 w-full rounded-full border-sand/50 bg-transparent text-ivory hover:bg-white/10 hover:text-ivory"
              >
                Cancel subscription
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleUpgrade}
              disabled={upgrading}
              className="mt-8 h-12 w-full rounded-full bg-ivory text-base text-espresso hover:bg-latte"
            >
              {upgrading && <Loader2 className="size-5 animate-spin" />}
              Upgrade to Premium
            </Button>
          )}
        </div>
      </div>

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent className="rounded-4xl border-sand/60 bg-ivory p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-espresso">
              Cancel your subscription?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-mocha">
              You keep Premium until the end of the current billing period.
              After that your account returns to the Free plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full border-sand">
              Keep Premium
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              disabled={cancelling}
              className="rounded-full bg-espresso text-ivory hover:bg-cocoa"
            >
              {cancelling ? "Cancelling..." : "Cancel subscription"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
