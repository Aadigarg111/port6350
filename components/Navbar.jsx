"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RiMenu3Fill, RiCloseLargeFill } from "react-icons/ri";
import { HiMoon, HiSun } from "react-icons/hi2";
import { ImArrowUpRight2 } from "react-icons/im";
import { NAV_ITEMS } from "@/constants";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const menuRef = useRef(null);
  const firstMenuItem = useRef(null);
  const lastMenuItem = useRef(null);
  const menuButton = useRef(null);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    // Initialize dark mode from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialDarkMode = savedTheme ? savedTheme === "dark" : prefersDark;
    setDarkMode(initialDarkMode);
  }, []);

  // Handle dark mode toggle
  useEffect(() => {
    if (!isClient) return;

    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode, isClient]);

  // Handle scroll lock with layout shift prevention
  useEffect(() => {
    if (!isClient) return;

    // Always maintain scrollbar space to prevent layout shift
    document.documentElement.style.overflowY = "scroll";

    if (menuOpen) {
      // Get scrollbar width to prevent layout shift
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Apply scroll lock without affecting sticky positioning
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Focus management
      if (firstMenuItem.current) {
        firstMenuItem.current.focus();
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [menuOpen, isClient]);

  // Close menu with escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !menuButton.current?.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleMenuItemClick = useCallback((href) => {
    setMenuOpen(false);

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Return focus to menu button
    setTimeout(() => {
      menuButton.current?.focus();
    }, 100);
  }, []);

  const handleKeyDown = useCallback(
    (e, href, isFirst, isLast) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleMenuItemClick(href);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (isLast) {
          firstMenuItem.current?.focus();
        } else {
          e.target.nextElementSibling?.focus();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (isFirst) {
          lastMenuItem.current?.focus();
        } else {
          e.target.previousElementSibling?.focus();
        }
      }
    },
    [handleMenuItemClick]
  );

  // Prevent flash of unstyled content
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-b-gray-800">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-4">
          <h1 className="text-2xl font-extrabold font-head tracking-wide">
            Swayam
          </h1>
          <div className="flex items-center gap-4">
            <div className="p-1 w-7 h-7"></div>
            <div className="p-1 w-7 h-7"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-b-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-4">
        <h1 className="text-2xl font-extrabold font-head tracking-wide">
          Swayam
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>

          <button
            ref={menuButton}
            onClick={handleMenuToggle}
            className="focus:outline-none p-1 rounded-full hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <RiCloseLargeFill size={24} />
            ) : (
              <RiMenu3Fill size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Full-width Dropdown Menu */}
      <nav
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-x-0 top-16 bg-black z-40 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "h-[calc(100vh-4rem)] opacity-100 pointer-events-auto"
            : "h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="h-full max-w-7xl mx-auto flex flex-col justify-start px-4 md:px-8 lg:px-10">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={idx}
              ref={
                idx === 0
                  ? firstMenuItem
                  : idx === NAV_ITEMS.length - 1
                  ? lastMenuItem
                  : null
              }
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick(item.href);
              }}
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  item.href,
                  idx === 0,
                  idx === NAV_ITEMS.length - 1
                )
              }
              className="group flex items-center justify-between py-6 px-4 border-b first-of-type:border-t border-gray-800 hover:bg-gray-900/50 transition-all duration-200 focus:outline-none focus:bg-gray-900/50"
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="text-2xl md:text-4xl lg:text-6xl font-head font-bold text-gray-300 group-hover:text-white group-focus:text-white transition-colors">
                {item.label}
              </span>
              <ImArrowUpRight2 className="size-5 md:size-6 lg:size-7" />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
