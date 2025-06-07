// components/editor/ObjectLibrary.tsx
"use client";

import { Object3D } from "@/app/lib/types";

interface ObjectLibraryProps {
  onAddObject: (object: Object3D) => void;
}

export default function ObjectLibrary({ onAddObject }: ObjectLibraryProps) {
  const objectTypes: Object3D[] = [
    {
      name: "Caixa",
      component: "a-box",
      properties: {
        position: "0 0.5 -3",
        color: "#4CC3D9",
        width: "1",
        height: "1",
        depth: "1",
      },
    },
    {
      name: "Esfera",
      component: "a-sphere",
      properties: { position: "0 1.25 -5", radius: "1.25", color: "#EF2D5E" },
    },
    {
      name: "Cilindre",
      component: "a-cylinder",
      properties: {
        position: "1 0.75 -3",
        radius: "0.5",
        height: "1.5",
        color: "#FFC65D",
      },
    },
    {
      name: "Text",
      component: "a-text",
      properties: {
        value: "Text",
        position: "0 2 -3",
        color: "#000000",
        width: "4",
        align: "center",
      },
    },
    {
      name: "Porta",
      component: "a-box",
      properties: {
        position: "0 1 -5",
        width: "1.5",
        height: "2",
        depth: "0.1",
        color: "#8B4513",
      },
    },
    {
      name: "Clau",
      component: "a-cylinder",
      properties: {
        position: "2 0.1 -2",
        radius: "0.1",
        height: "0.5",
        rotation: "90 0 0",
        color: "#FFD700",
      },
    },
  ];

  return (
    <div className="grid gap-2">
      {objectTypes.map((object, index) => (
        <button
          key={index}
          className="bg-gray-100 hover:bg-gray-200 p-3 rounded text-left text-sm"
          onClick={() => onAddObject(object)}
        >
          {object.name}
        </button>
      ))}
    </div>
  );
}
