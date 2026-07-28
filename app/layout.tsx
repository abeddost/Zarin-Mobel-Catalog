import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zarin Möbelhaus — Exklusive Sofakollektion",
  description:
    "Entdecken Sie die exklusive Sofa- und Sesselkollektion von Zarin Möbelhaus mit 24 ausgewählten Modellen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={cormorantGaramond.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
