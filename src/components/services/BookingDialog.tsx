"use client";

import { useState } from "react";
import { CalendarCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const fieldClass =
  "rounded-2xl border-sand bg-ivory text-espresso placeholder:text-mocha/70 focus-visible:border-caramel focus-visible:ring-caramel/20";

export default function BookingDialog({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!eventDate) {
      toast.error("Please choose your event date.");
      return;
    }
    if (eventLocation.trim().length < 3) {
      toast.error("Please enter your event location.");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          serviceId: service._id,
          eventDate,
          eventLocation,
          message,
        }),
      });
      toast.success("Booking request sent! The vendor will review it soon.");
      setOpen(false);
      setEventDate("");
      setEventLocation("");
      setMessage("");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="h-13 w-full rounded-full bg-espresso text-base text-ivory shadow-lg shadow-espresso/20 hover:bg-cocoa"
      >
        <CalendarCheck className="size-5" />
        Request Booking
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-4xl border-sand/60 bg-ivory p-8 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl text-espresso">
              Request a booking
            </DialogTitle>
            <DialogDescription className="text-mocha">
              {service.serviceName} by {service.vendorName}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-2 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="eventDate" className="text-cocoa">
                Event date
              </Label>
              <Input
                id="eventDate"
                type="date"
                min={today}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className={`h-12 ${fieldClass}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventLocation" className="text-cocoa">
                Event location
              </Label>
              <Input
                id="eventLocation"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="Where will your event be held?"
                className={`h-12 ${fieldClass}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-cocoa">
                Additional message (optional)
              </Label>
              <Textarea
                id="message"
                rows={4}
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell the vendor about your plans"
                className={fieldClass}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-full bg-espresso text-base text-ivory hover:bg-cocoa"
            >
              {loading && <Loader2 className="size-5 animate-spin" />}
              Send request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
