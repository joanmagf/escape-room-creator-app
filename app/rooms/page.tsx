// app/rooms/page.tsx
"use client";

import { Room } from "@/app/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaPlay, FaPlus, FaTrash } from "react-icons/fa";

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const handleEditClick = async (templateName: string) => {

  //   const res = await fetch("/api/create-room", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ templateName }),
  //   });

  //   if (res.ok) {
  //     const data = await res.json();
  //     window.location.href = `/editor/${templateName}`;
  //   } else {
  //     const error = await res.json();
  //     alert("Error: " + error.error);
  //   }
  // };

useEffect(() => {
  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      setRooms(data); // ← array de { id, name }
      setLoading(false);
    } catch (error) {
      console.error("Error cargando salas:", error);
    }
  };

  fetchRooms();
}, []);



  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Carregant...
      </div>
    );
  }
console.log(rooms);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sales disponibles</h1>
          {/* <Link
            href="/editor/new"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" />
            Nova sala
          </Link> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div
                key={room['id']}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{room.name}</h2>
                  <p className="text-gray-600 mb-4">{room.description}</p>

                  <div className="flex space-x-2">
                    {/* <Link
                      href={`/editor/${room.name}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center"
                    onClick={() => handleEditClick(room.name)}
                    >
                      <FaEdit className="mr-1" />
                      Editar
                    </Link> */}
                    <Link
                      href={`/viewer/${room.name}`}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center"
                    >
                      <FaPlay className="mr-1" />
                      Jugar
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 mb-4">
                Encara no has creat cap sala d'escape
              </p>
              <Link
                href="/editor/new"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center"
              >
                <FaPlus className="mr-2" />
                Crear la primera sala
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
