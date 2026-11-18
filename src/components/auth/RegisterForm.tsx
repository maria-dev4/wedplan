"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Eye,
  EyeOff,
  Heart,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (role === "vendor" && !businessName.trim()) {
      setError("Please enter your business name.");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
      businessName: role === "vendor" ? businessName : undefined,
    });
    setLoading(false);

    if (error) {
      setError(error.message || "Registration failed. Please try again.");
      return;
    }
    router.push("/");
    router.refresh();
  };

  const inputClass =
    "w-full rounded-full border border-sand bg-ivory py-3.5 pl-12 pr-4 text-espresso outline-none transition placeholder:text-mocha/70 focus:border-caramel focus:ring-4 focus:ring-caramel/20";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2 rounded-full bg-cream p-1.5">
        <button
          type="button"
          onClick={() => setRole("customer")}
          className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition ${
            role === "customer" ? "bg-espresso text-ivory shadow" : "text-cocoa"
          }`}
        >
          <Heart className="size-4" />I am a couple
        </button>
        <button
          type="button"
          onClick={() => setRole("vendor")}
          className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition ${
            role === "vendor" ? "bg-espresso text-ivory shadow" : "text-cocoa"
          }`}
        >
          <Briefcase className="size-4" />I am a vendor
        </button>
      </div>

      <GoogleButton />

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-sand/70" />
        <span className="text-sm text-mocha">or with email</span>
        <span className="h-px flex-1 bg-sand/70" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className={inputClass}
          />
        </div>

        {role === "vendor" && (
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Business name"
              className={inputClass}
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
          <input
            type={show ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 characters)"
            className={`${inputClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-mocha"
            aria-label="Toggle password"
          >
            {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>

        {error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm not-italic text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3.5 font-medium text-ivory shadow-lg shadow-espresso/20 transition hover:bg-cocoa disabled:opacity-70"
        >
          {loading && <Loader2 className="size-5 animate-spin" />}
          Create account
        </button>
      </form>
    </div>
  );
}
