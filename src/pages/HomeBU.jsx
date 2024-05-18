import { useEffect, useRef } from "react";
import { createMediaStreamSource, Transform2D } from "@snap/camera-kit";
import useCameraKit from "../hooks/useCameraKit";

export default function Home() {
  const topCanvasRef = useRef(null);
  const bottomCanvasRef = useRef(null);
  const accessoryCanvasRef = useRef(null);
  const resultCanvasRef = useRef(null);

  const { cameraKit, loading: loadingTop, session: topSession } = useCameraKit(topCanvasRef.current);
  const { cameraKit: cameraKitBottom, loading: loadingBottom, session: bottomSession } = useCameraKit(bottomCanvasRef.current);
  const { cameraKit: cameraKitAccessory, loading: loadingAccessory, session: accessorySession } = useCameraKit(accessoryCanvasRef.current);

  useEffect(() => {
    async function initCameraKit(session, containerRef, cameraKit, lensId) {
      if (!session || !containerRef.current) return;

      const videoElement = document.createElement('video');
      videoElement.style.display = 'none';
      // document.body.appendChild(videoElement);
      document.body.appendChild(session.output.live);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.srcObject = stream;
      videoElement.play();

      const source = createMediaStreamSource(stream, {
        transform: Transform2D.MirrorX,
        cameraType: "front",
      });
      await session.setSource(source);

      if (lensId !== "") {
        const lens = await cameraKit.lensRepository.loadLens(lensId, "d792b303-7695-486e-bd18-0e3e7222e6c1");
        await session.applyLens(lens);
      }

      session.play("live");

      const drawFrame = () => {
        if (containerRef.current) {
          const ctx = containerRef.current.getContext("2d");
          ctx.drawImage(videoElement, 0, 0, containerRef.current.width, containerRef.current.height);
        }
        requestAnimationFrame(drawFrame);
      };
      drawFrame();
    }

    function subtractCanvasImages() {
      const topCanvas = topCanvasRef.current;
      const bottomCanvas = bottomCanvasRef.current;
      const accessoryCanvas = accessoryCanvasRef.current;
      const resultCanvas = resultCanvasRef.current;

      if (!topCanvas || !bottomCanvas || !accessoryCanvas || !resultCanvas) return;

      const topCtx = topCanvas.getContext("2d");
      const bottomCtx = bottomCanvas.getContext("2d");
      const accessoryCtx = accessoryCanvas.getContext("2d");
      const resultCtx = resultCanvas.getContext("2d");

      const width = topCanvas.width;
      const height = topCanvas.height;

      resultCanvas.width = width;
      resultCanvas.height = height;

      const topImageData = topCtx.getImageData(0, 0, width, height);
      const bottomImageData = bottomCtx.getImageData(0, 0, width, height);
      const accessoryImageData = accessoryCtx.getImageData(0, 0, width, height);
      const resultImageData = resultCtx.createImageData(width, height);

      for (let i = 0; i < topImageData.data.length; i += 4) {
        const rTop = topImageData.data[i];
        const gTop = topImageData.data[i + 1];
        const bTop = topImageData.data[i + 2];
        const aTop = topImageData.data[i + 3];

        const rBottom = bottomImageData.data[i];
        const gBottom = bottomImageData.data[i + 1];
        const bBottom = bottomImageData.data[i + 2];
        const aBottom = bottomImageData.data[i + 3];

        const rAccessory = accessoryImageData.data[i];
        const gAccessory = accessoryImageData.data[i + 1];
        const bAccessory = accessoryImageData.data[i + 2];
        const aAccessory = accessoryImageData.data[i + 3];

        if (rTop === rBottom && gTop === gBottom && bTop === bBottom && aTop === aBottom) {
          resultImageData.data[i] = rAccessory;
          resultImageData.data[i + 1] = gAccessory;
          resultImageData.data[i + 2] = bAccessory;
          resultImageData.data[i + 3] = aAccessory;
        } else if (rTop === rAccessory && gTop === gAccessory && bTop === bAccessory && aTop === aAccessory) {
          resultImageData.data[i] = rTop;
          resultImageData.data[i + 1] = gTop;
          resultImageData.data[i + 2] = bTop;
          resultImageData.data[i + 3] = aTop;
        } else if (rBottom === rAccessory && gBottom === gAccessory && bBottom === bAccessory && aBottom === aAccessory) {
          resultImageData.data[i] = rBottom;
          resultImageData.data[i + 1] = gBottom;
          resultImageData.data[i + 2] = bBottom;
          resultImageData.data[i + 3] = aBottom;
        } else {
          resultImageData.data[i] = rAccessory;
          resultImageData.data[i + 1] = gAccessory;
          resultImageData.data[i + 2] = bAccessory;
          resultImageData.data[i + 3] = aAccessory;
        }
      }

      resultCtx.putImageData(resultImageData, 0, 0);
    }

    if (topSession) {
      initCameraKit(topSession, topCanvasRef, cameraKit, "607d20a3-60fb-4414-90f7-fbe3629307f3");
    }

    if (bottomSession) {
      initCameraKit(bottomSession, bottomCanvasRef, cameraKitBottom, "607d20a3-60fb-4414-90f7-fbe3629307f3");
    }

    if (accessorySession) {
      initCameraKit(accessorySession, accessoryCanvasRef, cameraKitAccessory, "607d20a3-60fb-4414-90f7-fbe3629307f3");
    }

    const updateInterval = () => {
      subtractCanvasImages();
      requestAnimationFrame(updateInterval);
    };
    updateInterval();

  }, [topSession, bottomSession, accessorySession]);

  if (loadingTop || loadingBottom || loadingAccessory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row w-full h-screen bg-black">
      <div className="w-1/3 h-full">
        top
        <canvas ref={topCanvasRef} className="w-full h-full" />
      </div>
      <div className="w-1/3 h-full">
        bottom
        <canvas ref={bottomCanvasRef} className="w-full h-full" />
      </div>
      <div className="w-1/3 h-full">
        accessory
        <canvas ref={accessoryCanvasRef} className="w-full h-full" />
      </div>
      <div className="w-full h-full">
        result
        <canvas ref={resultCanvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}