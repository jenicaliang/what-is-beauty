import React, { useRef, useEffect } from "react";

const VideoScrollSection = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const totalFrames = 600;
  const frames = [];

  // preload images
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    img.src = `assets/universally_beautiful/universally_beautiful_${String(i).padStart(5, "0")}.jpg`;
    frames.push(img);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const section = sectionRef.current;
    let rect = section.getBoundingClientRect();
    let active = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = (canvas.width * 1080) / 1920;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const updateRect = () => {
      rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      active = rect.top < vh && rect.bottom > 0;
    };
    window.addEventListener("scroll", updateRect, { passive: true });
    updateRect();

    const loop = () => {
      if (active) {
        const vh = window.innerHeight;
        const scrollPercent = Math.min(
          1,
          Math.max(0, (vh - rect.top) / (rect.height + vh))
        );

        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(scrollPercent * totalFrames)
        );

        const img = frames[frameIndex];
        if (img.complete) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // set scroll height
    const setHeight = section.querySelector("#set-height");
    if (setHeight) {
      setHeight.style.height = window.innerHeight * 8 + "px";
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateRect);
    };
  }, );

  return (
    <section id="video-scroll-section" ref={sectionRef} style={{ position: "relative", background: "black" }}>
      <canvas id="video-canvas" ref={canvasRef} style={{ position: "sticky", top: 0, width: "100%", height: "auto" }}></canvas>
      <div id="set-height" />
    </section>
  );
};

export default VideoScrollSection;
