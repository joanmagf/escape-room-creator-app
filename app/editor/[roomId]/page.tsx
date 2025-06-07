"use client";

import { Room } from "@/app/lib/types";
import EscapeRoomEditor from "@/components/editor/EscapeRoomEditor";
import { useEffect, useState } from "react";

export default function EditorPage({ params }: { params: { roomId: string } }) {
  const [roomData, setRoomData] = useState<Room>({
    id: params.roomId,
    name: "Nova sala d'escape",
    description: "Descripció de la sala d'escape",
    entities: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Carregar les dades de la sala si existeix
  useEffect(() => {
    const loadRoomData = async () => {
      if (params.roomId !== "new") {
        try {
          const response = await fetch(`/api/rooms/${params.roomId}`);
          if (response.ok) {
            const data = await response.json();
            setRoomData(data);
          } else {
            console.error("Error carregant la sala");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      setLoading(false);
    };

    loadRoomData();
  }, [params.roomId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Carregant...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <EscapeRoomEditor roomData={roomData} setRoomData={setRoomData} />
    </div>
  );
}
