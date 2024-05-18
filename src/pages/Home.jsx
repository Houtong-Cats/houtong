import { useEffect } from "react";
import useCameraKit from "../hooks/useCameraKit";

export default function Home() {
    const { cameraKit, loading } = useCameraKit();

    useEffect(() => {
        async function initCameraKit() {
            if (!cameraKit) return;
            const canvasContainer = document.getElementById('canvas-container');
            const session = await cameraKit.createSession();
            canvasContainer.appendChild(session.output.live);
        }
        initCameraKit();
    },[cameraKit]);

    if (loading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <div id="canvas-container">
            {/* <h1 className="text-4xl font-bold">Home</h1>
            <p className="text-lg">Welcome to the home page.</p> */}
        </div>
    );
}