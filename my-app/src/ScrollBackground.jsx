import { useEffect } from "react";

export default function ScrollBackground() {
  useEffect(() => {
    // Add transition style to html element
    document.documentElement.style.transition = "background-color 0.5s ease";
    
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 1200) {
        document.documentElement.style.backgroundColor = "#ffffff"; // white
      } else if (scrollY >= 1200 && scrollY < 10300) {
        document.documentElement.style.backgroundColor = "#000000"; // black
      } else if (scrollY >= 10300 && scrollY < 15000) {
        document.documentElement.style.backgroundColor = "#ffffff"; // white
      } else if (scrollY >= 15000) {
        document.documentElement.style.backgroundColor = "#fff57e"; // yellow
      }
    };

    // initial set
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Clean up transition style
      document.documentElement.style.transition = "";
    };
  }, []);

  return null; // no visible component needed
}