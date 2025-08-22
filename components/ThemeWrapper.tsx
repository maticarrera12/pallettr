"use client";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // next-themes maneja todo automáticamente
  return <>{children}</>;
}
