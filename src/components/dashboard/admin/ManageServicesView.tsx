"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ClipboardX, Eye, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import { useDebounced } from "@/lib/use-debounced";
import { categories } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import type { Service } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const fieldClass =
  "h-12 rounded-full border-sand bg-ivory text-espresso placeholder:text-mocha/70 focus-visible:border-caramel focus-visible:ring-caramel/20";

export default function ManageServicesView() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [viewing, setViewing] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState<Service | null>(null);
  const [busy, setBusy] = useState(false);

  const debounced = useDebounced(search);

  const params = new URLSearchParams();
  if (debounced.trim()) params.set("search", debounced.trim());
  if (status !== "all") params.set("status", status);
  if (category !== "all") params.set("category", category);

  const { data, loading, error, reload } = useApi<{ services: Service[] }>(
    `/api/admin/services?${params.toString()}`,
  );
  const services = data?.services ?? [];

  const changeStatus = async (
    service: Service,
    next: "approved" | "rejected",
  ) => {
    try {
      const result = await apiFetch(
        `/api/admin/services/${service._id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: next }),
        },
      );
      toast.success(result.message);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      reload();
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      const result = await apiFetch(`/api/admin/services/${deleting._id}`, {
        method: "DELETE",
      });
      toast.success(result.message);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
      setDeleting(null);
      reload();
    }
  };

  return (
    <>
      <PageHeader
        title="Manage services"
        text="Only approved and active services appear on the public Browse Services page."
      />

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service, vendor or place"
            className={`${fieldClass} pl-12`}
          />
        </div>
        <Select
          value={status}
          onValueChange={(value) => setStatus(value ?? "all")}
        >
          <SelectTrigger className={`${fieldClass} w-full px-5`}>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value ?? "all")}
        >
          <SelectTrigger className={`${fieldClass} w-full px-5`}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-20 w-full rounded-2xl bg-latte"
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
            <ClipboardX className="size-8" />
          </span>
          <h3 className="mt-5 text-3xl text-espresso">No services found</h3>
          <p className="mt-2 text-mocha">Try a different search or filter.</p>
        </div>
      )}

      {!loading && !error && services.length > 0 && (
        <div className="overflow-x-auto rounded-3xl border border-sand/60 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-5 py-4">Service</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service._id}>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-latte">
                        {service.images[0] && (
                          <Image
                            src={service.images[0]}
                            alt=""
                            fill
                            sizes="3.5rem"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="max-w-52 truncate font-semibold not-italic text-espresso">
                          {service.serviceName}
                        </p>
                        <p className="text-xs text-mocha">{service.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-cocoa">
                    {service.vendorName}
                  </TableCell>
                  <TableCell className="text-sm font-semibold not-italic text-espresso">
                    ${service.price}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-start gap-1">
                      <StatusBadge status={service.status} />
                      {!service.isActive && (
                        <span className="text-xs text-mocha">Inactive</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewing(service)}
                        className="rounded-full border-sand text-cocoa"
                      >
                        <Eye className="size-4" />
                        View
                      </Button>
                      {service.status !== "approved" && (
                        <Button
                          size="sm"
                          onClick={() => changeStatus(service, "approved")}
                          className="rounded-full bg-espresso text-ivory hover:bg-cocoa"
                        >
                          <Check className="size-4" />
                          Approve
                        </Button>
                      )}
                      {service.status !== "rejected" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => changeStatus(service, "rejected")}
                          className="rounded-full border-sand text-cocoa"
                        >
                          <X className="size-4" />
                          Reject
                        </Button>
                      )}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
              <div className="grid grid-cols-3 gap-2">
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
                <span>${viewing.price}</span>
                <span>
                  {viewing.vendorName} ({viewing.vendorEmail})
                </span>
                <span>Added {formatDate(viewing.createdAt)}</span>
              </div>
            </>
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
              disabled={busy}
              className="rounded-full bg-red-700 text-white hover:bg-red-800"
            >
              {busy ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
