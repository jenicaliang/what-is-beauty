import React, { useEffect, useRef } from "react";
import "./ThreeDSection.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL_URLS = [
    "/assets/models/couch.glb",
    "/assets/models/mug.glb",
];

/**
 * -------------------------------------------------------------
 * makeScene(canvas, shapeIndex)
 * -------------------------------------------------------------
 * Creates a Three.js scene inside a given <canvas>.
 * Loads GLTF model based on shapeIndex.
 * Includes:
 * - renderer, camera, lights
 * - GLTFLoader
 * - drag rotate + wheel zoom
 * - auto-floating animation
 * Returns: { cleanup() }
 * -------------------------------------------------------------
 */
function makeScene(canvas, shapeIndex) {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 1.5);

    // LIGHTS
    const directional = new THREE.DirectionalLight(0xfff4e5, 2.5);
    directional.position.set(5, 5, 5); // x=0, y=5 (above), z=5 (front)
    scene.add(directional);

    // Optional: enable shadows
    directional.castShadow = true;

    const warmAmbient = new THREE.AmbientLight(0xfff4e5, 1.5); // soft warm white
    scene.add(warmAmbient);


    // -------------------------------------------------------------
    // LOAD GLTF MODEL
    // -------------------------------------------------------------
    let mesh = null;
    const loader = new GLTFLoader();
    const modelUrl = MODEL_URLS[shapeIndex];

    loader.load(
        modelUrl,
        (gltf) => {
            mesh = gltf.scene;

            // -------------------------------------------------------------
            // Center the model
            // -------------------------------------------------------------
            const box = new THREE.Box3().setFromObject(mesh);
            const center = box.getCenter(new THREE.Vector3());
            mesh.position.sub(center); // move center to (0,0,0)

            // after centering the mesh
            const horizontalOffset = shapeIndex === 0 ? 0 : 0.3; // tweak
            mesh.position.x += horizontalOffset;


            // Optional: scale to fit roughly in view
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
                let scale = 1 / maxDim; // fit in ~1.5 unit cube
                if (shapeIndex === 1) {
                    // Shape index 1 is the mug, make it smaller
                    scale = 0.7 / maxDim;
                }
                mesh.scale.set(scale, scale, scale);
            }

            scene.add(mesh);
        },
        undefined,
        (err) => {
            console.error("GLTF load error:", err);
            // fallback geometric object if error
            const fallbackGeo = new THREE.BoxGeometry(1, 1, 1);
            const fallbackMat = new THREE.MeshStandardMaterial({ color: 0xffccaa });
            mesh = new THREE.Mesh(fallbackGeo, fallbackMat);
            scene.add(mesh);
        }
    );

    // -------------------------------------------------------------
    // RESIZE HANDLER
    // -------------------------------------------------------------
    function handleResize() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        renderer.setSize(w, h, false);

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }

    // Initial size
    handleResize();

    // -------------------------------------------------------------
    // DRAG ROTATION
    // -------------------------------------------------------------
    let isDown = false;
    let lastX = 0;
    let lastY = 0;
    let rotY = 0;
    let rotX = 0;

    function pos(e) {
        if (e.touches?.[0])
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        return { x: e.clientX, y: e.clientY };
    }

    function pointerDown(e) {
        isDown = true;
        const p = pos(e);
        lastX = p.x;
        lastY = p.y;
    }

    function pointerMove(e) {
        if (!isDown) return;
        const p = pos(e);
        rotY += (p.x - lastX) * 0.01;
        rotX += (p.y - lastY) * 0.01;
        lastX = p.x;
        lastY = p.y;
    }

    function pointerUp() {
        isDown = false;
    }

    canvas.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);

    canvas.addEventListener("touchstart", pointerDown, { passive: true });
    canvas.addEventListener("touchmove", pointerMove, { passive: true });
    canvas.addEventListener("touchend", pointerUp, { passive: true });

    // -------------------------------------------------------------
    // WHEEL ZOOM
    // -------------------------------------------------------------
    function onWheel(e) {
        camera.position.z += e.deltaY * 0.0015;
        camera.position.z = Math.min(Math.max(camera.position.z, 0.8), 4.0);
    }

    canvas.addEventListener("wheel", onWheel, { passive: true });

    // -------------------------------------------------------------
    // ANIMATION LOOP
    // -------------------------------------------------------------
    const clock = new THREE.Clock();
    let rafId;

    function animate() {
        handleResize();

        if (mesh) {
            const t = clock.getElapsedTime();
            mesh.rotation.y = rotY + Math.sin(t * 0.35) * 0.12;
            mesh.rotation.x = rotX + Math.cos(t * 0.25) * 0.08;
            mesh.position.y = Math.sin(t * 0.6) * 0.06;
        }

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
    }

    animate();

    // -------------------------------------------------------------
    // CLEANUP
    // -------------------------------------------------------------
    function cleanup() {
        cancelAnimationFrame(rafId);

        canvas.removeEventListener("pointerdown", pointerDown);
        window.removeEventListener("pointermove", pointerMove);
        window.removeEventListener("pointerup", pointerUp);

        canvas.removeEventListener("touchstart", pointerDown);
        canvas.removeEventListener("touchmove", pointerMove);
        canvas.removeEventListener("touchend", pointerUp);

        canvas.removeEventListener("wheel", onWheel);

        // Dispose GLTF meshes deeply
        if (mesh) {
            mesh.traverse((node) => {
                if (node.isMesh) {
                    node.geometry?.dispose?.();
                    if (node.material?.dispose) node.material.dispose();
                }
            });
        }

        renderer.dispose();
    }

    return { cleanup };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ThreeDSection() {
    const canvasRef0 = useRef(null);
    const canvasRef1 = useRef(null);

    useEffect(() => {
        const refs = [canvasRef0, canvasRef1];
        const cleanups = [];

        refs.forEach((ref, i) => {
            const canvas = ref.current;
            if (!canvas) return;

            const scene = makeScene(canvas, i);
            cleanups.push(scene.cleanup);
        });

        // stable cleanup snapshot
        const cleanupSnapshot = [...cleanups];

        return () => {
            cleanupSnapshot.forEach((fn) => fn());
        };
    }, []);

    return (
        <section className="three-section">
            <div className="three-inner">
                {/* Subsection 1 */}
                <div className="subsection">
                    <div className="canvas-wrap">
                        <canvas ref={canvasRef0} className="three-canvas" />
                    </div>
                    <div className="caption">Someone might find beauty in an old couch’s worn fabric, each mark a memory left behind by a beloved dog’s restless paws.</div>
                </div>

                {/* Subsection 2 */}
                <div className="subsection">
                    <div className="caption">A plain mug might become beautiful because it holds a message from someone precious.</div>
                    <div className="canvas-wrap">
                        <canvas ref={canvasRef1} className="three-canvas" />
                    </div>
                </div>

            </div>
        </section>
    );
}
