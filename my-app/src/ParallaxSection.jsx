import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./ParallaxSection.css";

const LAYERS = [
    "sky.png",
    "sun.png",
    "clouds_back.png",
    "clouds_front.png",
    "hills_back.png",
    "river.png",
    "tree_2.png",
    "hills_middle.png",
    "tree_1.png",
    "hills_front.png",
];

export default function ParallaxSection() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);


    useEffect(() => {
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 4.5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        // Texture loader
        const loader = new THREE.TextureLoader();
        const planes = [];

        LAYERS.forEach((src, i) => {
            const tex = loader.load(`assets/images/parallax/${src}`, () => {
                console.log(`Loaded: ${src} at z=${-2 + (i * 0.2)}, renderOrder=${i}`);
            });
            const mat = new THREE.MeshBasicMaterial({
                map: tex,
                transparent: true,
                side: THREE.DoubleSide,
                depthTest: false
            });
            const geo = new THREE.PlaneGeometry(16, 9);
            const plane = new THREE.Mesh(geo, mat);

            // Start at z=-2 (far) and move toward camera (z=0)
            plane.position.z = -2 + (i * 0.05);
            plane.renderOrder = i; // Force rendering order
            scene.add(plane);
            planes.push(plane);
        });

        // Mouse movement parallax
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener("mousemove", (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * -2;
        });

        function animate() {
            requestAnimationFrame(animate);

            planes.forEach((plane, i) => {
                plane.position.x = mouseX * 0.1 * (i + 1) * 0.1;
                plane.position.y = mouseY * 0.1 * (i + 1) * 0.1;
            });

            if (titleRef.current) {
                titleRef.current.style.transform = `translate3d(${mouseX * 20}px, ${mouseY * 20}px, 0)`;
            }
            if (descriptionRef.current) {
                descriptionRef.current.style.transform = `translate3d(${mouseX * 15}px, ${mouseY * 15}px, 0)`;
            }


            renderer.render(scene, camera);
        }

        animate();

        // Resize handler
        function handleResize() {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <section className="parallax-section">
            <div ref={containerRef} className="parallax-container" />
            <div ref={titleRef} className="parallax-text">
                What is Beauty?
            </div>
            <div ref={descriptionRef} className="parallax-description">
                An interactive guide to a fundamental concept of human understanding.
            </div>
        </section>
    );
}