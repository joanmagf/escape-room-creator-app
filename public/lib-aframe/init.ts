import AFRAME from "aframe";

export function initAFrame() {
  if (typeof window !== "undefined") {
    // Registra components personalitzats
    //registerCustomComponents();
  }
}

function registerCustomComponents() {
  if (typeof AFRAME !== "undefined") {
    // Registra el component selectable
    if (!AFRAME.components["selectable"]) {
      AFRAME.registerComponent("selectable", {
        init: function () {
          const el = this.el;
          // La lògica per a la selecció s'implementarà al component principal
          el.classList.add("selectable");
        },
      });
    }

    // Registra el component d'interacció
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
          // La lògica d'interacció s'implementarà on siga necessari
        },
      });
    }
  }
}
