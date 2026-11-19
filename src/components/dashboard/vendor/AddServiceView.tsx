"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import PageHeader from "../PageHeader";
import ServiceForm, { type ServiceFormValues } from "./ServiceForm";

export default function AddServiceView() {
  const router = useRouter();

  const handleCreate = async (values: ServiceFormValues) => {
    await apiFetch("/api/services", {
      method: "POST",
      body: JSON.stringify(values),
    });
    toast.success(
      "Service submitted. It will appear publicly once an admin approves it.",
    );
    router.push("/dashboard/my-services");
  };

  return (
    <>
      <PageHeader
        title="Add a service"
        text="Free vendors can keep up to 3 active services. New services need admin approval."
      />
      <div className="rounded-4xl border border-sand/60 bg-white p-6 md:p-9">
        <ServiceForm
          submitLabel="Submit for approval"
          onSubmit={handleCreate}
        />
      </div>
    </>
  );
}
