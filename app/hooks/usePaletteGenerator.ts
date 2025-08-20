import { useState, useCallback } from "react";
import {
  ColorPalette,
  applyPaletteToCSS,
  resetToDefaultColors,
} from "../utils/colorUtils";

/**
 * Custom hook for managing color palette generation and application
 * Handles API calls, state management, and CSS variable updates
 */

interface UsePaletteGeneratorReturn {
  // State
  isLoading: boolean;
  error: string | null;
  currentPalette: ColorPalette | null;

  // Actions
  generatePalette: (prompt: string) => Promise<void>;
  resetPalette: () => void;
  applyPalette: (palette: ColorPalette) => void;
}

export const usePaletteGenerator = (): UsePaletteGeneratorReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(
    null
  );

  /**
   * Generate a new color palette based on user prompt
   * Calls the Gemini API and updates the page theme
   */
  const generatePalette = useCallback(async (prompt: string) => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-palette", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate palette");
      }

      const palette: ColorPalette = data.palette;

      // Apply the new palette to CSS variables
      applyPaletteToCSS(palette);

      // Update state
      setCurrentPalette(palette);

      // Clear any previous errors
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);

      // If there's a fallback palette in the error response, still apply it
      if (err instanceof Error && err.message.includes("fallback")) {
        try {
          const response = await fetch("/api/generate-palette", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "fallback" }),
          });
          const data = await response.json();
          if (data.palette) {
            applyPaletteToCSS(data.palette);
            setCurrentPalette(data.palette);
          }
        } catch (fallbackError) {
          console.error("Failed to apply fallback palette:", fallbackError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Reset the page to default colors
   */
  const resetPalette = useCallback(() => {
    resetToDefaultColors();
    setCurrentPalette(null);
    setError(null);
  }, []);

  /**
   * Apply a specific palette to the page
   */
  const applyPalette = useCallback((palette: ColorPalette) => {
    applyPaletteToCSS(palette);
    setCurrentPalette(palette);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    currentPalette,
    generatePalette,
    resetPalette,
    applyPalette,
  };
};
