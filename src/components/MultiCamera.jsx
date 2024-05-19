import { useEffect, useRef } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { createMediaStreamSource, Transform2D } from "@snap/camera-kit";
import useCameraKit from "../hooks/useCameraKit";

// Function to compare if 2 rgba values are almost the same color
const colorDistance = (r1, g1, b1, r2, g2, b2) => {
    return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
};

export default function MultiCamera() {
    const topCanvasRef = useRef(null);
    const bottomCanvasRef = useRef(null);
    const accessoryCanvasRef = useRef(null);
    const cameraCanvasRef = useRef(null);
    const resultCanvasRef = useRef(null);

    const { cameraKit: topCameraKit, loading: loadingTop, session: topSession } = useCameraKit();
    const { cameraKit: bottomCameraKit, loading: loadingBottom, session: bottomSession } = useCameraKit();
    const { cameraKit: accessoryCameraKit, loading: loadingAccessory, session: accessorySession } = useCameraKit();
    const { cameraKit: cameraCameraKit, loading: loadingCamera, session: cameraSession } = useCameraKit();

    const itemId = useLocation().pathname.split("/")[2];
    console.log(itemId);

    const top = "a2e19cb7-c79e-419d-9bd1-f38ac4db454c";
    const bottom = "95281864-5320-4088-b7ef-fb571d295ed6"
    const accessory = "f26c157c-ed7c-49ac-918f-f6c37b23323c"
    const groupId = "d792b303-7695-486e-bd18-0e3e7222e6c1"

    useEffect(() => {
        async function initCameraKit(session, canvasRef, cameraKit, lensId) {
            if (!session || !canvasRef.current) return;

            const liveElement = session.output.live;
            liveElement.style.display = 'none';
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

        if (topSession) {
            initCameraKit(topSession, topCanvasRef, topCameraKit, top);
        }

        if (bottomSession) {
            initCameraKit(bottomSession, bottomCanvasRef, bottomCameraKit, bottom);
        }

        if (accessorySession) {
            initCameraKit(accessorySession, accessoryCanvasRef, accessoryCameraKit, accessory);
        }

        if (cameraSession) {
            initCameraKit(cameraSession, cameraCanvasRef, cameraCameraKit, "");
        }

        function compareCanvases() {
            const topCanvas = topCanvasRef.current;
            const bottomCanvas = bottomCanvasRef.current;
            const accessoryCanvas = accessoryCanvasRef.current;
            const cameraCanvas = cameraCanvasRef.current;
            const resultCanvas = resultCanvasRef.current;

            if (!topCanvas || !bottomCanvas || !accessoryCanvas || !cameraCanvas || !resultCanvas) return;

            const topCtx = topCanvas.getContext("2d");
            const bottomCtx = bottomCanvas.getContext("2d");
            const accessoryCtx = accessoryCanvas.getContext("2d");
            const cameraCtx = cameraCanvas.getContext("2d");
            const resultCtx = resultCanvas.getContext("2d");

            const width = topCanvas.width;
            const height = topCanvas.height;

            resultCanvas.width = width;
            resultCanvas.height = height;

            const topImageData = topCtx.getImageData(0, 0, width, height);
            const bottomImageData = bottomCtx.getImageData(0, 0, width, height);
            const accessoryImageData = accessoryCtx.getImageData(0, 0, width, height);
            const cameraImageData = cameraCtx.getImageData(0, 0, width, height);
            const resultImageData = resultCtx.createImageData(width, height);

            const threshold =  15;

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

                const rCamera = cameraImageData.data[i];
                const gCamera = cameraImageData.data[i + 1];
                const bCamera = cameraImageData.data[i + 2];
                const aCamera = cameraImageData.data[i + 3];

                // Set the default to camera
                resultImageData.data[i] = rCamera;
                resultImageData.data[i + 1] = gCamera;
                resultImageData.data[i + 2] = bCamera;
                resultImageData.data[i + 3] = aCamera;

                // Render priority to the accessory image, then top, then bottom
                const topDifferent = colorDistance(rTop, gTop, bTop, rCamera, gCamera, bCamera) > threshold;
                const bottomDifferent = colorDistance(rBottom, gBottom, bBottom, rCamera, gCamera, bCamera) > threshold;
                const accessoryDifferent = colorDistance(rAccessory, gAccessory, bAccessory, rCamera, gCamera, bCamera) > threshold;

                if (accessoryDifferent) {
                    resultImageData.data[i] = rAccessory;
                    resultImageData.data[i + 1] = gAccessory;
                    resultImageData.data[i + 2] = bAccessory;
                    resultImageData.data[i + 3] = aAccessory;
                } else if (topDifferent) {
                    resultImageData.data[i] = rTop;
                    resultImageData.data[i + 1] = gTop;
                    resultImageData.data[i + 2] = bTop;
                    resultImageData.data[i + 3] = aTop;
                } else if (bottomDifferent) {
                    resultImageData.data[i] = rBottom;
                    resultImageData.data[i + 1] = gBottom;
                    resultImageData.data[i + 2] = bBottom;
                    resultImageData.data[i + 3] = aBottom;
                }
            }
            resultCtx.putImageData(resultImageData, 0, 0);
        }

        const updateInterval = () => {
            compareCanvases();
            setTimeout(updateInterval); // , 1000 / 25) to limit the frame rate
        };
        updateInterval();

    }, [topSession, bottomSession, accessorySession, cameraSession]);

    if (loadingTop || loadingBottom || loadingAccessory || loadingCamera) {
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
            <div id="top-canvas-container" className="absolute invisible">
                <canvas ref={topCanvasRef} width={640} height={480} />
            </div>
            <div id="bottom-canvas-container" className="absolute invisible">
                <canvas ref={bottomCanvasRef} width={640} height={480} />
            </div>
            <div id="accessory-canvas-container" className="absolute invisible">
                <canvas ref={accessoryCanvasRef} width={640} height={480} />
            </div>
            <div id="camera-canvas-container" className="absolute invisible">
                <canvas ref={cameraCanvasRef} width={640} height={480} />
            </div>
            <canvas ref={resultCanvasRef} width={640} height={480} className="h-full w-full rounded-3xl object-cover" />
        </div>
    );
}