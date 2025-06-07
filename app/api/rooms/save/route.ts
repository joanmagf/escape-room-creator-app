import { Room } from "@/app/lib/types";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data: Room = await request.json();

    console.log("Guardant sala:", data);

    let savedRoom;

    // Si és una sala nova o no té ID vàlid
    if (!data.id || data.id === "new" || data.id.startsWith("object-")) {
      // Crear una nova sala
      savedRoom = await prisma.room.create({
        data: {
          name: data.name,
          description: data.description || "",
          htmlContent: data.htmlContent || "",
          isActive: true,
        },
        include: {
          entities: {
            include: {
              interactions: true,
            },
          },
          interactions: true,
        },
      });

      // Crear les entitats associades
      if (data.entities && data.entities.length > 0) {
        for (const entity of data.entities) {
          if (typeof entity === "object" && entity.id) {
            await prisma.entity.create({
              data: {
                roomId: savedRoom.id,
                name: entity.name || entity.type,
                type: entity.type,
                position: entity.position || "0 0 0",
                rotation: entity.rotation || "0 0 0",
                scale: entity.scale || "1 1 1",
                color: entity.color || "#FFFFFF",
                material: entity.material || "",
                visible: entity.visible !== false,
                properties: entity.properties || {},
              },
            });
          }
        }
      }
    } else {
      // Actualitzar sala existent
      savedRoom = await prisma.room.update({
        where: { id: data.id },
        data: {
          name: data.name,
          description: data.description || "",
          htmlContent: data.htmlContent || "",
          isActive: true,
        },
        include: {
          entities: {
            include: {
              interactions: true,
            },
          },
          interactions: true,
        },
      });

      // Eliminar entitats existents i crear les noves
      await prisma.entity.deleteMany({
        where: { roomId: data.id },
      });

      // Crear les entitats actualitzades
      if (data.entities && data.entities.length > 0) {
        for (const entity of data.entities) {
          if (typeof entity === "object" && entity.id) {
            await prisma.entity.create({
              data: {
                roomId: savedRoom.id,
                name: entity.name || entity.type,
                type: entity.type,
                position: entity.position || "0 0 0",
                rotation: entity.rotation || "0 0 0",
                scale: entity.scale || "1 1 1",
                color: entity.color || "#FFFFFF",
                material: entity.material || "",
                visible: entity.visible !== false,
                properties: entity.properties || {},
              },
            });
          }
        }
      }
    }

    // Tornar a carregar la sala amb totes les relacions
    const finalRoom = await prisma.room.findUnique({
      where: { id: savedRoom.id },
      include: {
        entities: {
          include: {
            interactions: true,
          },
        },
        interactions: true,
      },
    });

    return NextResponse.json(finalRoom);
  } catch (error) {
    console.error("Error guardant la sala:", error);
    return NextResponse.json(
      { error: "Error guardant la sala", details: error },
      { status: 500 }
    );
  }
}
