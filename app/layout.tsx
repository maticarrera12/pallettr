import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeWrapper from "./components/ThemeWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
            <main className="min-h-screen  max-w-full overflow-x-hidden pt-16">
              {children}
            </main>
            <Footer />
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
