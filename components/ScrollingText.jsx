"use client";
import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";

const ScrollingText = ({ text = "Think. Build. Ship. Repeat." }) => {
  const containerRef = useRef(null);
  const xPercent = useMotionValue(0);
  const direction = useRef(-1);
  const baseSpeed = 0.04; // Speed as percentage

  // Optimized scroll direction detection
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      direction.current = currentScrollY > lastScrollY ? -1 : 1;
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // True infinite animation with proper reset logic
  useAnimationFrame(() => {
    const current = xPercent.get();
    let newValue = current + baseSpeed * direction.current;

    // Seamless infinite loop reset
    if (newValue < -100) {
      newValue = 0;
    } else if (newValue > 0) {
      newValue = -100;
    }

    xPercent.set(newValue);
  });

  // Create the text content
  const textContent = Array.from({ length: 10 }).map((_, i) => (
    <span key={i} className="font-head font-bold mx-4 md:mx-8 inline-block">
      {text}
    </span>
  ));

  return (
    <div className="py-12 overflow-hidden" ref={containerRef}>
      <div className="relative w-full bg-white py-2 rotate-[-3deg]">
        <div className="relative h-10 md:h-20">
          {/* Added height */}
          {/* First text instance */}
          <motion.div
            className="whitespace-nowrap font-bold text-4xl md:text-7xl text-black absolute top-0 left-0"
            style={{
              x: useTransform(xPercent, (value) => `${value}%`),
              willChange: "transform",
            }}
          >
            {textContent}
          </motion.div>
          {/* Second text instance for seamless loop */}
          <motion.div
            className="whitespace-nowrap font-bold text-4xl md:text-7xl text-black absolute top-0 left-0"
            style={{
              x: useTransform(xPercent, (value) => `${value + 100}%`),
              willChange: "transform",
            }}
          >
            {textContent}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;
