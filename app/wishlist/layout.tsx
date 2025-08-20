import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";

import { Toaster } from "sonner";
import ThemeWrapper from "@/components/ThemeWrapper";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Join Waitlist - Pallettr",
  description:
    "Join our waitlist to be notified when we launch our AI-powered color palette generator.",
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <ThemeWrapper>{children}</ThemeWrapper>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
