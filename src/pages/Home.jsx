import { useEffect, useRef } from "react";
import { createMediaStreamSource, Transform2D } from "@snap/camera-kit";
import useCameraKit from "../hooks/useCameraKit";

// functoin to compare 2 rgba values are almost the same color
const colorDistance = (r1, g1, b1, r2, g2, b2) => {
    return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
};

export default function Home() {
    const topCanvasRef = useRef(null);
    const bottomCanvasRef = useRef(null);
    const accessoryCanvasRef = useRef(null);
    const cameraCanvasRef = useRef(null);
    const resultCanvasRef = useRef(null);

    const { cameraKit: topCameraKit, loading: loadingTop, session: topSession } = useCameraKit();
    const { cameraKit: bottomCameraKit, loading: loadingBottom, session: bottomSession } = useCameraKit();
    const { cameraKit: accessoryCameraKit, loading: loadingAccessory, session: accessorySession } = useCameraKit();
    const { cameraKit: cameraCameraKit, loading: loadingCamera, session: cameraSession } = useCameraKit();

    useEffect(() => {
        async function initCameraKit(session, canvasRef, cameraKit, lensId) {
            if (!session || !canvasRef.current) return;

            const liveElement = session.output.live;
            liveElement.style.display = 'none';
            document.body.appendChild(liveElement);

            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const source = createMediaStreamSource(stream, {
                fpsLimit: 30, // 30
                transform: Transform2D.MirrorX,
                cameraType: "front",
            });
            await session.setSource(source);

            if (lensId) {
                const lens = await cameraKit.lensRepository.loadLens(lensId, "d792b303-7695-486e-bd18-0e3e7222e6c1");
                await session.applyLens(lens);
            }

            session.play("live");

            const drawFrame = () => {
                const ctx = canvasRef.current.getContext("2d");
                if (ctx) {
                    ctx.drawImage(liveElement, 0, 0, canvasRef.current.width, canvasRef.current.height);
                }
                requestAnimationFrame(drawFrame);
            };
            drawFrame();
        }

        if (topSession) {
            initCameraKit(topSession, topCanvasRef, topCameraKit, "a2e19cb7-c79e-419d-9bd1-f38ac4db454c");
        }

        if (bottomSession) {
            initCameraKit(bottomSession, bottomCanvasRef, bottomCameraKit, ""); // 607d20a3-60fb-4414-90f7-fbe3629307f3
        }

        if (accessorySession) {
            initCameraKit(accessorySession, accessoryCanvasRef, accessoryCameraKit, "f26c157c-ed7c-49ac-918f-f6c37b23323c");
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

                // set the default to camera
                resultImageData.data[i] = rCamera;
                resultImageData.data[i + 1] = gCamera;
                resultImageData.data[i + 2] = bCamera;
                resultImageData.data[i + 3] = aCamera;

                // render priority to the accessory image, then top, then bottom

                // check if top, bottom, and accessory is same as the camera
                const threshold = 15;

                const topDifferent = colorDistance(rTop, gTop, bTop, rCamera, gCamera, bCamera) > threshold;
                const bottomDifferent = colorDistance(rBottom, gBottom, bBottom, rCamera, gCamera, bCamera) > threshold;
                const accessoryDifferent = colorDistance(rAccessory, gAccessory, bAccessory, rCamera, gCamera, bCamera) > threshold;


                // if (i === 0) {
                //     console.log(topDifferent, bottomDifferent, accessoryDifferent)
                //     // print out the rgba values
                //     console.log("top: ", rTop, gTop, bTop, aTop)
                //     console.log("bottom: ", rBottom, gBottom, bBottom, aBottom)
                //     console.log("accessory: ", rAccessory, gAccessory, bAccessory, aAccessory)
                //     console.log("camera: ", rCamera, gCamera, bCamera, aCamera)
                // }

                // Check for differences and apply priority: accessory > top > bottom
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
            requestAnimationFrame(updateInterval);
        };
        updateInterval();

    }, [topSession, bottomSession, accessorySession, cameraSession]);

    if (loadingTop || loadingBottom || loadingAccessory || loadingCamera) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full h-screen">
            <div id="top-canvas-container" className="absolute invisible">
                <canvas ref={topCanvasRef} width={640} height={480} className="w-full h-full" />
                <h2 className="text-center text-white">Top Camera</h2>
            </div>
            <div id="bottom-canvas-container" className="absolute invisible">
                <canvas ref={bottomCanvasRef} width={640} height={480} className="w-full h-full" />
                <h2 className="text-center text-white">Bottom Camera</h2>
            </div>
            <div id="accessory-canvas-container" className="absolute invisible">
                <canvas ref={accessoryCanvasRef} width={640} height={480} className="w-full h-full" />
                <h2 className="text-center text-white">Accessory Camera</h2>
            </div>
            <div id="camera-canvas-container" className="absolute invisible">
                <canvas ref={cameraCanvasRef} width={640} height={480} className="w-full h-full" />
                <h2 className="text-center text-white">Camera</h2>
            </div>
            <div className="flex-1">
                <canvas ref={resultCanvasRef} width={640} height={480} className="w-full h-full" />
                <h2 className="text-center text-white">Result</h2>
            </div>
        </div>
    );
}