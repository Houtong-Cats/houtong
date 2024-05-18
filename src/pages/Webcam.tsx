import { useRef, useEffect, useState } from "react";
import ReactWebcam from "react-webcam";
import usePoseLandmarker from "../hooks/usePoseLandmarker";

// 3js
import * as THREE from "three";
import { MAX_NUM_POSES, NUM_LANDMARKS } from "../lib/constants";
import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { getColorFromIdx } from "../lib/utils";

type SphereType = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>;

export default function Webcam() {
  const { poseLandmarker } = usePoseLandmarker();
  const webcamRef = useRef<ReactWebcam>(null);
  const lastVideoTimeRef = useRef(-1);
  const pointsRef = useRef<SphereType[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");

  useEffect(() => {
    async function initDevices() {
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      setDevices(mediaDevices.filter((mediaDevice) => mediaDevice.deviceId));
      setDeviceId(mediaDevices[2].deviceId);
    }

    initDevices();
  }, []);

  function handleLoadedData() {
    const videoElement = webcamRef.current?.video;
    const canvas = canvasRef.current;

    if (!poseLandmarker || !videoElement || !canvas) return;

    poseLandmarker.setOptions({ runningMode: "VIDEO" });

    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 0.5;
    camera.position.x = 0.5;
    camera.position.y = -0.5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(width, height);
    // document.body.appendChild(renderer.domElement);

    // Create sphere points
    pointsRef.current = [];
    for (let poseIdx = 0; poseIdx < MAX_NUM_POSES; poseIdx++) {
      const landmarkSpheres: SphereType[] = [];

      for (let landmarkIdx = 0; landmarkIdx < NUM_LANDMARKS; landmarkIdx++) {
        const geometry = new THREE.SphereGeometry(0.01);
        const material = new THREE.MeshBasicMaterial({ color: getColorFromIdx(poseIdx) });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        landmarkSpheres.push(sphere);
      }

      pointsRef.current.push(landmarkSpheres);
    }

    function animate() {
      requestAnimationFrame(animate);

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      const video = webcamRef.current?.video;
      const startTimeMs = performance.now();

      if (!poseLandmarker || !video) return;

      if (video.currentTime !== lastVideoTimeRef.current) {
        lastVideoTimeRef.current = video.currentTime;
        poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
          const poses = result.landmarks; // one pose is one person (can have multiple people)

          for (let poseIdx = 0; poseIdx < MAX_NUM_POSES; poseIdx++) {
            for (let landmarkIdx = 0; landmarkIdx < NUM_LANDMARKS; landmarkIdx++) {
              const landmarkSphere: SphereType = pointsRef.current[poseIdx][landmarkIdx];

              // pose no longer detected
              if (poseIdx > poses.length - 1) {
                landmarkSphere.visible = false;
                landmarkSphere.visible = false;
                continue;
              }

              // update landmarkSphere position
              const landmarkData: NormalizedLandmark = poses[poseIdx][landmarkIdx];
              landmarkSphere.visible = true;
              landmarkSphere.position.x = landmarkData.x;
              landmarkSphere.position.y = -landmarkData.y;
              // landmarkSphere.position.z = -landmarkData.z;
            }
          }
        });
      }

      renderer.render(scene, camera);
    }

    animate();
  }

  return (
    <div style={{ position: "relative" }}>
      <ReactWebcam audio={false} ref={webcamRef} videoConstraints={{ deviceId }} onLoadedData={handleLoadedData} />
      <select value={deviceId} onChange={(e) => setDeviceId(e.target.value)}>
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
      <canvas style={{ position: "absolute", top: 0, left: 0 }} ref={canvasRef}></canvas>
    </div>
  );
}