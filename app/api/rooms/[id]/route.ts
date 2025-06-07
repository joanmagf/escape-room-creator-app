import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        entities: {
          include: {
            interactions: true,
          },
        },
        interactions: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Sala no trobada" }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error obtenint la sala:", error);
    return NextResponse.json(
      { error: "Error obtenint la sala" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await request.json();

    const room = await prisma.room.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        htmlContent: data.htmlContent,
        isActive: data.isActive ?? true,
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
    console.error("Error actualitzant la sala:", error);
    return NextResponse.json(
      { error: "Error actualitzant la sala" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.room.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminant la sala:", error);
    return NextResponse.json(
      { error: "Error eliminant la sala" },
      { status: 500 }
    );
  }
}
