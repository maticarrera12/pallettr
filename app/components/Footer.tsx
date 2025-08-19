"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full max-w-full overflow-hidden border-t border-card-dark dark:border-card-light bg-card-light dark:bg-card-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-10 lg:space-y-0">
          {/* Brand Section */}
          <div className="flex flex-col space-y-6">
            {/* Brand Name - Elegant Script Style */}
            <h1 className="text-4xl sm:text-5xl font-playfair text-primary font-bold tracking-wide leading-tight">
              Pallettr
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-theme opacity-80 max-w-lg leading-relaxed font-medium">
              We turn your ideas into beautiful color combinations effortlessly.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-row space-x-10 lg:space-x-16">
            <Link
              href="/"
              className="text-lg sm:text-xl text-theme hover:text-primary transition-colors font-semibold"
            >
              Home
            </Link>
            <Link
              href="/why-us"
              className="text-lg sm:text-xl text-theme hover:text-primary transition-colors font-semibold"
            >
              Why Us?
            </Link>
            <Link
              href="/services"
              className="text-lg sm:text-xl text-theme hover:text-primary transition-colors font-semibold"
            >
              Services
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-card-dark dark:bg-card-light my-12"></div>

        {/* Copyright */}
        <div className="text-center lg:text-left">
          <p className="text-base sm:text-lg text-theme opacity-70 font-normal">
            Copyright 2025 © Pallettr.AI - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
