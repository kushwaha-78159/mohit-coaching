import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { isAdmin, readStore, writeStore } from "@/lib/store";

async function authorized() {
  const c = await cookies();
  return isAdmin(c.get("mcc_admin")?.value);
}

export async function GET() {
  if (!await authorized()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readStore());
}

export async function PATCH(req: Request) {
  if (!await authorized()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const b = await req.json();
    const s = await readStore();

    if (b.action === "content") {
      s.about = String(b.about || "").slice(0, 10000);
      s.contact = {
        address: String(b.contact?.address || "").slice(0, 300),
        phone: String(b.contact?.phone || "").slice(0, 80),
        phone2: String(b.contact?.phone2 || "").slice(0, 80),
        email: String(b.contact?.email || "").slice(0, 200),
      };
    } else if (b.action === "gallery-add") {
      const image = String(b.image || "").trim();
      if (
        !image ||
        image.length > 500 ||
        !(/^https?:\/\//i.test(image) ||
          /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/i.test(image))
      ) {
        return NextResponse.json(
          { error: "Enter a valid image URL or existing filename." },
          { status: 400 }
        );
      }
      s.gallery.push(image);
    } else if (b.action === "gallery-delete") {
      const index = Number(b.index);
      if (!Number.isInteger(index) || index < 0 || index >= s.gallery.length) {
        return NextResponse.json({ error: "Invalid gallery item." }, { status: 400 });
      }
      const removed = s.gallery[index];
      s.gallery.splice(index, 1);

      if (typeof removed === "string" && removed.startsWith("/uploads/gallery/")) {
        const filename = path.basename(removed);
        if (/^[a-f0-9-]+\.(jpg|png|webp)$/i.test(filename)) {
          await unlink(
            path.join(process.cwd(), "public", "uploads", "gallery", filename)
          ).catch(() => {});
        }
      }
    } else if (b.action === "record-status") {
      const list = b.kind === "registration" ? s.registrations : s.messages;
      const item = list.find((x) => x.id === b.id);
      if (item) item.status = String(b.status || "NEW");
    } else if (b.action === "record-delete") {
      if (b.kind === "registration") {
        s.registrations = s.registrations.filter((x) => x.id !== b.id);
      } else {
        s.messages = s.messages.filter((x) => x.id !== b.id);
      }
    } else {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }

    await writeStore(s);
    return NextResponse.json({ ok: true, store: s });
  } catch {
    return NextResponse.json({ error: "Unable to update data." }, { status: 500 });
  }
}
