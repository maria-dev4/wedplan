export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(result.message || "Image upload failed");
  }
  return result.url as string;
}