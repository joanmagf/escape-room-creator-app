import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const roomsDir = path.join(process.cwd(), 'public', 'rooms');

  try {
    const files = fs.readdirSync(roomsDir);
    const htmlFiles = files.filter((file) => file.endsWith('.html'));

    const rooms = htmlFiles.map((file) => {
      const name = file.replace('.html', '');
      return { id: name, name };
    });

    return NextResponse.json(rooms);
  } catch (err) {
    console.error("Error leyendo la carpeta de rooms:", err);
    return NextResponse.json({ error: 'No se pudieron cargar las salas' }, { status: 500 });
  }
}
