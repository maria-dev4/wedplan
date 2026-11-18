"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await authClient.signIn.email({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message || "Login failed. Please check your details.");
      return;
    }
    router.push("/");
    router.refresh();
  };

  return (
    <div className="space-y-5">
      <GoogleButton />

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-sand/70" />
        <span className="text-sm text-mocha">or with email</span>
        <span className="h-px flex-1 bg-sand/70" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-full border border-sand bg-ivory py-3.5 pl-12 pr-4 text-espresso outline-none transition placeholder:text-mocha/70 focus:border-caramel focus:ring-4 focus:ring-caramel/20"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
          <input
            type={show ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-full border border-sand bg-ivory py-3.5 pl-12 pr-12 text-espresso outline-none transition placeholder:text-mocha/70 focus:border-caramel focus:ring-4 focus:ring-caramel/20"
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
          Login
        </button>
      </form>
    </div>
  );
}
