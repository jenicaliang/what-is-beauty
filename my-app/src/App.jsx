import React, { useEffect } from "react";
import BackgroundAudio from "./BackgroundAudio.jsx";
import ScrollBackground from "./ScrollBackground.jsx"; //
import ProgressBar from "./ProgressBar.jsx";
import ParallaxSection from "./ParallaxSection.jsx"
import VideoScrollSection from "./VideoScrollSection";
import StarsContainer from "./StarsContainer";
import PhotoFrameSection from "./PhotoFrameSection";
import ScrollingWordSection from "./ScrollingWordSection";
import GradientSection from "./GradientSection";
import BeautyCarouselSection from "./BeautyCarouselSection";
import ScienceOfBeauty from "./ScienceOfBeauty";
import WhiteToColor from "./WhiteToColor";
import BeautyDefinition from "./BeautyDefinition";
import ThreeDSection from "./ThreeDSection.jsx";
import BeautyPhrase from "./BeautyPhrase.jsx";
import BeautyForm from "./BeautyForm.jsx";
import "./main.css";

const App = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = document.querySelectorAll("#app > *");
    children.forEach(child => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <BackgroundAudio />
    <div id="app">
      <ProgressBar />
      <ScrollBackground />
      <ParallaxSection />
      <VideoScrollSection />
      <StarsContainer />
      <PhotoFrameSection />
      <ScrollingWordSection />
      <GradientSection />
      <BeautyDefinition />
      <BeautyCarouselSection />
      <ScienceOfBeauty />
      <WhiteToColor />
      <ThreeDSection />
      <BeautyPhrase />
      <BeautyForm />
    </div>
    </>
  );
};

export default App;
