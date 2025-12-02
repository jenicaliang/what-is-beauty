import React, { useState } from "react";
import "./ScienceOfBeauty.css";

export default function WiringBeautySection() {
  const principles = [
    {
      title: "Symmetry",
      text:
        "Humans are naturally drawn to symmetrical faces and shapes, which were historically signals of health and genetic stability.",
      img: "/assets/images/symmetry.jpg"
    },
    {
      title: "Golden Ratio",
      text:
        "A mathematical ratio (1:1.618…) found in nature, art, and architecture that evokes visual harmony.",
      img: "/images/goldenratio.jpg"
    },
    {
      title: "Spiral Forms",
      text:
        "Patterns like the Fibonacci spiral appear in galaxies, flowers, and shells—shapes our brains recognize as both natural and pleasing.",
      img: "/images/spiral.jpg"
    },
    {
      title: "Color & Contrast",
      text:
        "High contrast and certain color combinations stimulate attention and emotion, rooted in evolutionary needs for survival cues.",
      img: "/images/colorcontrast.jpg"
    }
  ];

  return (
    <section className="wiring-section">
      <p className="wiring-title">
        Some ideas of beauty are inherent.<br />
        We react to certain colors & patterns<br />
        that were once tied to survival.
      </p>

      <div className="principles-list">
        {principles.map((p, i) => (
          <CollapsiblePrinciple
            key={i}
            title={p.title}
            text={p.text}
            img={p.img}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------- */
/*           COLLAPSIBLE COMPONENT          */
/* ---------------------------------------- */

function CollapsiblePrinciple({ title, text, img }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`collapsible ${open ? "open" : ""}`}>
      {/* Toggle Button */}
      <button className="collapsible-toggle" onClick={() => setOpen(!open)}>
        {title}
        <span className="arrow">{open ? "–" : "+"}</span>
      </button>

      {/* Expandable Content */}
      {open && (
        <div className="collapsible-content">
          <p>{text}</p>
        </div>
      )}

      {/* Hover Image */}
      <img src={img} alt={title} className="hover-image" />
    </div>
  );
}
