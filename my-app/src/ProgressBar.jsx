import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const progressBarStyle = {
    width: `${scrollProgress}%`,
    background: scrollProgress < 50 
      ? '#000000' 
      : 'linear-gradient(90deg, #000000, #ec4899, #8b5cf6, #3b82f6, #06b6d4, #10b981)'
  };

  return (
    <div className="progress-wrapper">
      <div className="progress-bar" style={progressBarStyle} />
    </div>
  );
}