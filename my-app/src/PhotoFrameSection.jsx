import React, { useState } from "react";
import "./PhotoFrameSection.css";

const photos = [
  {
    label: "An office cubicle.",
    src: "assets/images/office_cubicle.jpg"
  },
  {
    label: "Last night’s dinner.",
    src: "assets/images/dinner.jpg"
  },
  {
    label: "Roadside trash.",
    src: "assets/images/trash.jpg"
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
        Other things feel...well,<br />not so beautiful.
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
