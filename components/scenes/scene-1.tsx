"use client";
import { useEffect, useRef, useState } from "react";

const Scene1 = () => {
  const sceneRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadAframe = async () => {
      if (typeof window !== "undefined") {
        await import("aframe");
        await import("@c-frame/aframe-physics-system");
      }
      setLoaded(true);
    };
    loadAframe();
  }, []);

  if (!loaded) return null;

  return (
    <a-scene ref={sceneRef} physics="gravity: -9.8" embedded>
      <a-entity
        camera
        look-controls
        wasd-controls
        position="0 1.6 0"
        dynamic-body
      ></a-entity>
      <a-plane
        rotation="-90 0 0"
        width="10"
        height="10"
        color="#7BC8A4"
        static-body
      ></a-plane>
      <a-box position="0 0.5 -3" color="gray" static-body></a-box>
      <a-sky color="#ECECEC" />
    </a-scene>
  );
};

export default Scene1;
