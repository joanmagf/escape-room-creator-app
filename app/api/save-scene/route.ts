import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { id, html } = await req.json();

    if (!id || !html) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'rooms', `${id}.html`);
    fs.writeFileSync(filePath, html, 'utf8');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 });
  }
}