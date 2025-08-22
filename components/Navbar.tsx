"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../app/contexts/ThemeContext";
import WishlistButton from "./ui/WishlistButton";
import ThemeToggle from "./ui/ThemeToggle";
import Logo from "./ui/Logo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SCROLL_THRESHOLD = 50;
const ANIMATION_DURATION = 0.3;
const NAVBAR_HEIGHT = 64;

const Navbar = memo(() => {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  const navbarRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const backgroundStyle = useMemo(
    () => ({
      backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
      WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
      backgroundColor: isScrolled
        ? resolvedTheme === "dark"
          ? "var(--color-background-dark-transparent)"
          : "var(--color-background-light-transparent)"
        : resolvedTheme === "dark"
        ? "var(--color-background-dark)"
        : "var(--color-background-light)",
      boxShadow: isScrolled
        ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
        : "none",
    }),
    [isScrolled, resolvedTheme]
  );

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out py-4"
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
            <Logo size="md" />
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Wishlist Button */}
            <WishlistButton size="md" />
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
