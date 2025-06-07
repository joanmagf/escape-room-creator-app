"use client";

import { useEffect } from "react";

export default function InspectorPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("aframe");
    }
  }, []);

  return (
    <iframe
      src="/room-1.html"
      style={{ width: "100vw", height: "100vh", border: "none" }}
    />
  );
}
