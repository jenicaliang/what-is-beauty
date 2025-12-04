import React, { useEffect, useRef } from 'react';
import "./BeautyPhrase.css";

export default function BeautyPhrase() {
  const sectionRef = useRef(null);
  const fadeOutRef = useRef(null);
  const replacementWordsRef = useRef([]);

  const words = ['memory', 'feeling', 'living.'];

  useEffect(() => {
    const section = sectionRef.current;
    const fadeOut = fadeOutRef.current;
    const replacementWords = replacementWordsRef.current;
    const totalWords = words.length;

    function updateAnimation() {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - viewportHeight)));
      
      // Phase 1: Fade out original text (0% to 15%)
      if (scrollProgress < 0.15) {
        const fadeProgress = scrollProgress / 0.15;
        fadeOut.style.opacity = 1 - fadeProgress;
        fadeOut.style.transform = `translateY(${fadeProgress * -20}px)`;
      } else {
        fadeOut.style.opacity = 0;
        fadeOut.style.transform = 'translateY(-20px)';
      }
      
      // Phase 2: Cycle through replacement words (15% to 85%)
      const wordPhaseStart = 0.15;
      const wordPhaseEnd = 0.85;
      const wordPhaseDuration = wordPhaseEnd - wordPhaseStart;
      const wordInterval = wordPhaseDuration / totalWords;
      
      replacementWords.forEach((word, index) => {
        if (!word) return;
        
        const wordStart = wordPhaseStart + (wordInterval * index);
        const wordEnd = wordStart + wordInterval;
        
        if (scrollProgress < wordPhaseStart) {
          word.style.opacity = 0;
          word.style.transform = 'translateY(50px)';
        } else if (scrollProgress >= wordStart && scrollProgress < wordEnd) {
          word.style.opacity = 1;
          word.style.transform = 'translateY(0)';
        } else if (scrollProgress >= wordEnd && index < totalWords - 1) {
          word.style.opacity = 0;
          word.style.transform = 'translateY(-50px)';
        } else if (index === totalWords - 1 && scrollProgress >= wordEnd) {
          word.style.opacity = 1;
          word.style.transform = 'translateY(0)';
        } else {
          word.style.opacity = 0;
          word.style.transform = 'translateY(50px)';
        }
      });
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateAnimation();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    updateAnimation();

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className="scroll-container">
      <section className="text-sequence-section" ref={sectionRef}>
        <div className="sticky-container">
          <div className="text-wrapper">
            <span className="static-part">Beauty is</span>
            <span className="dynamic-part">
              <span className="fade-out" ref={fadeOutRef}>not just visual</span>
              {words.map((word, index) => (
                <span
                  key={index}
                  className="replacement-word"
                  ref={el => replacementWordsRef.current[index] = el}
                >
                  {word}
                </span>
              ))}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}