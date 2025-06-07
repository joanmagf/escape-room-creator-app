import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const templatesDir = path.join(process.cwd(), "html-templates");

  try {
    const files = fs.readdirSync(templatesDir).filter(file => file.endsWith(".html"));

    const templates = files.map((file) => ({
      id: path.parse(file).name,
      name: path.parse(file).name,
    }));
    console.log(templates)
    return NextResponse.json(templates);
  } catch (error) {
    return NextResponse.json({ error: "Error al leer las plantillas" }, { status: 500 });
  }
}
