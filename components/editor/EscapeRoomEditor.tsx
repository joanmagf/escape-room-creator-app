"use client";

import { Object3D, Room } from "@/app/lib/types";
import InteractionsPanel from "@/components/editor/InteractionsPanel";
import ObjectLibrary from "@/components/editor/ObjectLibrary";
import PropertiesPanel from "@/components/editor/PropertiesPanel";
import AFRAME from "aframe";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPlay, FaSave } from "react-icons/fa";

interface EscapeRoomEditorProps {
  roomData: Room;
  setRoomData: React.Dispatch<React.SetStateAction<Room>>;
}

export default function EscapeRoomEditor({
  roomData,
  setRoomData,
}: EscapeRoomEditorProps) {
  const [selectedEntity, setSelectedEntity] = useState<HTMLElement | null>(
    null
  );
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const sceneRef = useRef<HTMLElement | null>(null);

  // Registrar els components personalitzats d'A-Frame
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Registrar component per fer els objectes seleccionables
      AFRAME.registerComponent("selectable", {
        init: function () {
          const el = this.el;
          el.addEventListener("click", function () {
            setSelectedEntity(el);
          });
        },
      });

      // Registrar component per a les interaccions
      AFRAME.registerComponent("escape-interactive", {
        schema: {
          type: { type: "string", default: "question" },
          question: { type: "string", default: "" },
          answer: { type: "string", default: "" },
          feedback: { type: "string", default: "" },
          unlocks: { type: "string", default: "" },
        },
        init: function () {
          // Implementar interaccions en mode preview
          if (showPreview) {
            // Codi per a les interaccions...
          }
        },
      });
    }
  }, [showPreview]);

  // Guardar la sala
  const saveRoom = async () => {
    if (!sceneRef.current) return;

    // Obtenir l'HTML de l'escena
    const entitiesHtml: string[] = [];
    sceneRef.current
      .querySelectorAll('a-entity[id^="object-"]')
      .forEach((entity) => {
        entitiesHtml.push(entity.outerHTML);
      });

    const updatedRoomData: Room = {
      ...roomData,
      entities: entitiesHtml,
    };

    // Guardar a la base de dades
    try {
      const response = await fetch("/api/rooms/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRoomData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Sala guardada amb èxit!");

        // Actualitzar roomData si cal
        setRoomData(data);
      }
    } catch (error) {
      console.error("Error guardant la sala", error);
      alert("Error guardant la sala");
    }
  };

  // Afegir un objecte a l'escena
  const addObjectToScene = (objectData: Object3D) => {
    if (!sceneRef.current) return;

    const newEntityId = `object-${Date.now()}`;
    const newEntity = document.createElement(objectData.component);
    newEntity.id = newEntityId;

    // Afegir atribut selectable
    newEntity.setAttribute("selectable", "");

    // Afegir propietats
    Object.entries(objectData.properties).forEach(([key, value]) => {
      newEntity.setAttribute(key, value);
    });

    // Afegir a l'escena
    const sceneContent = sceneRef.current.querySelector("#scene-content");
    if (sceneContent) {
      sceneContent.appendChild(newEntity);
      // Seleccionar l'entitat nova
      setSelectedEntity(newEntity);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Barra superior */}
      <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <a href="/dashboard" className="p-2 hover:bg-gray-700 rounded">
            <FaArrowLeft />
          </a>
          <h1 className="text-xl font-bold">
            {roomData.name || "Nova sala d'escape"}
          </h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`p-2 rounded ${
              showPreview ? "bg-orange-500" : "bg-blue-500"
            }`}
          >
            <FaPlay />
            <span className="ml-1">{showPreview ? "Editar" : "Preview"}</span>
          </button>
          <button
            onClick={saveRoom}
            className="bg-green-500 hover:bg-green-600 p-2 rounded flex items-center"
          >
            <FaSave />
            <span className="ml-1">Guardar</span>
          </button>
        </div>
      </div>

      {/* Àrea principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Biblioteca d'objectes (esquerra) */}
        {!showPreview && (
          <div className="w-64 bg-white p-4 overflow-y-auto shadow-md">
            <h2 className="text-lg font-bold mb-4">Objectes</h2>
            <ObjectLibrary onAddObject={addObjectToScene} />
          </div>
        )}

        {/* Escena A-Frame (centre) */}
        <div className="flex-1 relative">
          <a-scene embedded ref={sceneRef as React.RefObject<HTMLElement>}>
            <a-entity id="scene-content">
              {/* Aquí s'afegiran els objectes de manera dinàmica */}
              {roomData.entities && roomData.entities.length > 0 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: roomData.entities.join("\n"),
                  }}
                />
              )}
            </a-entity>
            <a-entity
              camera
              look-controls
              wasd-controls
              position="0 1.6 0"
            ></a-entity>
            <a-sky color="#ECECEC"></a-sky>
            <a-plane
              position="0 0 0"
              rotation="-90 0 0"
              width="20"
              height="20"
              color="#7BC8A4"
            ></a-plane>
          </a-scene>
        </div>

        {/* Panell de propietats (dreta) */}
        {!showPreview && selectedEntity && (
          <div className="w-80 bg-white p-4 overflow-y-auto shadow-md">
            <h2 className="text-lg font-bold mb-4">Propietats</h2>
            <PropertiesPanel
              entity={selectedEntity}
              onDelete={() => {
                if (selectedEntity && selectedEntity.parentNode) {
                  selectedEntity.parentNode.removeChild(selectedEntity);
                  setSelectedEntity(null);
                }
              }}
            />

            <div className="mt-6">
              <h2 className="text-lg font-bold mb-4">Interaccions</h2>
              <InteractionsPanel entity={selectedEntity} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
