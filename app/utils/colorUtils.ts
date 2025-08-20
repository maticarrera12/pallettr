/**
 * Utility functions for color manipulation and CSS variable management
 */

// Color manipulation functions
export const darkenColor = (hex: string, amount: number = 0.2): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * amount * 100);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

export const lightenColor = (hex: string, amount: number = 0.2): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * amount * 100);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return (
    "#" +
    (
      0x1000000 +
      (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)
    )
      .toString(16)
      .slice(1)
  );
};

// Generate hover and active variations for a color
export const generateColorVariations = (baseColor: string) => {
  return {
    base: baseColor,
    hover: darkenColor(baseColor, 0.15),
    active: darkenColor(baseColor, 0.25),
  };
};

// Apply palette to CSS variables
export const applyPaletteToCSS = (palette: ColorPalette) => {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  // Apply primary colors
  root.style.setProperty("--color-primary", palette.primary.base);
  root.style.setProperty("--color-primary-hover", palette.primary.hover);
  root.style.setProperty("--color-primary-active", palette.primary.active);

  // Apply secondary colors
  root.style.setProperty("--color-secondary", palette.secondary.base);
  root.style.setProperty("--color-secondary-hover", palette.secondary.hover);
  root.style.setProperty("--color-secondary-active", palette.secondary.active);

  // Apply tertiary colors
  root.style.setProperty("--color-tertiary", palette.tertiary.base);
  root.style.setProperty("--color-tertiary-hover", palette.tertiary.hover);
  root.style.setProperty("--color-tertiary-active", palette.tertiary.active);

  // Apply background colors
  root.style.setProperty("--color-background-light", palette.background.light);
  root.style.setProperty("--color-background-dark", palette.background.dark);

  // Apply transparent background colors for navbar blur effect
  root.style.setProperty(
    "--color-background-light-transparent",
    `${palette.background.light}E6`
  ); // 90% opacity
  root.style.setProperty(
    "--color-background-dark-transparent",
    `${palette.background.dark}E6`
  ); // 90% opacity

  // Apply card colors
  root.style.setProperty("--color-card-light", palette.card.light);
  root.style.setProperty("--color-card-dark", palette.card.dark);

  // Apply text colors
  root.style.setProperty("--color-text-black", palette.text.black);
  root.style.setProperty("--color-text-white", palette.text.white);
};

// Reset to default colors if needed
export const resetToDefaultColors = () => {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  // Default color values (you can customize these)
  const defaultColors = {
    "--color-primary": "#3B82F6",
    "--color-primary-hover": "#2563EB",
    "--color-primary-active": "#1D4ED8",
    "--color-secondary": "#8B5CF6",
    "--color-secondary-hover": "#7C3AED",
    "--color-secondary-active": "#6D28D9",
    "--color-tertiary": "#10B981",
    "--color-tertiary-hover": "#059669",
    "--color-tertiary-active": "#047857",
    "--color-background-light": "#FFFFFF",
    "--color-background-dark": "#0F172A",
    "--color-background-light-transparent": "#FFFFFFE6",
    "--color-background-dark-transparent": "#0F172AE6",
    "--color-card-light": "#F8FAFC",
    "--color-card-dark": "#1E293B",
    "--color-text-black": "#000000",
    "--color-text-white": "#FFFFFF",
  };

  Object.entries(defaultColors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

// Types for the color palette
export interface ColorVariation {
  base: string;
  hover: string;
  active: string;
}

export interface ColorPalette {
  primary: ColorVariation;
  secondary: ColorVariation;
  tertiary: ColorVariation;
  background: {
    light: string;
    dark: string;
  };
  card: {
    light: string;
    dark: string;
  };
  text: {
    black: string;
    white: string;
  };
}
