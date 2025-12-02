import React, { useState } from "react";
import "./PhotoFrameSection.css";

const photos = [
  {
    label: "An office cubicle.",
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=60"
  },
  {
    label: "Last night’s dinner.",
    src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1000&q=60"
  },
  {
    label: "Roadside trash.",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=60"
  }
];

export default function PhotoFrameSection() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10; 
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    setOffset({ x, y });
  };

  return (
    <section className="photo-section" onMouseMove={handleMouseMove}>
      <p className="corner-text">
        Others feel ... well,<br />not so beautiful.
      </p>

      <div className="frames-container">
        {photos.map((p, i) => (
          <div className="frame" key={i}>
            <div
              className="frame-image"
              style={{
                backgroundImage: `url(${p.src})`,
                transform: `translate(${offset.x}px, ${offset.y}px)`
              }}
            ></div>
            <div className="frame-label">{p.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
