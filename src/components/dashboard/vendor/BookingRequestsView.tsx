"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, Check, Inbox, Loader2, MapPin, X } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import { formatDate, formatEventDate } from "@/lib/format";
import type { Booking } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "../PageHeader";
import StatusBadge from "../StatusBadge";

export default function BookingRequestsView() {
  const { data, loading, error, reload } = useApi<{ bookings: Booking[] }>(
    "/api/bookings/vendor",
  );
  const [busyId, setBusyId] = useState("");

  const bookings = data?.bookings ?? [];

  const handleAction = async (id: string, status: "accepted" | "rejected") => {
    setBusyId(id);
    try {
      const result = await apiFetch(`/api/bookings/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast.success(result.message);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusyId("");
      reload();
    }
  };

  return (
    <>
      <PageHeader
        title="Booking requests"
        text="Review requests from customers. Once accepted or rejected, a request cannot be changed."
      />

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-48 w-full rounded-3xl bg-latte"
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
            <Inbox className="size-8" />
          </span>
          <h3 className="mt-5 text-3xl text-espresso">
            No booking requests yet
          </h3>
          <p className="mt-2 text-mocha">
            When customers request your services, they will show up here.
          </p>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <article
              key={booking._id}
              className="rounded-3xl border border-sand/60 bg-white p-5 md:p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row">
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl bg-latte lg:size-32">
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
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-2xl text-espresso">
                        {booking.service?.serviceName ??
                          "Service no longer available"}
                      </h3>
                      {booking.service && (
                        <p className="text-sm text-mocha">
                          {booking.service.category}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-2xl bg-cream p-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={booking.customer?.image || undefined}
                        alt=""
                      />
                      <AvatarFallback className="bg-espresso text-ivory">
                        {booking.customer?.name.charAt(0).toUpperCase() ?? "C"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold not-italic text-espresso">
                        {booking.customer?.name ?? "Unknown customer"}
                      </p>
                      <p className="truncate text-xs text-mocha">
                        {booking.customer?.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-cocoa">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-caramel" />
                      {formatEventDate(booking.eventDate)}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4 text-caramel" />
                      {booking.eventLocation}
                    </span>
                  </div>

                  <p className="mt-4 rounded-2xl border border-sand/60 px-4 py-3 text-sm text-cocoa">
                    {booking.message || "The customer did not leave a message."}
                  </p>

                  <p className="mt-3 text-xs text-mocha">
                    Requested on {formatDate(booking.createdAt)}
                  </p>
                </div>
              </div>

              {booking.status === "pending" && (
                <div className="mt-5 flex flex-wrap justify-end gap-3 border-t border-latte pt-5">
                  <Button
                    variant="outline"
                    disabled={busyId === booking._id}
                    onClick={() => handleAction(booking._id, "rejected")}
                    className="rounded-full border-red-200 px-6 text-red-700 hover:bg-red-50"
                  >
                    <X className="size-4" />
                    Reject
                  </Button>
                  <Button
                    disabled={busyId === booking._id}
                    onClick={() => handleAction(booking._id, "accepted")}
                    className="rounded-full bg-espresso px-6 text-ivory hover:bg-cocoa"
                  >
                    {busyId === booking._id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Check className="size-4" />
                    )}
                    Accept
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
