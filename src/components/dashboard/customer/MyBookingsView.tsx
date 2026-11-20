"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  CalendarHeart,
  Eye,
  MapPin,
  Store,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import { formatDate, formatEventDate } from "@/lib/format";
import type { Booking } from "@/lib/types";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PageHeader from "../PageHeader";
import StatusBadge from "../StatusBadge";

export default function MyBookingsView() {
  const { data, loading, error, reload } = useApi<{ bookings: Booking[] }>(
    "/api/bookings/mine",
  );
  const [viewing, setViewing] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState<Booking | null>(null);
  const [busy, setBusy] = useState(false);

  const bookings = data?.bookings ?? [];

  const confirmCancel = async () => {
    if (!cancelling) return;
    setBusy(true);
    try {
      const result = await apiFetch(`/api/bookings/${cancelling._id}/cancel`, {
        method: "PATCH",
      });
      toast.success(result.message);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
      setCancelling(null);
      reload();
    }
  };

  return (
    <>
      <PageHeader
        title="My bookings"
        text="Every booking request you have sent, with its latest status."
      />

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-40 w-full rounded-3xl bg-latte"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-sand/60 bg-white p-10 text-center">
          <p className="not-italic text-espresso">{error}</p>
          <Button
            onClick={reload}
            className="mt-5 rounded-full bg-espresso text-ivory hover:bg-cocoa"
          >
            Try again
          </Button>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="rounded-3xl border border-dashed border-sand bg-white/60 p-14 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-latte text-cocoa">
            <CalendarHeart className="size-8" />
          </span>
          <h3 className="mt-5 text-3xl text-espresso">No bookings yet</h3>
          <p className="mt-2 text-mocha">
            Find a service you love and send your first request.
          </p>
          <a
            href="/services"
            className="mt-6 inline-block rounded-full bg-espresso px-7 py-3 font-medium not-italic text-ivory transition hover:bg-cocoa"
          >
            Browse services
          </a>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <article
              key={booking._id}
              className="flex flex-col gap-5 rounded-3xl border border-sand/60 bg-white p-5 lg:flex-row lg:items-center"
            >
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl bg-latte lg:size-28">
                {booking.service?.image && (
                  <Image
                    src={booking.service.image}
                    alt={booking.service.serviceName}
                    fill
                    sizes="10rem"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={booking.status} />
                  <span className="text-xs text-mocha">
                    Requested {formatDate(booking.createdAt)}
                  </span>
                </div>
                <h3 className="mt-2 truncate text-2xl text-espresso">
                  {booking.service?.serviceName ??
                    "Service no longer available"}
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-cocoa">
                  <span className="flex items-center gap-2">
                    <Store className="size-4 text-caramel" />
                    {booking.vendor?.name ?? "Vendor"}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-caramel" />
                    {formatEventDate(booking.eventDate)}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="size-4 text-caramel" />
                    {booking.eventLocation}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewing(booking)}
                  className="rounded-full border-sand text-cocoa"
                >
                  <Eye className="size-4" />
                  Details
                </Button>
                {booking.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCancelling(booking)}
                    className="rounded-full border-red-200 text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="size-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <Dialog
        open={Boolean(viewing)}
        onOpenChange={(open) => !open && setViewing(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-4xl border-sand/60 bg-ivory p-8 sm:max-w-lg">
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-espresso">
                  {viewing.service?.serviceName ?? "Booking details"}
                </DialogTitle>
                <DialogDescription className="text-mocha">
                  {viewing.service?.category}{" "}
                  {viewing.service ? `· from $${viewing.service.price}` : ""}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 text-sm text-cocoa">
                <div className="flex items-center justify-between">
                  <span className="text-mocha">Status</span>
                  <StatusBadge status={viewing.status} />
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-mocha">Vendor</span>
                  <span className="text-right">
                    {viewing.vendor?.name}
                    <br />
                    <span className="text-xs text-mocha">
                      {viewing.vendor?.email}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-mocha">Event date</span>
                  <span>{formatEventDate(viewing.eventDate)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-mocha">Event location</span>
                  <span className="text-right">{viewing.eventLocation}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-mocha">Requested on</span>
                  <span>{formatDate(viewing.createdAt)}</span>
                </div>
              </div>

              <p className="rounded-2xl border border-sand/60 px-4 py-3 text-sm text-cocoa">
                {viewing.message || "You did not leave a message."}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(cancelling)}
        onOpenChange={(open) => !open && setCancelling(null)}
      >
        <AlertDialogContent className="rounded-4xl border-sand/60 bg-ivory p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-espresso">
              Cancel this request?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-mocha">
              Your request for {cancelling?.service?.serviceName} will be
              cancelled. You can send a new one anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full border-sand">
              Keep it
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancel}
              disabled={busy}
              className="rounded-full bg-red-700 text-white hover:bg-red-800"
            >
              {busy ? "Cancelling..." : "Cancel request"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
