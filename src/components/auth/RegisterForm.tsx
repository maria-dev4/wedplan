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
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleButton from "./GoogleButton";

const inputClass =
  "h-12 rounded-full border-sand bg-ivory pl-12 pr-4 text-espresso placeholder:text-mocha/70 focus-visible:border-caramel focus-visible:ring-caramel/20";

export default function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      toast.error(
        "Password needs 6+ characters with one uppercase and one lowercase letter.",
      );
      return;
    }
    if (role === "vendor" && !businessName.trim()) {
      toast.error("Please enter your business name.");
      return;
    }

    setLoading(true);

    let image: string | undefined;
    if (file) {
      try {
        image = await uploadImage(file);
      } catch (err) {
        setLoading(false);
        toast.error((err as Error).message);
        return;
      }
    }

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      role,
      businessName: role === "vendor" ? businessName : undefined,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success("Account created successfully!");
    router.push("/dashboard");
    router.refresh();
  };

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
          <Heart className="size-4" />
          Customer
        </button>
        <button
          type="button"
          onClick={() => setRole("vendor")}
          className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition ${
            role === "vendor" ? "bg-espresso text-ivory shadow" : "text-cocoa"
          }`}
        >
          <Briefcase className="size-4" />
          Vendor
        </button>
      </div>

      <GoogleButton />

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-sand/70" />
        <span className="text-sm text-mocha">or with email</span>
        <span className="h-px flex-1 bg-sand/70" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-sand bg-cream">
            {preview ? (
              <img
                src={preview}
                alt="Profile preview"
                className="size-full object-cover"
              />
            ) : (
              <User className="size-7 text-mocha" />
            )}
          </div>
          <label className="cursor-pointer rounded-full border border-sand px-5 py-2.5 text-sm text-cocoa transition hover:bg-latte">
            Profile photo (optional)
            <input type="file" accept="image/*" hidden onChange={handleFile} />
          </label>
        </div>

        <div className="relative">
          <User className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
          <Input
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
            <Input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Business name"
              className={inputClass}
            />
          </div>
        )}

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
            placeholder="Password (6+ chars, Aa)"
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
          Create account
        </Button>
      </form>
    </div>
  );
}
