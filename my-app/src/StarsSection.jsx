import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const MODEL_PATH = "assets/star_model/star.glb";
const STAR_COUNT = 60;

export default function StarsSection() {
  const mountRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;
    const { width, height } = mount.getBoundingClientRect();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 5, 5);
    scene.add(dl);

    const getViewBounds = () => {
      const dist = camera.position.z;
      const vFov = (camera.fov * Math.PI) / 180;
      const h = 2 * Math.tan(vFov / 2) * dist;
      const w = h * camera.aspect;
      return { minX: -w / 2, maxX: w / 2, minY: -h / 2, maxY: h / 2 };
    };

    const loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        const base = gltf.scene;

        // Make stars glow by adjusting materials
        base.traverse((child) => {
          if (child.isMesh) {
            child.geometry.computeBoundingSphere();
            child.geometry.center();

            // Replace original material with emissive material
            child.material = new THREE.MeshStandardMaterial({
              color: 0xffdd33,
              emissive: new THREE.Color(0xffdd33), // subtle glow color
              emissiveIntensity: 2.5,
              roughness: 0.5,
              metalness: 0.5,
            });
          }
        });

        let baseRadius = 0.3;
        base.traverse((child) => {
          if (child.isMesh && child.geometry.boundingSphere) {
            baseRadius = Math.max(baseRadius, child.geometry.boundingSphere.radius);
          }
        });

        const bounds = getViewBounds();
        const positions = [];
        const spacing = baseRadius * 1.5;
        const maxAttempts = 20000;
        let tries = 0;

        while (positions.length < STAR_COUNT && tries < maxAttempts) {
          tries++;
          const x = THREE.MathUtils.randFloat(bounds.minX, bounds.maxX);
          const y = THREE.MathUtils.randFloat(bounds.minY, bounds.maxY);
          const z = THREE.MathUtils.randFloat(-3, 3);
          const pos = new THREE.Vector3(x, y, z);

          const clear = positions.every((p) => p.distanceTo(pos) > spacing);
          if (clear) positions.push(pos);
        }

        // Spawn stars
        positions.forEach((pos) => {
          const star = base.clone(true);
          const scale = THREE.MathUtils.randFloat(0.12, 0.2);
          star.scale.setScalar(scale);
          star.position.copy(pos);
          starsRef.current.push(star);
          scene.add(star);
        });
      },
      undefined,
      (err) => console.error(err)
    );

    const mouse = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      starsRef.current.forEach((star) => {
        star.rotation.y = mouse.x * 0.5;
        star.rotation.x = Math.PI / 2 + mouse.y * 0.5;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="stars-section" />;
}
