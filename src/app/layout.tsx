import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "PharmaXLedger | Secure Pharmaceutical Supply Chain",
  description: "Ensuring the integrity and transparency of life-saving medications via Artificial Ledger Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#020617] selection:bg-blue-500/30`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
