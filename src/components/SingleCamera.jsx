import { useEffect, useRef } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { createMediaStreamSource, Transform2D } from "@snap/camera-kit";
import useCameraKit from "../hooks/useCameraKit";

// Function to compare if 2 rgba values are almost the same color
const colorDistance = (r1, g1, b1, r2, g2, b2) => {
    return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
};

export default function MultiCamera() {
    const lenCanvasRef = useRef(null);

    const { cameraKit: lenCameraKit, loading: loadingLen, session: lenSession } = useCameraKit();

    const itemId = useLocation().pathname.split("/")[2];
    console.log(itemId);

    const lenId = "a2e19cb7-c79e-419d-9bd1-f38ac4db454c";
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

        if (lenSession) {
            initCameraKit(lenSession, lenCanvasRef, lenCameraKit, lenId);
        }

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
        <div className="flex flex-col w-full h-full object-cover">
            <canvas ref={lenCanvasRef} width={640} height={480} className="h-full w-full rounded-3xl object-cover" />
        </div>
    );
}