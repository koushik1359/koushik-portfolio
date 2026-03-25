"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for a "fluid" organic follow effect
  const springConfig = { damping: 30, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Attach to all interactive elements to trigger the morphing effect
    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener("mousemove", moveMouse);

    // Watch for new interactive elements (like modals opening)
    const observer = new MutationObserver(() => {
        const interactiveElements = document.querySelectorAll(
          'button, a, input, [role="button"], .interactive-target'
        );
        interactiveElements.forEach((el) => {
          el.addEventListener("mouseenter", handleHoverStart);
          el.addEventListener("mouseleave", handleHoverEnd);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main spring-fluid ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
          borderWidth: isHovered ? "1px" : "1.5px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Precision center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
        }}
      />
    </>
  );
}
