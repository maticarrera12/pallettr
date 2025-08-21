import { useState, useCallback } from "react";
import { toast } from "sonner";
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
  currentPalette: ColorPalette | null;

  // Actions
  generatePalette: (prompt: string) => Promise<void>;
  resetPalette: () => void;
  applyPalette: (palette: ColorPalette) => void;
}

export const usePaletteGenerator = (): UsePaletteGeneratorReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(
    null
  );

  /**
   * Generate a new color palette based on user prompt
   * Calls the Gemini API and updates the page theme
   */
  const generatePalette = useCallback(async (prompt: string) => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);

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
        if (response.status === 429) {
          // Rate limit exceeded
          toast.error(data.message || "Rate limit exceeded", {
            description:
              "You've reached your free trial limit. Please join our waitlist for unlimited access.",
            action: {
              label: "Join Waitlist",
              onClick: () => {
                if (data.redirectTo) {
                  window.location.href = data.redirectTo;
                }
              },
            },
            duration: 10000,
          });

          // Redirección automática después de 5 segundos
          if (data.redirectTo) {
            setTimeout(() => {
              window.location.href = data.redirectTo;
            }, 5000);
          }
          return;
        }
        throw new Error(data.error || "Failed to generate palette");
      }

      const palette: ColorPalette = data.palette;

      // Apply the new palette to CSS variables
      applyPaletteToCSS(palette);

      // Update state
      setCurrentPalette(palette);

      // Show success toast
      toast.success("Palette generated successfully!", {
        description: `Created "${prompt}" palette`,
        duration: 3000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      toast.error("Failed to generate palette", {
        description: errorMessage,
        duration: 5000,
      });

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
    toast.success("Palette reset to default colors");
  }, []);

  /**
   * Apply a specific palette to the page
   */
  const applyPalette = useCallback((palette: ColorPalette) => {
    applyPaletteToCSS(palette);
    setCurrentPalette(palette);
    toast.success("Palette applied successfully");
  }, []);

  return {
    isLoading,
    currentPalette,
    generatePalette,
    resetPalette,
    applyPalette,
  };
};
