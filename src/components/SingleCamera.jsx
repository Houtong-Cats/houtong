import { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { createMediaStreamSource, Transform2D } from "@snap/camera-kit";
import useCameraKit from "../hooks/useCameraKit";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function SingleCamera() {
  const lenCanvasRef = useRef(null);
  const resultCanvasRef = useRef(null);

  const { cameraKit: lenCameraKit, loading: loadingLen, session: lenSession } = useCameraKit();

  const query = useQuery();
  const topId = query.get("top");
  const bottomId = query.get("bottom");
  const accessoryId = query.get("accessory");

  console.log(topId, bottomId, accessoryId);

  let len = null;
  if (topId) {
    len = topId;
  } else if (bottomId) {
    len = bottomId;
  } else if (accessoryId) {
    len = accessoryId;
  }

  const groupId = "d792b303-7695-486e-bd18-0e3e7222e6c1";

  useEffect(() => {
    async function initCameraKit(session, canvasRef, cameraKit, lensId) {
      if (!session || !canvasRef.current) return;

      const liveElement = session.output.live;
      liveElement.style.display = "none";
      document.body.appendChild(liveElement);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const source = createMediaStreamSource(stream, {
        transform: Transform2D.MirrorX,
        cameraType: "front",
      });
      await session.setSource(source);

      if (lensId) {
        const lens = await cameraKit.lensRepository.loadLens(lensId, groupId);
        await session.applyLens(lens);
      }

      session.play("live");

      const drawFrame = () => {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          // Match the canvas size to the container size
          const { width, height } = canvasRef.current.getBoundingClientRect();
          canvasRef.current.width = width;
          canvasRef.current.height = height;

          // Disable image smoothing
          ctx.imageSmoothingEnabled = false;

          ctx.drawImage(liveElement, 0, 0, width, height);
        }
        requestAnimationFrame(drawFrame);
      };
      drawFrame();
    }

    if (lenSession) {
      initCameraKit(lenSession, lenCanvasRef, lenCameraKit, len);
    }

    function compareCanvases() {
      const lenCanvas = lenCanvasRef.current;
      const resultCanvas = resultCanvasRef.current;

      if (!lenCanvas) return;

      const lenCtx = lenCanvas.getContext("2d");
      const resultCtx = resultCanvas.getContext("2d");

      const width = lenCanvas.width;
      const height = lenCanvas.height;

      resultCanvas.width = width;
      resultCanvas.height = height;

      const lenImageData = lenCtx.getImageData(0, 0, width, height);
      const resultImageData = resultCtx.createImageData(width, height);

      for (let i = 0; i < lenImageData.data.length; i += 4) {
        const rLen = lenImageData.data[i];
        const gLen = lenImageData.data[i + 1];
        const bLen = lenImageData.data[i + 2];
        const aLen = lenImageData.data[i + 3];

        // Set the default to camera
        resultImageData.data[i] = rLen;
        resultImageData.data[i + 1] = gLen;
        resultImageData.data[i + 2] = bLen;
        resultImageData.data[i + 3] = aLen;
      }
      resultCtx.putImageData(resultImageData, 0, 0);
    }

    const updateInterval = () => {
      compareCanvases();
      setTimeout(updateInterval); // , 1000 / 25) to limit the frame rate
    };
    updateInterval();
  }, [lenSession]);

  if (loadingLen) {
    return (
      <div className="flex items-center justify-center text-orange-200">
        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2zm2 8a8 8 0 018-8h2a10 10 0 00-10-10v2z"></path>
        </svg>
        Loading...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full h-full object-cover">
      <div id="len-canvas-container" className="absolute invisible">
        <canvas ref={lenCanvasRef} width={640} height={480} />
      </div>
      <canvas ref={resultCanvasRef} width={640} height={480} className="h-full w-full rounded-3xl object-cover" />
    </div>
  );
}
