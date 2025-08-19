"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import WishlistButton from "./ui/WishlistButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Constants
const SCROLL_THRESHOLD = 50;
const ANIMATION_DURATION = 0.3;
const NAVBAR_HEIGHT = 64;

// Theme icons mapping
const THEME_ICONS = {
  light: "☀️",
  dark: "🌙",
  system: "🖥️",
} as const;

// Theme cycle order
const THEME_CYCLE = ["light", "dark", "system"] as const;

/**
 * Professional Navbar Component
 * Features:
 * - Responsive design with mobile-first approach
 * - Smooth scroll-based animations
 * - Theme switching with visual feedback
 * - Optimized performance with memoization
 * - Accessibility compliant
 * - Professional styling with glassmorphism effect
 */
const Navbar = memo(() => {
  // Hooks
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for GSAP animations
  const navbarRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Memoized values
  const backgroundStyle = useMemo(
    () => ({
      backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
      WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
      backgroundColor: isScrolled
        ? resolvedTheme === "dark"
          ? "rgba(15, 23, 42, 0.85)"
          : "rgba(255, 255, 255, 0.85)"
        : resolvedTheme === "dark"
        ? "var(--color-background-dark)"
        : "var(--color-background-light)",
      boxShadow: isScrolled
        ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
        : "none",
    }),
    [isScrolled, resolvedTheme]
  );

  const currentThemeIcon = useMemo(
    () => THEME_ICONS[theme === "system" ? "system" : resolvedTheme || "light"],
    [theme, resolvedTheme]
  );

  // Event handlers
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  const toggleTheme = useCallback(() => {
    const currentIndex = THEME_CYCLE.indexOf(
      theme as (typeof THEME_CYCLE)[number]
    );
    const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
    setTheme(THEME_CYCLE[nextIndex]);
  }, [theme, setTheme]);

  const handleLogoHover = useCallback(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: ANIMATION_DURATION,
        ease: "power2.out",
      });
    }
  }, []);

  const handleLogoLeave = useCallback(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1,
        duration: ANIMATION_DURATION,
        ease: "power2.out",
      });
    }
  }, []);

  // Effects
  useEffect(() => {
    // Scroll listener with throttling
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [handleScroll]);

  useEffect(() => {
    // Initial entrance animation
    if (navbarRef.current) {
      animationRef.current = gsap.timeline();
      animationRef.current.fromTo(
        navbarRef.current,
        { y: -NAVBAR_HEIGHT, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    // Animated border on scroll
    if (borderRef.current) {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: `${SCROLL_THRESHOLD}px top`,
        scrub: true,
        onUpdate: (self) => {
          if (borderRef.current) {
            gsap.set(borderRef.current, { opacity: self.progress });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
      style={backgroundStyle}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Animated border */}
      <div
        ref={borderRef}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              ref={logoRef}
              className="text-xl sm:text-2xl font-playfair font-bold text-primary leading-tight tracking-tight cursor-pointer select-none"
              onMouseEnter={handleLogoHover}
              onMouseLeave={handleLogoLeave}
              tabIndex={0}
              role="button"
              aria-label="Pallettr home"
            >
              Pallettr
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-transparent hover:bg-primary hover:border-primary transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label={`Switch to ${
                THEME_CYCLE[
                  (THEME_CYCLE.indexOf(theme as (typeof THEME_CYCLE)[number]) +
                    1) %
                    THEME_CYCLE.length
                ]
              } theme`}
              title={`Current theme: ${theme}. Click to cycle themes.`}
            >
              <span
                className="text-lg group-hover:text-white transition-colors duration-200"
                aria-hidden="true"
              >
                {currentThemeIcon}
              </span>
            </button>

            {/* Wishlist Button */}
            <WishlistButton size="sm" />
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
