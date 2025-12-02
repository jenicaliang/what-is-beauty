import React, { useState } from "react";
import "./ScienceOfBeauty.css";

export default function WiringBeautySection() {
  const principles = [
    {
      title: "Symmetry",
      text:
        "Humans are naturally drawn to symmetrical faces and shapes because symmetry historically signaled good health. Studies show that symmetrical features are subconsciously associated with reproductive fitness, immune strength, and overall vitality, making them universally appealing across cultures and contexts.",
      img: "assets/images/symmetry.jpg"
    },
    {
      title: "Golden Ratio",
      text:
        "The golden ratio (approximately 1:1.618) appears in nature, art, and architecture, creating a sense of visual balance and harmony. Our brains are attuned to these proportions because they often indicated efficient growth patterns and natural order, which historically helped humans quickly identify safe, stable, or resource-rich environments.",
      img: "assets/images/golden_ratio.jpg"
    },
    {
  title: "Fractals",
  text:
    "Fractals are self-repeating, infinitely complex patterns found in nature, from tree branches and river networks to coastlines and clouds. Humans are drawn to them because our visual system efficiently recognizes these recursive structures, which are mathematically described by fractal geometry and linked to both aesthetic preference and stress reduction.",
  img: "assets/images/fractals.jpg"
},
    {
      title: "Color & Contrast",
      text:
        "High contrast and certain color combinations capture attention and elicit emotional responses because they were important for survival. Bright or contrasting colors could signal ripe fruit, danger, or environmental cues. Evolutionarily, our visual system prioritizes these patterns, making color and contrast fundamental tools in guiding perception, decision-making, and instinctive reactions.",
      img: "assets/images/color_contrast.jpg"
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
