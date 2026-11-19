const styles: Record<string, string> = {
  pending: "bg-latte text-cocoa",
  approved: "bg-emerald-100 text-emerald-800",
  accepted: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  cancelled: "bg-sand/50 text-mocha",
  paid: "bg-emerald-100 text-emerald-800",
  failed: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize not-italic ${
        styles[status] || "bg-latte text-cocoa"
      }`}
    >
      {status}
    </span>
  );
}
