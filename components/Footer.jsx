"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/constants/index";
import { FaChevronUp } from "react-icons/fa";

// Starfield Canvas Component (unchanged)
const StarfieldCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const stars = [];
    const numStars = 150;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const currentOpacity = star.opacity + twinkle * 0.1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, currentOpacity)})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    animate(0);

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      style={{ zIndex: 1 }}
    />
  );
};

// Shooting Star Component (unchanged)
const ShootingStar = ({ isVisible, onComplete }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="absolute top-1/2 -left-2 w-1 h-1 bg-white rounded-full"
      style={{ zIndex: 2 }}
      initial={{
        x: -20,
        y: Math.random() * 200 - 100,
        opacity: 0,
        scale: 0,
      }}
      animate={{
        x: window.innerWidth + 20,
        y: Math.random() * 200 - 100 + 50,
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2,
        ease: "easeOut",
      }}
      onAnimationComplete={onComplete}
    >
      <div className="absolute -left-8 top-0 w-8 h-0.5 bg-gradient-to-r from-transparent via-white to-white opacity-60 rounded-full" />
    </motion.div>
  );
};

// Back to Top Button (unchanged)
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 shadow-lg"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Back to top"
    >
      <FaChevronUp size={20} />
    </motion.button>
  );
};

const Footer = () => {
  const [showShootingStar, setShowShootingStar] = useState(false);

  // Shooting star trigger (unchanged logic)
  useEffect(() => {
    const triggerShootingStar = () => {
      setShowShootingStar(true);
    };

    const initialTimeout = setTimeout(triggerShootingStar, 2000);
    const interval = setInterval(() => {
      triggerShootingStar();
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleShootingStarComplete = () => {
    setShowShootingStar(false);
  };

  return (
    <>
      <div
        className="relative h-[500px] overflow-hidden"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 left-0 w-full h-[500px]">
          <footer className="bg-gray-950 text-white h-full w-full flex flex-col justify-between relative">
            {/* Starfield Background */}
            <StarfieldCanvas />

            {/* Shooting Star */}
            <ShootingStar
              isVisible={showShootingStar}
              onComplete={handleShootingStarComplete}
            />

            {/* Content without animations */}
            <div
              className="flex-grow flex items-center relative"
              style={{ zIndex: 3 }}
            >
              <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-10 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12">
                  {/* Navigation Links (static) */}
                  <div className="flex-1">
                    <ul className="space-y-4 text-white">
                      {NAV_ITEMS.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className="w-fit text-lg md:text-xl font-semibold hover:text-gray-300 transition-colors duration-200 block"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Social Links (static) */}
                  <div className="flex-1 md:text-right">
                    <h3 className="text-gray-400 text-lg font-semibold mb-6 tracking-wide">
                      Follow Me
                    </h3>
                    <div className="flex md:justify-end gap-4 mb-8">
                      {SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.id}
                          href={social.href}
                          target={
                            social.href.startsWith("mailto:")
                              ? undefined
                              : "_blank"
                          }
                          rel={
                            social.href.startsWith("mailto:")
                              ? undefined
                              : "noopener noreferrer"
                          }
                          className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 text-black rounded-full flex items-center justify-center hover:bg-gray-300 transition-all duration-200"
                          aria-label={social.label}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">
                      © {new Date().getFullYear()} Built with ❤️ and ✨ by
                      Swayam.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Name (static) */}
            <div
              className="text-center text-[14vw] font-head font-extrabold tracking-tight text-white leading-none relative opacity-20"
              style={{ zIndex: 3 }}
            >
              Swayam
            </div>
          </footer>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
};

export default Footer;
