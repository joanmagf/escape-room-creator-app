// components/editor/PropertiesPanel.tsx
"use client";

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface PropertiesPanelProps {
  entity: HTMLElement;
  onDelete: () => void;
}

export default function PropertiesPanel({
  entity,
  onDelete,
}: PropertiesPanelProps) {
  const [position, setPosition] = useState<string>("0 0 0");
  const [rotation, setRotation] = useState<string>("0 0 0");
  const [scale, setScale] = useState<string>("1 1 1");
  const [color, setColor] = useState<string>("#FFFFFF");

  // Carregar les propietats de l'entitat seleccionada
  useEffect(() => {
    if (entity) {
      // Per als atributs compostos, hem de manipular-los com a cadenes
      const posAttr = entity.getAttribute("position");
      const rotAttr = entity.getAttribute("rotation");
      const scaleAttr = entity.getAttribute("scale");

      // Formatar els valors per a posició, rotació i escala
      setPosition(
        typeof posAttr === "string"
          ? posAttr
          : posAttr
          ? `${posAttr.x} ${posAttr.y} ${posAttr.z}`
          : "0 0 0"
      );

      setRotation(
        typeof rotAttr === "string"
          ? rotAttr
          : rotAttr
          ? `${rotAttr.x} ${rotAttr.y} ${rotAttr.z}`
          : "0 0 0"
      );

      setScale(
        typeof scaleAttr === "string"
          ? scaleAttr
          : scaleAttr
          ? `${scaleAttr.x} ${scaleAttr.y} ${scaleAttr.z}`
          : "1 1 1"
      );

      // Per als atributs simples
      setColor(entity.getAttribute("color") || "#FFFFFF");
    }
  }, [entity]);

  // Actualitzar una propietat
  const updateProperty = (property: string, value: string) => {
    if (entity) {
      entity.setAttribute(property, value);
    }
  };

  if (!entity) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">ID: {entity.id}</h3>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
          title="Eliminar objecte"
        >
          <FaTrash />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Posició (x y z)
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
              updateProperty("position", e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Rotació (x y z)
          </label>
          <input
            type="text"
            value={rotation}
            onChange={(e) => {
              setRotation(e.target.value);
              updateProperty("rotation", e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Escala (x y z)
          </label>
          <input
            type="text"
            value={scale}
            onChange={(e) => {
              setScale(e.target.value);
              updateProperty("scale", e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <div className="flex space-x-2">
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                updateProperty("color", e.target.value);
              }}
              className="p-0 h-10 w-10 border"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                updateProperty("color", e.target.value);
              }}
              className="flex-1 px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
