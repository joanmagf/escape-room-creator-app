// /app/api/rename-room/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { oldId, newId } = await request.json();

  if (!oldId || !newId) {
    return NextResponse.json({ error: "Missing oldId or newId" }, { status: 400 });
  }

  const roomsDir = path.join(process.cwd(), "public", "rooms");
  const oldPath = path.join(roomsDir, `${oldId}.html`);
  const newPath = path.join(roomsDir, `${newId}.html`);

  if (!fs.existsSync(oldPath)) {
    return NextResponse.json({ error: "Original room not found" }, { status: 404 });
  }

  fs.renameSync(oldPath, newPath);

  return NextResponse.json({ message: "Renamed successfully" });
}
