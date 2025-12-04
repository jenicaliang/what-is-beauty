import React, { useState, useRef, useEffect, useCallback } from "react";
import "./ScrollingWordSection.css";

const TRANSITION_TIME = 600; // ms

export default function ScrollingWordSection() {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const scrollTimeout = useRef(null);
  const wordContainerRef = useRef(null);

  const words = [
    {
      word: "Beach",
      textBoxes: [
        { text: "Just so beautiful.", top: "35%", left: "20%" },
        { text: "I love the sounds of the waves.", top: "25%", right: "12%" },
        { text: "I hate how sand gets everywhere.", bottom: "22%", left: "5%" },
        { text: "It's always so crowded.", bottom: "25%", right: "25%" },
      ],
    },
    {
      word: "Makeup",
      textBoxes: [
        { text: "I consider it a form of art!", top: "25%", left: "12%" },
        { text: "More societal pressure.", top: "30%", right: "15%" },
        { text: "Express yourself however you want.", bottom: "20%", left: "20%" },
        { text: "It's really an exploitative industry.", bottom: "35%", right: "8%" },
      ],
    },
    {
      word: "A.I.",
      textBoxes: [
        { text: "Shows how far humanity's come.", top: "15%", left: "8%" },
        { text: "I'll never use it.", top: "20%", right: "12%" },
        { text: "It's only going to get better.", bottom: "35%", left: "5%" },
        { text: "We're killing our planet, and for what?", bottom: "25%", right: "8%" },
      ],
    },
    {
      word: "Snow",
      textBoxes: [
        { text: "Maybe, but...too much shoveling.", top: "25%", left: "8%" },
        { text: "Impossible to drive anywhere.", top: "25%", right: "12%" },
        { text: "It's so peaceful, so serene.", bottom: "20%", left: "15%" },
        { text: "I love snow days!", bottom: "30%", right: "20%" },
      ],
    },
    {
      word: "Fashion",
      textBoxes: [
        { text: "Key to self-expression.", top: "12%", left: "12%" },
        { text: "Fast fashion produces so much waste.", top: "18%", right: "8%" },
        { text: "Some clothes are really pretty.", bottom: "28%", left: "15%" },
        { text: "Only enforces unrealistic standards.", bottom: "35%", right: "15%" },
      ],
    },
  ];

  /** ----------------------
   *  WORD SCROLL LOGIC
   ---------------------- */
  const handleWheel = useCallback(
    (e) => {
      if (!isHovering) return;

      const delta = e.deltaY;

      // Allow page scroll at first/last word
      if ((index === 0 && delta < 0) || (index === words.length - 1 && delta > 0)) return;

      // Prevent fast scroll from skipping words
      e.preventDefault();
      e.stopPropagation();

      if (scrollTimeout.current) return; // ignore until transition completes

      // Only move one word at a time
      if (delta > 0 && index < words.length - 1) setIndex(index + 1);
      else if (delta < 0 && index > 0) setIndex(index - 1);

      // Lock until transition finishes
      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, TRANSITION_TIME);
    },
    [index, isHovering, words.length]
  );


  /** ----------------------
   *  ATTACH WHEEL LISTENER TO INNER WORD CONTAINER
   ---------------------- */
  useEffect(() => {
    const container = wordContainerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Find section position
    const rect = section.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;

    // Center the section on the screen
    const centerPosition = scrollTop - (window.innerHeight / 2 - rect.height / 2);

    // Smooth scroll
    window.scrollTo({
      top: centerPosition,
      behavior: "smooth",
    });
  }, []);

  /** ----------------------
   *  RENDER
   ---------------------- */
  return (
    <section className="scroll-section">
      {/* Full page content */}
      <div className="intro-text">
        And still others are<br></br>
        a bit more complicated.
      </div>

      {/* Inner word scrolling container */}
      <div
        className="word-scroll-container"
        ref={wordContainerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Text boxes appear on hover */}
        <div className="text-boxes-container">
          {isHovering &&
            words[index].textBoxes.map((box, i) => (
              <div
                key={i}
                className="single-text-box"
                style={{
                  top: box.top,
                  left: box.left,
                  right: box.right,
                  bottom: box.bottom,
                }}
              >
                {box.text}
              </div>
            ))}
        </div>

        {/* Words */}
        <div className="words-wrapper">
          {words.map((item, i) => {
            const offset = (i - index) * 120; // px vertical shift
            const distance = Math.abs(i - index);
            const opacity = i === index ? 1 : distance === 1 ? 0.35 : 0;

            return (
              <div
                key={i}
                className="center-word"
                style={{
                  transform: `translateY(${offset}px)`,
                  opacity,
                }}
              >
                {i === index && isHovering && (
                  <>
                    <span className="bracket-left">[</span>
                    <span className="bracket-right">]</span>
                  </>
                )}
                {item.word}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
