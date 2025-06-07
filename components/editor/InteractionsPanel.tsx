// components/editor/InteractionsPanel.tsx
"use client";

import { Interaction } from "@/app/lib/types";
import { useEffect, useState } from "react";

interface InteractionsPanelProps {
  entity: HTMLElement;
}

export default function InteractionsPanel({ entity }: InteractionsPanelProps) {
  const [interactionType, setInteractionType] = useState<
    "question" | "key" | "info"
  >("question");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [unlocksId, setUnlocksId] = useState<string>("");

  // Carregar les interaccions existents
  useEffect(() => {
    if (entity && entity.hasAttribute("escape-interactive")) {
      const data = entity.getAttribute("escape-interactive") as any;
      setInteractionType(
        (data.type as "question" | "key" | "info") || "question"
      );
      setQuestion(data.question || "");
      setAnswer(data.answer || "");
      setFeedback(data.feedback || "");
      setUnlocksId(data.unlocks || "");
    } else {
      // Restablir valors per defecte
      setInteractionType("question");
      setQuestion("");
      setAnswer("");
      setFeedback("");
      setUnlocksId("");
    }
  }, [entity]);

  // Actualitzar les interaccions
  const saveInteraction = () => {
    if (!entity) return;

    const interactionData: Interaction = {
      type: interactionType,
      question: question,
      answer: answer,
      feedback: feedback,
      unlocks: unlocksId,
    };

    entity.setAttribute("escape-interactive", interactionData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Tipus d'interacció
        </label>
        <select
          value={interactionType}
          onChange={(e) =>
            setInteractionType(e.target.value as "question" | "key" | "info")
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="question">Pregunta</option>
          <option value="key">Clau</option>
          <option value="info">Informació</option>
        </select>
      </div>

      {interactionType === "question" && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Pregunta</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Resposta</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          Missatge de feedback
        </label>
        <input
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Desbloqueja (ID de l'objecte)
        </label>
        <input
          type="text"
          value={unlocksId}
          onChange={(e) => setUnlocksId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        onClick={saveInteraction}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
      >
        Guardar interacció
      </button>
    </div>
  );
}
