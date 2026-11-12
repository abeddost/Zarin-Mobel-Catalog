import type { Metadata } from "next";
import { Cormorant_Garamond, Vazirmatn } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zarin Möbelhaus — کاتالوگ مبلمان لوکس",
  description:
    "مجموعه مبل، میز ناهارخوری و اتاق خواب زرین — Zarin Möbelhaus, exklusive Möbelkollektion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Persian is the default; the language switch updates lang/dir on the client.
    <html
      lang="fa"
      dir="rtl"
      className={`${cormorantGaramond.variable} ${vazirmatn.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
