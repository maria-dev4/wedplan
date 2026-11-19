import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.formData();
  const file = body.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No image provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ message: "Only image files are allowed" }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ message: "Image must be smaller than 5 MB" }, { status: 400 });
  }

  const data = new FormData();
  data.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
    method: "POST",
    body: data,
  });
  const result = await res.json().catch(() => null);

  if (!res.ok || !result?.success) {
    return NextResponse.json({ message: "Image upload failed" }, { status: 502 });
  }

  return NextResponse.json({ url: result.data.url });
}