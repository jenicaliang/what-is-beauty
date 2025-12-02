import { useEffect } from "react";

export default function ScrollBackground() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 500) {
        document.body.style.backgroundColor = "#ffffff"; // white
      } else if (scrollY >= 500 && scrollY < 9550) {
        document.body.style.backgroundColor = "#000000"; // black
      } else if (scrollY >= 14000) {
        document.body.style.backgroundColor = "#fff57e"; // black
      } else {
        document.body.style.backgroundColor = "#ffffff"; // back to white
      }
    };

    // initial set
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null; // no visible component needed
}
