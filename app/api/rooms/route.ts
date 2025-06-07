// app/api/rooms/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      where: { isActive: true },
      include: {
        entities: {
          include: {
            interactions: true,
          },
        },
        interactions: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error obtenint les sales:", error);
    return NextResponse.json(
      { error: "Error obtenint les sales" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const room = await prisma.room.create({
      data: {
        name: data.name,
        description: data.description,
        htmlContent: data.htmlContent,
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

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error creant la sala:", error);
    return NextResponse.json(
      { error: "Error creant la sala" },
      { status: 500 }
    );
  }
}
