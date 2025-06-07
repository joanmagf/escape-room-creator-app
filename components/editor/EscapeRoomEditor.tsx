"use client";

import { Object3D, Room } from "@/app/lib/types";
import InteractionsPanel from "@/components/editor/InteractionsPanel";
import ObjectLibrary from "@/components/editor/ObjectLibrary";
import PropertiesPanel from "@/components/editor/PropertiesPanel";
import AFRAME from "aframe";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaCog, FaPlay, FaSave } from "react-icons/fa";

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
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);
  const sceneRef = useRef<HTMLElement | null>(null);

  // Registrar els components personalitzats d'A-Frame
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Carregar el sistema de física de manera dinàmica
      const loadPhysicsSystem = async () => {
        try {
          // @ts-ignore - No hi ha tipus disponibles per aquest mòdul
          await import("@c-frame/aframe-physics-system");
          console.log("Sistema de física carregat correctament");
        } catch (error) {
          console.error("Error carregant el sistema de física:", error);
        }
      };

      // Carregar el sistema de física si no està ja carregat
      if (!AFRAME.systems["physics"]) {
        loadPhysicsSystem();
      }

      // Registrar component per fer els objectes seleccionables només si no existeix
      if (!AFRAME.components["selectable"]) {
        AFRAME.registerComponent("selectable", {
          init: function () {
            const el = this.el;
            el.addEventListener("click", function () {
              setSelectedEntity(el);
            });
          },
        });
      }

      // Registrar component per a les interaccions només si no existeix
      if (!AFRAME.components["escape-interactive"]) {
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

      // Detectar quan l'inspector s'obre/tanca amb Ctrl+Alt+I
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "i") {
          setTimeout(() => {
            const inspectorEl = document.querySelector(
              "#aframe-inspector-panel"
            );
            setInspectorOpen(!!inspectorEl);
          }, 100);
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [showPreview]);

  // Guardar la sala
  const saveRoom = async () => {
    if (!sceneRef.current) return;

    // Convertir els elements HTML a objectes Entity
    const entities: any[] = [];
    const entitiesHtml: string[] = [];

    sceneRef.current
      .querySelectorAll('a-entity[id^="object-"]')
      .forEach((element) => {
        const htmlElement = element as HTMLElement;

        // Guardar l'HTML per al viewer
        entitiesHtml.push(htmlElement.outerHTML);

        // Extreure les propietats de l'element per a la base de dades
        const entity = {
          id: htmlElement.id,
          roomId: roomData.id,
          name:
            htmlElement.getAttribute("data-name") ||
            htmlElement.tagName.toLowerCase(),
          type: htmlElement.tagName.toLowerCase().replace("a-", ""),
          position: htmlElement.getAttribute("position") || "0 0 0",
          rotation: htmlElement.getAttribute("rotation") || "0 0 0",
          scale: htmlElement.getAttribute("scale") || "1 1 1",
          color: htmlElement.getAttribute("color") || "#FFFFFF",
          material: htmlElement.getAttribute("material") || "",
          visible: htmlElement.getAttribute("visible") !== "false",
          properties: {
            geometry: htmlElement.getAttribute("geometry") || "",
            material: htmlElement.getAttribute("material") || "",
          },
        };

        entities.push(entity);
      });

    // Generar el contingut HTML complet de l'escena per al viewer
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${roomData.name || "Sala d'Escape"}</title>
  <meta name="description" content="${roomData.description || ""}">
  <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
</head>
<body>
  <a-scene embedded>
    <a-assets>
      <canvas id="canvasTexture" width="512" height="512"></canvas>
    </a-assets>

    <!-- Entitats de la sala -->
    ${entitiesHtml.join("\n    ")}

    <!-- Entorn bàsic -->
    <a-sky color="#ECECEC"></a-sky>
    <a-plane position="0 0 0" rotation="-90 0 0" width="20" height="20" color="#7BC8A4"></a-plane>
    
    <!-- Llums -->
    <a-light type="ambient" color="#404040"></a-light>
    <a-light type="point" intensity="0.75" position="0 4 0"></a-light>

    <!-- Càmera -->
    <a-entity camera look-controls wasd-controls position="0 1.6 0">
      <a-cursor position="0 0 -2" geometry="primitive: ring; radiusOuter: 0.016; radiusInner: 0.01" material="color: #ff9; shader: flat; transparent: true; opacity: 0.5" scale="2 2 2" raycaster></a-cursor>
    </a-entity>
  </a-scene>
</body>
</html>`;

    const updatedRoomData: Room = {
      ...roomData,
      entities: entities,
      htmlContent: htmlContent,
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

  // Alternar l'inspector d'A-Frame
  const toggleInspector = () => {
    if (typeof window !== "undefined" && sceneRef.current) {
      const scene = sceneRef.current as any;

      if (inspectorOpen) {
        // Tancar l'inspector
        if (scene.components && scene.components.inspector) {
          scene.components.inspector.close();
        }
        setInspectorOpen(false);
      } else {
        // Obrir l'inspector
        // Primer assegurem que l'inspector està carregat
        if (!AFRAME.components.inspector) {
          // Carregar l'inspector si no està disponible
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/gh/c-frame/aframe-editor@1.7.8/dist/aframe-editor.min.js";
          script.onload = () => {
            setTimeout(() => {
              scene.setAttribute("inspector", "");
              if (scene.components && scene.components.inspector) {
                scene.components.inspector.openInspector();
              }
              setInspectorOpen(true);
            }, 500);
          };
          document.head.appendChild(script);
        } else {
          // L'inspector ja està carregat
          scene.setAttribute("inspector", "");
          setTimeout(() => {
            if (scene.components && scene.components.inspector) {
              scene.components.inspector.openInspector();
            } else {
              // Alternativa: simular Ctrl+Alt+I
              const event = new KeyboardEvent("keydown", {
                key: "i",
                code: "KeyI",
                ctrlKey: true,
                altKey: true,
                bubbles: true,
              });
              document.dispatchEvent(event);
            }
            setInspectorOpen(true);
          }, 100);
        }
      }
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

    // Afegir component de física per defecte (static-body per objectes estàtics)
    newEntity.setAttribute("static-body", "");

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
          {!showPreview && (
            <button
              onClick={toggleInspector}
              className={`p-2 rounded flex items-center ${
                inspectorOpen
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              <FaCog />
              <span className="ml-1">
                {inspectorOpen ? "Tancar Inspector" : "Inspector"}
              </span>
            </button>
          )}
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
          <a-scene
            embedded
            ref={sceneRef as React.RefObject<HTMLElement>}
            physics="type: cannon; gravity: -9.8"
            inspector="url: https://cdn.jsdelivr.net/gh/c-frame/aframe-editor@1.7.8/dist/aframe-editor.min.js"
          >
            <a-entity id="scene-content">
              {/* Aquí s'afegiran els objectes de manera dinàmica */}
              {roomData.entities &&
                roomData.entities.length > 0 &&
                roomData.entities.map((entity) => {
                  // Si l'entitat és un string (format antic), renderitzar com HTML
                  if (typeof entity === "string") {
                    return (
                      <div
                        key={Math.random()}
                        dangerouslySetInnerHTML={{ __html: entity }}
                      />
                    );
                  }

                  // Si l'entitat és un objecte Entity, crear l'element A-Frame
                  const EntityComponent = `a-${entity.type}` as any;
                  return (
                    <EntityComponent
                      key={entity.id}
                      id={entity.id}
                      position={entity.position}
                      rotation={entity.rotation}
                      scale={entity.scale}
                      color={entity.color}
                      material={entity.material}
                      visible={entity.visible}
                      selectable=""
                      static-body
                      {...entity.properties}
                    />
                  );
                })}
            </a-entity>
            <a-entity
              camera
              look-controls
              wasd-controls
              position="0 1 0"
              dynamic-body
            ></a-entity>
            <a-sky color="#ECECEC"></a-sky>
            <a-plane
              position="0 0 0"
              rotation="-90 0 0"
              width="20"
              height="20"
              color="#7BC8A4"
              static-body
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
