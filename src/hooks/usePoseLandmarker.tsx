import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useEffect, useState } from "react";
import { MAX_NUM_POSES } from "../lib/constants";

export default function usePoseLandmarker() {
  const [poseLandmarker, setPoseLandmarker] = useState<PoseLandmarker | null>(null);

  useEffect(() => {
    async function initPoseLandmarker() {
      const vision = await FilesetResolver.forVisionTasks(
        // path/to/wasm/root
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );

      const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
        },
        runningMode: "VIDEO",
        numPoses: MAX_NUM_POSES, // The maximum number of poses that can be detected by the Pose Landmarker.
      });

      setPoseLandmarker(poseLandmarker);
    }
    initPoseLandmarker();
  }, []);

  return { poseLandmarker };
}
