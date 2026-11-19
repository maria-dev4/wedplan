"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { categories } from "@/lib/constants";
import { uploadImage } from "@/lib/upload";
import type { Service } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ServiceFormValues = {
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
};

type ServiceFormProps = {
  initial?: Service;
  submitLabel: string;
  onSubmit: (values: ServiceFormValues) => Promise<void>;
};

const fieldClass =
  "rounded-2xl border-sand bg-ivory text-espresso placeholder:text-mocha/70 focus-visible:border-caramel focus-visible:ring-caramel/20";

export default function ServiceForm({
  initial,
  submitLabel,
  onSubmit,
}: ServiceFormProps) {
  const [serviceName, setServiceName] = useState(initial?.serviceName ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;

    const room = 5 - images.length;
    if (room <= 0) {
      toast.error("You can upload up to 5 images.");
      return;
    }
    if (files.length > room) {
      toast.error(`Only ${room} more image(s) can be added.`);
    }

    setUploading(true);
    try {
      const urls = await Promise.all(
        files.slice(0, room).map((file) => uploadImage(file)),
      );
      setImages((current) => [...current, ...urls]);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericPrice = Number(price);

    if (serviceName.trim().length < 3) {
      toast.error("Service name must be at least 3 characters.");
      return;
    }
    if (!category) {
      toast.error("Please choose a category.");
      return;
    }
    if (description.trim().length < 20) {
      toast.error("Description must be at least 20 characters.");
      return;
    }
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      toast.error("Price must be a positive number.");
      return;
    }
    if (!location.trim()) {
      toast.error("Location is required.");
      return;
    }
    if (images.length < 1) {
      toast.error("Please upload at least one image.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        serviceName: serviceName.trim(),
        category,
        description: description.trim(),
        price: numericPrice,
        location: location.trim(),
        images,
      });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="serviceName" className="text-cocoa">
            Service name
          </Label>
          <Input
            id="serviceName"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Royal Garden Venue"
            className={`h-12 ${fieldClass}`}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cocoa">Category</Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value ?? "")}
          >
            <SelectTrigger className={`h-12 w-full ${fieldClass}`}>
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-cocoa">
            Price (USD)
          </Label>
          <Input
            id="price"
            type="number"
            min={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="1200"
            className={`h-12 ${fieldClass}`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-cocoa">
            Location
          </Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Dhaka"
            className={`h-12 ${fieldClass}`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-cocoa">
          Description
        </Label>
        <Textarea
          id="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what is included, your style and what makes this service special"
          className={fieldClass}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-cocoa">Service images (up to 5)</Label>
        <div className="flex flex-wrap gap-3">
          {images.map((url) => (
            <div
              key={url}
              className="relative size-24 overflow-hidden rounded-2xl border border-sand"
            >
              <Image
                src={url}
                alt="Service"
                fill
                sizes="6rem"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setImages((current) => current.filter((item) => item !== url))
                }
                className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-espresso/80 text-ivory"
                aria-label="Remove image"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}

          {images.length < 5 && (
            <label className="flex size-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-caramel bg-cream text-xs text-cocoa transition hover:bg-latte">
              {uploading ? (
                <Loader2 className="size-6 animate-spin" />
              ) : (
                <ImagePlus className="size-6" />
              )}
              {uploading ? "Uploading" : "Add image"}
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleFiles}
                disabled={uploading}
              />
            </label>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={submitting || uploading}
        className="h-12 rounded-full bg-espresso px-8 text-base text-ivory hover:bg-cocoa"
      >
        {submitting && <Loader2 className="size-5 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
