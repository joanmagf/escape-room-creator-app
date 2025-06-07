// app/api/rooms/route.ts
import { Room } from "@/app/lib/types";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const templatesDir = path.join(process.cwd(), "public", "templates");

  let rooms: Room[] = [];

  try {
    const files = fs.readdirSync(templatesDir);

    rooms = files
      .filter((file) => file.endsWith(".html"))
      .map((file, index) => {
        const filePath = path.join(templatesDir, file);
        const htmlContent = fs.readFileSync(filePath, "utf8");

        // Puedes usar contenido real aquí, pero para simplificar:
        const name = path.basename(file, ".html");
        const description = htmlContent
          .match(/<title>(.*?)<\/title>/i)?.[1] || "Escape room personalitzat";

        return {
          id: `${index + 1}`, // o usa file como id
          name,
          description,
          entities: [], // rellena esto si extraes entidades
        };
      });
  } catch (err) {
    console.error("Error llegint les plantilles:", err);
    return NextResponse.json({ error: "No s'han pogut carregar les plantilles" }, { status: 500 });
  }

  return NextResponse.json(rooms);
}
