"use client";

import { useTheme } from "@/app/contexts/ThemeContext";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // El ThemeContext ahora maneja toda la lógica del tema
  // Este wrapper solo asegura que el contexto esté disponible
  return <>{children}</>;
}
