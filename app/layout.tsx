import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pallettr - Generador de Paletas de Colores",
  description: "Crea y explora hermosas paletas de colores para tus proyectos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${manrope.variable} antialiased text-theme transition-colors`}
        style={{ 
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)'
        }}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen mx-5">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
