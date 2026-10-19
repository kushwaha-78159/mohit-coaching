import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { isAdmin, readStore, writeStore } from "@/lib/store";


export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!isAdmin(cookieStore.get("mcc_admin")?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let savedPath = "";
  try {
    const form = await req.formData();
    const image = form.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json({ error: "Please select a photo." }, { status: 400 });
    }

    const extensions: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    };
    const extension = extensions[image.type];

    if (!extension) {
      return NextResponse.json(
        { error: "Only JPG, PNG and WebP images are allowed." },
        { status: 400 }
      );
    }

    if (image.size < 1 || image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Photo must be 5 MB or smaller." },
        { status: 400 }
      );
    }

    const directory = path.join(process.cwd(), "public", "uploads", "gallery");
    await mkdir(directory, { recursive: true });

    const filename = `${randomUUID()}${extension}`;
    savedPath = path.join(directory, filename);
    await writeFile(savedPath, Buffer.from(await image.arrayBuffer()));

    const store = await readStore();
    const imagePath = `/uploads/gallery/${filename}`;
    store.gallery.push(imagePath);
    await writeStore(store);

    return NextResponse.json({ ok: true, store });
  } catch {
    if (savedPath) await unlink(savedPath).catch(() => {});
    return NextResponse.json(
      { error: "Unable to upload photo. Please try again." },
      { status: 500 }
    );
  }
}
