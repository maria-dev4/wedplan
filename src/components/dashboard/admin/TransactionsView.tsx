"use client";

import { ReceiptText } from "lucide-react";
import { useApi } from "@/lib/use-api";
import { formatDate } from "@/lib/format";
import type { Transaction } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "../PageHeader";
import StatusBadge from "../StatusBadge";

export default function TransactionsView() {
  const { data, loading, error, reload } = useApi<{
    transactions: Transaction[];
  }>("/api/admin/transactions");
  const transactions = data?.transactions ?? [];

  return (
    <>
      <PageHeader
        title="Transactions"
        text="Subscription payments recorded after verified Stripe events. These records cannot be edited."
      />

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
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

      {!loading && !error && transactions.length === 0 && (
        <div className="rounded-3xl border border-dashed border-sand bg-white/60 p-14 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-latte text-cocoa">
            <ReceiptText className="size-8" />
          </span>
          <h3 className="mt-5 text-3xl text-espresso">No transactions yet</h3>
          <p className="mt-2 text-mocha">
            Payments will appear here once vendors upgrade to Premium.
          </p>
        </div>
      )}

      {!loading && !error && transactions.length > 0 && (
        <div className="overflow-x-auto rounded-3xl border border-sand/60 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-5 py-4">Vendor</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage
                          src={transaction.vendor?.image || undefined}
                          alt=""
                        />
                        <AvatarFallback className="bg-espresso text-ivory">
                          {transaction.vendor?.name.charAt(0).toUpperCase() ??
                            "V"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-semibold not-italic text-espresso">
                          {transaction.vendor?.name ?? "Unknown vendor"}
                        </p>
                        <p className="truncate text-xs text-mocha">
                          {transaction.vendor?.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize text-cocoa">
                    {transaction.plan}
                  </TableCell>
                  <TableCell className="font-semibold not-italic text-espresso">
                    {transaction.amount.toFixed(2)}{" "}
                    {transaction.currency.toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={transaction.status} />
                  </TableCell>
                  <TableCell className="pr-5 text-sm text-mocha">
                    {formatDate(transaction.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
