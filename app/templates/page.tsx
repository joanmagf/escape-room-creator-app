// app/templates/page.tsx
"use client";

import { Room, Template } from "@/app/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaPlay, FaPlus, FaTrash } from "react-icons/fa";

export default function Templates() {
  const [templates, setTemplates] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleEditClick = async (templateName: string) => {

    const res = await fetch("/api/create-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateName }),
    });

    if (res.ok) {
      const data = await res.json();
      window.location.href = `/editor/${templateName}`;
    } else {
      const error = await res.json();
      alert("Error: " + error.error);
    }
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/templates");
        const data = await res.json();
        console.log("data: "+data);
        setTemplates(data); // Guarda aquí los nombres
        setLoading(false);
      } catch (err) {
        console.error("Error carregant les plantilles:", err);
      }
    };

    fetchTemplates();
  }, []);


  const deleteRoom = async (roomId: string) => {
    if (!window.confirm("Estàs segur que vols eliminar aquesta sala?")) return;

    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTemplates(templates.filter((template) => template.id !== roomId));
        alert("Sala eliminada amb èxit");
      }
    } catch (error) {
      console.error("Error eliminant la sala:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Carregant...
      </div>
    );
  }
console.log(templates);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Les meves plantilles per començar a crear</h1>
          <Link
            href="/editor/new"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" />
            Nova sala
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.length > 0 ? (
            templates.map((template) => (
              <div
                key={template['id']}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{template.name}</h2>
                  <p className="text-gray-600 mb-4">{template.description}</p>

                  <div className="flex space-x-2">
                    <Link
                      href={`/editor/${template.name}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center"
                    onClick={() => handleEditClick(template.name)}
                    >
                      <FaEdit className="mr-1" />
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteRoom(template.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center"
                    >
                      <FaTrash className="mr-1" />
                      Eliminar
                    </button>
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
