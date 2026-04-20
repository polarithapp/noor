"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring physics for the trailing golden crescent effect
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(0, springConfig);
  const cursorYSpring = useSpring(0, springConfig);

  useEffect(() => {
    // Only run on devices with a mouse (prevents issues on the mobile app)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
      // Center the 32px trailing ring (32/2 = 16)
      cursorXSpring.set(e.clientX - 16); 
      cursorYSpring.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Detect if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("magnetic-btn")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorXSpring, cursorYSpring, isVisible]);

  // Do not render anything on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* 1. The exact center dot (instant follow) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#C9A84C] rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1, // Shrink to 0 when hovering over buttons
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />

      {/* 2. The trailing glowing crescent ring (spring physics) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          // CSS trick to render a crescent moon shape
          borderTop: "2px solid #C9A84C",
          borderRight: "2px solid transparent",
          borderBottom: "2px solid transparent",
          borderLeft: "2px solid rgba(201, 168, 76, 0.4)",
          boxShadow: isHovering ? "0 0 30px rgba(201, 168, 76, 0.8)" : "0 0 15px rgba(201, 168, 76, 0.2)",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          rotate: isHovering ? 180 : 0, // Rotate crescent on hover
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
