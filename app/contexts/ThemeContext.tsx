"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook personalizado para manejar el tema
function useThemeState() {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Función para determinar el tema resuelto
  const getResolvedTheme = (currentTheme: Theme): "light" | "dark" => {
    if (currentTheme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return currentTheme;
  };

  // Aplicar tema al DOM
  const applyTheme = (newTheme: Theme) => {
    const resolved = getResolvedTheme(newTheme);
    setResolvedTheme(resolved);

    // Aplicar al HTML
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);

    // Forzar re-evaluación del CSS
    if (resolved === "dark") {
      root.style.setProperty("--background", "var(--color-background-dark)");
      root.style.setProperty("--foreground", "var(--color-text-white)");
      root.style.setProperty("--card-bg", "var(--color-card-dark)");
    } else {
      root.style.setProperty("--background", "var(--color-background-light)");
      root.style.setProperty("--foreground", "var(--color-text-black)");
      root.style.setProperty("--card-bg", "var(--color-card-light)");
    }

    // Guardar en localStorage
    localStorage.setItem("theme", newTheme);
  };

  // Inicialización y sincronización
  useEffect(() => {
    setMounted(true);

    // Cargar tema guardado del localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Aplicar tema cuando cambie
  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  // Sincronizar con localStorage en cada cambio
  useEffect(() => {
    if (mounted && theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  // Listener para cambios en las preferencias del sistema
  useEffect(() => {
    if (mounted && theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        const newResolved = getResolvedTheme("system");
        setResolvedTheme(newResolved);

        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newResolved);

        // Forzar re-evaluación del CSS
        if (newResolved === "dark") {
          root.style.setProperty(
            "--background",
            "var(--color-background-dark)"
          );
          root.style.setProperty("--foreground", "var(--color-text-white)");
          root.style.setProperty("--card-bg", "var(--color-card-dark)");
        } else {
          root.style.setProperty(
            "--background",
            "var(--color-background-light)"
          );
          root.style.setProperty("--foreground", "var(--color-text-black)");
          root.style.setProperty("--card-bg", "var(--color-card-light)");
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, mounted]);

  // Verificar y corregir tema al montar
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      const currentTheme = root.classList.contains("dark") ? "dark" : "light";

      if (currentTheme !== resolvedTheme) {
        root.classList.remove("light", "dark");
        root.classList.add(resolvedTheme);

        // Forzar re-evaluación del CSS
        if (resolvedTheme === "dark") {
          root.style.setProperty(
            "--background",
            "var(--color-background-dark)"
          );
          root.style.setProperty("--foreground", "var(--color-text-white)");
          root.style.setProperty("--card-bg", "var(--color-card-dark)");
        } else {
          root.style.setProperty(
            "--background",
            "var(--color-background-light)"
          );
          root.style.setProperty("--foreground", "var(--color-text-black)");
          root.style.setProperty("--card-bg", "var(--color-card-light)");
        }
      }
    }
  }, [mounted, resolvedTheme]);

  return {
    theme,
    setTheme,
    resolvedTheme,
    mounted,
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeState = useThemeState();

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
