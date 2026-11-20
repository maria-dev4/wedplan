import { Suspense } from "react";
import RequireAuth from "@/components/RequireAuth";
import PaymentSuccess from "@/components/payment/PaymentSuccess";

export default function PaymentSuccessPage() {
  return (
    <RequireAuth>
      <Suspense fallback={null}>
        <PaymentSuccess />
      </Suspense>
    </RequireAuth>
  );
}
