import { Room } from "@/app/lib/types";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Simular dades d'una sala d'escape
  const room: Room = {
    id,
    name: `Sala d'escape ${id}`,
    description: "Descripció de la sala d'escape",
    entities: [
      '<a-box id="object-1" position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" selectable escape-interactive="type: question; question: Quant fa 2+2?; answer: 4; feedback: Molt bé!; unlocks: object-2"></a-box>',
      '<a-sphere id="object-2" position="0 1.25 -5" radius="1.25" color="#EF2D5E" selectable visible="false"></a-sphere>',
    ],
  };

  return NextResponse.json(room);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Eliminar la sala de la base de dades
  console.log("Eliminant sala amb ID:", id);

  // Aquí hauries de connectar amb la teva base de dades per eliminar la sala

  return NextResponse.json({ success: true });
}
