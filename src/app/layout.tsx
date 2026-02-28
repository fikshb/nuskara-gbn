import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PT Garuda Bakti Nusantara - Integrated Mining Logistics",
  description:
    "PT Garuda Bakti Nusantara. Penyedia jasa logistik pertambangan terintegrasi, freight forwarding, dan transportasi bahan peledak komersial berskala nasional.",
  keywords: [
    "GBN",
    "Garuda Bakti Nusantara",
    "logistik",
    "pertambangan",
    "freight forwarding",
    "bahan peledak",
    "transportasi",
    "Nuskara",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased bg-neutral-950 text-neutral-300">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
