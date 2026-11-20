"use client";

import { useState } from "react";
import { Briefcase, Camera, Loader2, Mail, UserRound } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/upload";
import PageLoader from "@/components/PageLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageHeader from "./PageHeader";

type SessionUser = typeof authClient.$Infer.Session.user;

const fieldClass =
  "h-12 rounded-full border-sand bg-ivory pl-12 text-espresso placeholder:text-mocha/70 focus-visible:border-caramel focus-visible:ring-caramel/20";

function ProfileForm({ user }: { user: SessionUser }) {
  const isVendor = user.role === "vendor";
  const [name, setName] = useState(user.name);
  const [businessName, setBusinessName] = useState(user.businessName ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(user.image ?? "");
  const [saving, setSaving] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("Please enter your full name.");
      return;
    }
    if (isVendor && !businessName.trim()) {
      toast.error("Business name is required for vendors.");
      return;
    }

    setSaving(true);
    try {
      let image = user.image || undefined;
      if (file) {
        image = await uploadImage(file);
      }

      const { error } = await authClient.updateUser({
        name: name.trim(),
        image,
        businessName: isVendor ? businessName.trim() : undefined,
      });

      if (error) {
        toast.error(error.message || "Could not update your profile.");
        return;
      }

      setFile(null);
      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-7 rounded-4xl border border-sand/60 bg-white p-6 md:p-9"
    >
      <div className="flex items-center gap-5">
        <Avatar className="size-24 border border-sand">
          <AvatarImage src={preview || undefined} alt={name} />
          <AvatarFallback className="bg-espresso font-(family-name:--font-playfair) text-4xl italic text-ivory">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-sand px-5 py-2.5 text-sm not-italic text-cocoa transition hover:bg-latte">
          <Camera className="size-4" />
          Change photo
          <input type="file" accept="image/*" hidden onChange={handleFile} />
        </label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-cocoa">
          Full name
        </Label>
        <div className="relative">
          <UserRound className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {isVendor && (
        <div className="space-y-2">
          <Label htmlFor="businessName" className="text-cocoa">
            Business name
          </Label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-cocoa">
          Email address
        </Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
          <Input
            id="email"
            value={user.email}
            disabled
            className={`${fieldClass} opacity-70`}
          />
        </div>
        <p className="text-xs text-mocha">
          Your email and role cannot be changed here.
        </p>
      </div>

      <Button
        type="submit"
        disabled={saving}
        className="h-12 rounded-full bg-espresso px-8 text-base text-ivory hover:bg-cocoa"
      >
        {saving && <Loader2 className="size-5 animate-spin" />}
        Save changes
      </Button>
    </form>
  );
}

export default function ProfileView() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return <PageLoader />;
  }

  return (
    <>
      <PageHeader
        title="Profile settings"
        text="Keep your personal details up to date."
      />
      <ProfileForm key={session.user.id} user={session.user} />
    </>
  );
}
