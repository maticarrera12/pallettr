import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Pallettr - AI Color Palette Generator",
  description:
    "Turn your ideas into beautiful color combinations with AI-powered palette generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Solo establecer tema inicial básico para evitar parpadeo
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (savedTheme === 'light') {
                    document.documentElement.classList.add('light');
                  }
                  // Si es 'system' o no hay tema, no hacer nada - el contexto lo manejará
                } catch (e) {
                  console.warn('Error applying initial theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${manrope.variable} antialiased text-theme transition-colors`}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <ThemeProvider>
          <ThemeWrapper>
            <Navbar />
            <main className="min-h-screen max-w-full overflow-x-hidden pt-16 container-main">
              {children}
            </main>
            <Footer />
          </ThemeWrapper>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
