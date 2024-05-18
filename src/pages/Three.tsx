import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "../lib/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "../lib/jsm/loaders/GLTFLoader.js";

import tShirtGlb from "../assets/t-shirt.glb";

export default function Three() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // const edges = new THREE.EdgesGeometry(geometry);
    // const outline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    // scene.add(outline);

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
      tShirtGlb,
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
        model.position.set(0, 0, 0);

        // Scale down the model
        model.scale.set(0.5, 0.5, 0.5); // Adjust these values as needed
      },
      undefined,
      (error) => {
        console.error("An error happened", error);
      }
    );

    camera.position.z = 100;

    function animate() {
      requestAnimationFrame(animate);

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      // outline.rotation.x += 0.01;
      // outline.rotation.y += 0.01;

      if (model) {
        model.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
