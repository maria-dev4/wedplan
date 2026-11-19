"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleButton from "./GoogleButton";

const inputClass =
  "h-12 rounded-full border-sand bg-ivory pl-12 pr-4 text-espresso placeholder:text-mocha/70 focus-visible:border-caramel focus-visible:ring-caramel/20";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      setLoading(false);
      toast.error(
        error.message || "Sign in failed. Please check your details.",
      );
      return;
    }

    const { data } = await authClient.getSession();
    if (data?.user.isBlocked) {
      await authClient.signOut();
      setLoading(false);
      toast.error("Your account has been blocked. Please contact support.");
      return;
    }

    setLoading(false);
    toast.success("Welcome back!");
    router.push("/dashboard");
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
          <Input
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
          <Input
            type={show ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
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

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-full bg-espresso text-base text-ivory shadow-lg shadow-espresso/20 hover:bg-cocoa"
        >
          {loading && <Loader2 className="size-5 animate-spin" />}
          Sign In
        </Button>
      </form>
    </div>
  );
}
