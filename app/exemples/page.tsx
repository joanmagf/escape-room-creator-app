import dynamic from "next/dynamic";

const AFrameScene = dynamic(() => import("@/components/scenes/scene-1"), {
  ssr: false,
});

export default function Home() {
  return <AFrameScene />;
}
