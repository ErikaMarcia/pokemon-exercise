import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pokédex — Primeira Geração",
  description: "Pokédex completa com Next.js e TypeScript",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <main className="container" style={{ minHeight: "70vh" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
