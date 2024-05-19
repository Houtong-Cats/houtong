import { GLTFLoader } from "../lib/jsm/loaders/GLTFLoader.js";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  glbFile: any;
};

export default function SpinningPreview({ glbFile }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(width, height);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load glTF model
    const loader = new GLTFLoader();
    let model;
    loader.load(
      glbFile,
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
        model.position.set(0, 0, 0);

        // Scale down the model
        model.scale.set(5, 5, 5); // Adjust these values as needed
      },
      undefined,
      (error) => {
        console.error("Error: ", error);
      }
    );

    camera.position.z = 4;
    camera.position.y = 6;

    function animate() {
      requestAnimationFrame(animate);

      if (model) {
        model.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <canvas style={{ height: "100%", width: "100%" }} ref={canvasRef}></canvas>;
}
