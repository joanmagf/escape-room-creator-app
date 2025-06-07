 
      AFRAME.registerComponent("models-array", {
        schema: {
          models: { type: "array", oneOf: ["one", "two", "three", "four"] },
        },
      });

      AFRAME.registerComponent("draw-smiley", {
        schema: {
          canvas: { type: "selector" },
        },
        init() {
          var canvas = this.data.canvas;
          var ctx = canvas.getContext("2d");

          // Clear canvas and fill with white background
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Center point of canvas
          var centerX = canvas.width / 2;
          var centerY = canvas.height / 2;

          // Smiley parameters
          var faceRadius = 200;
          var eyeRadius = 20;
          var eyeOffsetX = 60;
          var eyeOffsetY = 50;
          var mouthRadius = 120;

          // Draw face
          ctx.beginPath();
          ctx.arc(centerX, centerY, faceRadius, 0, Math.PI * 2, true); // Outer circle
          ctx.fillStyle = "yellow";
          ctx.fill();
          ctx.strokeStyle = "black";
          ctx.lineWidth = 4;
          ctx.stroke();

          // Draw eyes
          ctx.beginPath();
          ctx.arc(
            centerX - eyeOffsetX,
            centerY - eyeOffsetY,
            eyeRadius,
            0,
            Math.PI * 2,
            true
          ); // Left eye
          ctx.arc(
            centerX + eyeOffsetX,
            centerY - eyeOffsetY,
            eyeRadius,
            0,
            Math.PI * 2,
            true
          ); // Right eye
          ctx.fillStyle = "black";
          ctx.fill();

          // Draw smile
          ctx.beginPath();
          ctx.arc(centerX, centerY + 30, mouthRadius, 0, Math.PI, false); // Mouth (smile)
          ctx.lineWidth = 8;
          ctx.strokeStyle = "black";
          ctx.stroke();
        },
      });

      let hasKey = false;

      AFRAME.registerComponent("pickup-key", {
        init: function () {
          this.el.addEventListener("click", () => {
            hasKey = true;
            this.el.setAttribute("visible", "false");
            document
              .querySelector("#text")
              .setAttribute("value", "Has agafat la clau!");
          });
        },
      });

      AFRAME.registerComponent("open-door", {
        init: function () {
          this.el.addEventListener("click", () => {
            if (hasKey) {
              this.el.setAttribute("animation", {
                property: "rotation",
                to: "0 90 0",
                dur: 1000,
              });
              document
                .querySelector("#text")
                .setAttribute("value", "Has obert la porta!");
            } else {
              document
                .querySelector("#text")
                .setAttribute("value", "Necessites la clau!");
            }
          });
        },
      });

  window.addEventListener("message", (event) => {
    if (event.data === "export-scene") {
      if (!window.AFRAME || !window.AFRAME.INSPECTOR) {
        alert("AFRAME o INSPECTOR no está disponible");
        return;
      }
      try {
        const html = AFRAME.INSPECTOR.getSceneExport();
        event.source.postMessage({ type: "scene-export", html }, event.origin);
      } catch (e) {
        alert("No se pudo exportar. ¿Está abierto el inspector?");
        console.error(e);
      }
    }
  });
