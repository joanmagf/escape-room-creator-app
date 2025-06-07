// /app/api/create-room/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateName } = body;

    if (!templateName) {
      return NextResponse.json({ error: "templateName is required" }, { status: 400 });
    }

    const templatesDir = path.join(process.cwd(), "html-templates");
    const roomsDir = path.join(process.cwd(), "public", "rooms");

    const sourcePath = path.join(templatesDir, `${templateName}.html`);
    const targetPath = path.join(roomsDir, `${templateName}.html`);

    // Asegúrate de que el archivo de plantilla existe
    if (!fs.existsSync(sourcePath)) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    // Crea la carpeta /public/rooms si no existe
    if (!fs.existsSync(roomsDir)) {
      fs.mkdirSync(roomsDir, { recursive: true });
    }

    // Copia el archivo
    const content = fs.readFileSync(sourcePath, "utf-8");
    fs.writeFileSync(targetPath, content, "utf-8");

    return NextResponse.json({ message: "Room created", url: `/rooms/${templateName}.html` });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
