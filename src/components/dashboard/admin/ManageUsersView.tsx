"use client";

import { useState } from "react";
import { Eye, Search, ShieldBan, ShieldCheck, UsersRound } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import { useDebounced } from "@/lib/use-debounced";
import { formatDate } from "@/lib/format";
import type { AdminUser } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const fieldClass =
  "h-12 rounded-full border-sand bg-ivory text-espresso placeholder:text-mocha/70 focus-visible:border-caramel focus-visible:ring-caramel/20";

export default function ManageUsersView() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [viewing, setViewing] = useState<AdminUser | null>(null);
  const [target, setTarget] = useState<AdminUser | null>(null);
  const [busy, setBusy] = useState(false);

  const debounced = useDebounced(search);

  const params = new URLSearchParams();
  if (debounced.trim()) params.set("search", debounced.trim());
  if (role !== "all") params.set("role", role);

  const { data, loading, error, reload } = useApi<{ users: AdminUser[] }>(
    `/api/admin/users?${params.toString()}`,
  );
  const users = data?.users ?? [];

  const confirmToggle = async () => {
    if (!target) return;
    setBusy(true);
    try {
      const result = await apiFetch(`/api/admin/users/${target._id}/block`, {
        method: "PATCH",
        body: JSON.stringify({ isBlocked: !target.isBlocked }),
      });
      toast.success(result.message);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
      setTarget(null);
      reload();
    }
  };

  return (
    <>
      <PageHeader
        title="Manage users"
        text="View every registered account and control platform access."
      />

      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_14rem]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className={`${fieldClass} pl-12`}
          />
        </div>
        <Select value={role} onValueChange={(value) => setRole(value ?? "all")}>
          <SelectTrigger className={`${fieldClass} w-full px-5`}>
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="customer">Customers</SelectItem>
            <SelectItem value="vendor">Vendors</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-16 w-full rounded-2xl bg-latte"
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

      {!loading && !error && users.length === 0 && (
        <div className="rounded-3xl border border-dashed border-sand bg-white/60 p-14 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-latte text-cocoa">
            <UsersRound className="size-8" />
          </span>
          <h3 className="mt-5 text-3xl text-espresso">No users found</h3>
          <p className="mt-2 text-mocha">Try a different search or filter.</p>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="overflow-x-auto rounded-3xl border border-sand/60 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-5 py-4">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="pr-5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage src={user.image || undefined} alt="" />
                        <AvatarFallback className="bg-espresso text-ivory">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-semibold not-italic text-espresso">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-mocha">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-full bg-latte px-3 py-1 text-xs capitalize not-italic text-cocoa">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium not-italic ${
                        user.isBlocked
                          ? "bg-red-100 text-red-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-mocha">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewing(user)}
                        className="rounded-full border-sand text-cocoa"
                      >
                        <Eye className="size-4" />
                        View
                      </Button>
                      {user.role !== "admin" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setTarget(user)}
                          className={`rounded-full ${
                            user.isBlocked
                              ? "border-sand text-cocoa"
                              : "border-red-200 text-red-700 hover:bg-red-50"
                          }`}
                        >
                          {user.isBlocked ? (
                            <ShieldCheck className="size-4" />
                          ) : (
                            <ShieldBan className="size-4" />
                          )}
                          {user.isBlocked ? "Unblock" : "Block"}
                        </Button>
                      )}
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
        <DialogContent className="rounded-4xl border-sand/60 bg-ivory p-8 sm:max-w-md">
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-espresso">
                  {viewing.name}
                </DialogTitle>
                <DialogDescription className="text-mocha">
                  {viewing.email}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm text-cocoa">
                <div className="flex justify-between gap-4">
                  <span className="text-mocha">Role</span>
                  <span className="capitalize">{viewing.role}</span>
                </div>
                {viewing.role === "vendor" && (
                  <>
                    <div className="flex justify-between gap-4">
                      <span className="text-mocha">Business</span>
                      <span>{viewing.businessName || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-mocha">Plan</span>
                      <span className="capitalize">
                        {viewing.subscriptionPlan || "free"}
                      </span>
                    </div>
                    {viewing.subscriptionExpiresAt && (
                      <div className="flex justify-between gap-4">
                        <span className="text-mocha">Plan ends</span>
                        <span>{formatDate(viewing.subscriptionExpiresAt)}</span>
                      </div>
                    )}
                  </>
                )}
                <div className="flex justify-between gap-4">
                  <span className="text-mocha">Status</span>
                  <span>{viewing.isBlocked ? "Blocked" : "Active"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-mocha">Joined</span>
                  <span>{formatDate(viewing.createdAt)}</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(target)}
        onOpenChange={(open) => !open && setTarget(null)}
      >
        <AlertDialogContent className="rounded-4xl border-sand/60 bg-ivory p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-espresso">
              {target?.isBlocked ? "Unblock this user?" : "Block this user?"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-mocha">
              {target?.isBlocked
                ? `${target?.name} will regain access to the platform.`
                : `${target?.name} will lose access to all protected features until unblocked.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full border-sand">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmToggle}
              disabled={busy}
              className="rounded-full bg-espresso text-ivory hover:bg-cocoa"
            >
              {busy ? "Saving..." : target?.isBlocked ? "Unblock" : "Block"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
