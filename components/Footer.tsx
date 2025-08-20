"use client";

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

const Footer = () => {
  return (
    <footer className="w-full max-w-full overflow-hidden border-t border-card-dark dark:border-card-light bg-card-light dark:bg-card-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-10 lg:space-y-0">
          {/* Brand Section */}
          <div className="flex flex-col space-y-6">
            {/* Brand Name - Elegant Script Style */}
            <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-wide leading-tight">
              Pallettr
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-theme opacity-80 max-w-lg leading-relaxed font-medium">
              We turn your ideas into beautiful color combinations effortlessly.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-row space-x-10 lg:space-x-16">
            <button
              onClick={() => smoothScrollTo('home')}
              className="text-lg sm:text-xl font-semibold cursor-pointer bg-transparent border-none p-0 underline-offset-4 hover:underline transition-colors duration-300"
              style={{
                color: 'var(--color-text-theme)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-theme)';
              }}
            >
              Home
            </button>
            <button
              onClick={() => smoothScrollTo('why-us')}
              className="text-lg sm:text-xl font-semibold cursor-pointer bg-transparent border-none p-0 underline-offset-4 hover:underline transition-colors duration-300"
              style={{
                color: 'var(--color-text-theme)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-theme)';
              }}
            >
              Why Us?
            </button>
            <button
              onClick={() => smoothScrollTo('features')}
              className="text-lg sm:text-xl font-semibold cursor-pointer bg-transparent border-none p-0 underline-offset-4 hover:underline transition-colors duration-300"
              style={{
                color: 'var(--color-text-theme)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-theme)';
              }}
            >
              Features
            </button>
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
