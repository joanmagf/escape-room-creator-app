"use client";

import { Room } from "@/app/lib/types";
import "aframe";
import { useEffect, useState } from "react";

export default function PlayEscapeRoom({
  params,
}: {
  params: { roomId: string };
}) {
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Carregar les dades de la sala
    const fetchRoom = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();

    // Registrar els components per a les interaccions
    if (typeof window !== "undefined") {
      // Verificar si el component ja està registrat abans de registrar-lo
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
            const el = this.el;
            const data = this.data;

            // Afegir event listener per a clicks
            el.addEventListener("click", function () {
              if (data.type === "question") {
                const userAnswer = prompt(data.question);
                if (
                  userAnswer &&
                  userAnswer.toLowerCase() === data.answer.toLowerCase()
                ) {
                  alert(data.feedback || "Correcte!");

                  // Desbloquejar un altre objecte si cal
                  if (data.unlocks) {
                    const targetEl = document.querySelector("#" + data.unlocks);
                    if (targetEl) {
                      targetEl.setAttribute("visible", "true");
                    }
                  }
                } else {
                  alert("Resposta incorrecta. Torna a provar-ho!");
                }
              } else if (data.type === "info") {
                alert(data.feedback || "Info");
              }
            });
          },
        });
      }
    }
  }, [params.roomId]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Carregant...
      </div>
    );
  }

  const renderEntity = (entity: any) => {
    const props = {
      id: entity.id,
      position: entity.position,
      rotation: entity.rotation || "0 0 0",
      color: entity.color || "#FFFFFF",
      visible: entity.visible ? "true" : "false",
      ...entity.properties,
    };

    const propsString = Object.entries(props)
      .filter(([key, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    return `<a-${entity.type} ${propsString}></a-${entity.type}>`;
  };

  return (
    <div className="h-screen">
      <a-scene embedded>
        <a-assets>
          <canvas id="canvasTexture" width="512" height="512" />
          <img id="crateImg" src="/crate.svg" />
          <img id="floorImg" src="/grass.svg" />
        </a-assets>

        <a-entity
          id="environment"
          environment="preset: forest; fog: 0"
        ></a-entity>

        <a-entity id="scene-content">
          {roomData && roomData.entities && roomData.entities.length > 0 ? (
            <div
              dangerouslySetInnerHTML={{
                __html: roomData.entities.map(renderEntity).join("\n"),
              }}
            />
          ) : (
            <div>No s'ha trobat el contingut de la sala</div>
          )}
        </a-entity>

        {/* Floor */}
        <a-entity
          id="floor"
          geometry="primitive: box; height: 0.2; depth: 24; width: 24"
          material="src: #floorImg; color: #fafafa; metalness: 0.1; repeat: 50 20; roughness: 1"
        ></a-entity>

        {/* Lights */}
        <a-entity
          id="pointLight"
          light="type: point; intensity: 0.25"
          position="0 3 3"
        ></a-entity>

        {/* Camera */}
        <a-entity id="cameraWrapper" position="0 1.6 8">
          <a-entity id="camera" camera look-controls wasd-controls>
            <a-entity
              id="cursor"
              position="0 0 -2"
              geometry="primitive: ring; radiusOuter: 0.016; radiusInner: 0.01"
              material="color: #ff9; shader: flat; transparent: true; opacity: 0.5"
              scale="2 2 2"
              raycaster
            ></a-entity>
          </a-entity>
        </a-entity>

        <a-entity id="leftHand" laser-controls="hand: left"></a-entity>
        <a-entity id="rightHand" laser-controls="hand: right"></a-entity>
      </a-scene>
    </div>
  );
}
