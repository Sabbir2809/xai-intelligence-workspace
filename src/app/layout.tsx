import { SITE } from "@/data/site";
import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.fullName,
  description: SITE.description,
};

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${geist.variable} ${inter.variable}`}
      suppressHydrationWarning>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
