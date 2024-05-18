import { useEffect } from "react";
import { createMediaStreamSource, Transform2D } from "@snap/camera-kit";
import useCameraKit from "../hooks/useCameraKit";

export default function Home() {
  const { cameraKit, loading, session } = useCameraKit();

  useEffect(() => {
    async function initCameraKit() {
      if (!session) return;

      const canvasContainer = document.getElementById("canvas-container");
      canvasContainer.appendChild(session.output.live);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const source = createMediaStreamSource(stream, {
        transform: Transform2D.MirrorX,
        cameraType: "front",
      });
      await session.setSource(source);

      // Loading a single lens
      const lens = await cameraKit.lensRepository.loadLens("<Lens ID>", "<Lens Group ID>");
      await session.applyLens(lens);

      // // Loading one or more Lens Groups – Lenses from all groups are returned as a single array of lenses.
      // const { lenses } = await cameraKit.lensRepository.loadLensGroups(["<Lens Group ID 1>", "<Lens Group ID 2>"]);
      // await session.applyLens(lenses[0]);
    }
    initCameraKit();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="canvas-container">
      {/* <h1 className="text-4xl font-bold">Home</h1>
            <p className="text-lg">Welcome to the home page.</p> */}
    </div>
  );
}
