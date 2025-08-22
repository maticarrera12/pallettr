import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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
              // Limpiar localStorage del tema para forzar detección del sistema
              if (typeof window !== 'undefined') {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme && savedTheme !== 'system') {
                  localStorage.removeItem('theme');
                }
              }
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
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
          themes={["light", "dark", "system"]}
        >
          <ThemeWrapper>
            <Navbar />
            <main className="min-h-screen max-w-full overflow-x-hidden pt-16 container-main">
              {children}
            </main>
            <Footer />
          </ThemeWrapper>
        </NextThemesProvider>
        <Toaster />
      </body>
    </html>
  );
}
