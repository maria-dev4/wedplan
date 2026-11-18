"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function TestPage() {
  const [result, setResult] = useState("");

  const handleTest = async () => {
    try {
      const data = await apiFetch("/api/me");
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult((error as Error).message);
    }
  };

  return (
    <div className="p-32">
      <button
        onClick={handleTest}
        className="rounded-full bg-espresso px-6 py-3 text-ivory"
      >
        Test API
      </button>
      <pre className="mt-6 text-espresso">{result}</pre>
    </div>
  );
}
