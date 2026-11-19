"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, MapPin, PackageOpen, Pencil, Power, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import type { Service } from "@/lib/types";
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
import ServiceForm, { type ServiceFormValues } from "./ServiceForm";

export default function MyServicesView() {
  const { data, loading, error, reload } = useApi<{ services: Service[] }>(
    "/api/services/mine",
  );
  const [viewing, setViewing] = useState<Service | null>(null);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState<Service | null>(null);
  const [removing, setRemoving] = useState(false);

  const services = data?.services ?? [];

  const toggleAvailability = async (service: Service) => {
    try {
      const result = await apiFetch(
        `/api/services/${service._id}/availability`,
        {
          method: "PATCH",
          body: JSON.stringify({ isActive: !service.isActive }),
        },
      );
      toast.success(result.message);
      reload();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const saveEdit = async (values: ServiceFormValues) => {
    if (!editing) return;
    await apiFetch(`/api/services/${editing._id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
    toast.success("Service updated.");
    setEditing(null);
    reload();
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setRemoving(true);
    try {
      await apiFetch(`/api/services/${deleting._id}`, { method: "DELETE" });
      toast.success("Service deleted.");
      setDeleting(null);
      reload();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="My services"
        text="Rejected services are hidden from customers. Deactivated services stay saved but are not bookable."
        action={
          <Link
            href="/dashboard/add-service"
            className="rounded-full bg-espresso px-6 py-3 font-medium not-italic text-ivory transition hover:bg-cocoa"
          >
            Add service
          </Link>
        }
      />

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-36 w-full rounded-3xl bg-latte"
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

      {!loading && !error && services.length === 0 && (
        <div className="rounded-3xl border border-dashed border-sand bg-white/60 p-14 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-latte text-cocoa">
            <PackageOpen className="size-8" />
          </span>
          <h3 className="mt-5 text-3xl text-espresso">No services yet</h3>
          <p className="mt-2 text-mocha">
            Add your first service and start receiving booking requests.
          </p>
          <Link
            href="/dashboard/add-service"
            className="mt-6 inline-block rounded-full bg-espresso px-7 py-3 font-medium not-italic text-ivory transition hover:bg-cocoa"
          >
            Add service
          </Link>
        </div>
      )}

      {!loading && !error && services.length > 0 && (
        <div className="space-y-4">
          {services.map((service) => (
            <article
              key={service._id}
              className="flex flex-col gap-5 rounded-3xl border border-sand/60 bg-white p-5 sm:flex-row sm:items-center"
            >
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl bg-latte sm:size-28">
                {service.images[0] && (
                  <Image
                    src={service.images[0]}
                    alt={service.serviceName}
                    fill
                    sizes="10rem"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={service.status} />
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium not-italic ${
                      service.isActive
                        ? "bg-latte text-cocoa"
                        : "bg-sand/50 text-mocha"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <h3 className="mt-2 truncate text-2xl text-espresso">
                  {service.serviceName}
                </h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-mocha">
                  <span>{service.category}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-4 text-caramel" />
                    {service.location}
                  </span>
                  <span className="font-semibold not-italic text-espresso">
                    ${service.price}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:w-52 sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewing(service)}
                  className="rounded-full border-sand text-cocoa"
                >
                  <Eye className="size-4" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(service)}
                  className="rounded-full border-sand text-cocoa"
                >
                  <Pencil className="size-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleAvailability(service)}
                  className="rounded-full border-sand text-cocoa"
                >
                  <Power className="size-4" />
                  {service.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleting(service)}
                  className="rounded-full border-red-200 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Dialog
        open={Boolean(viewing)}
        onOpenChange={(open) => !open && setViewing(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-4xl border-sand/60 bg-ivory p-8 sm:max-w-xl">
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-espresso">
                  {viewing.serviceName}
                </DialogTitle>
                <DialogDescription className="text-mocha">
                  {viewing.category} in {viewing.location}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-2 grid grid-cols-3 gap-2">
                {viewing.images.map((url) => (
                  <div
                    key={url}
                    className="relative h-24 overflow-hidden rounded-2xl bg-latte"
                  >
                    <Image
                      src={url}
                      alt=""
                      fill
                      sizes="10rem"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <p className="whitespace-pre-line leading-relaxed text-cocoa">
                {viewing.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-mocha">
                <StatusBadge status={viewing.status} />
                <span>{viewing.isActive ? "Active" : "Inactive"}</span>
                <span>${viewing.price}</span>
                <span>
                  Added {new Date(viewing.createdAt).toLocaleDateString()}
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(editing)}
        onOpenChange={(open) => !open && setEditing(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-4xl border-sand/60 bg-ivory p-8 sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl text-espresso">
              Edit service
            </DialogTitle>
            <DialogDescription className="text-mocha">
              Update the details and save your changes.
            </DialogDescription>
          </DialogHeader>
          {editing && (
            <ServiceForm
              key={editing._id}
              initial={editing}
              submitLabel="Save changes"
              onSubmit={saveEdit}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
      >
        <AlertDialogContent className="rounded-4xl border-sand/60 bg-ivory p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-espresso">
              Delete this service?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-mocha">
              {deleting?.serviceName} will be removed permanently. This cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full border-sand">
              Keep it
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={removing}
              className="rounded-full bg-red-700 text-white hover:bg-red-800"
            >
              {removing ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
