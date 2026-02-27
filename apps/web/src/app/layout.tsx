import type { Metadata } from "next";
import { Azeret_Mono } from "next/font/google";
import { GlobalTopBar } from "@/components/strapps/global-top-bar";
import "./globals.css";

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "900"],
  variable: "--font-azeret-mono",
});

export const metadata: Metadata = {
  title: "STRAPPS | Home",
  description: "STRAPPS ecommerce landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${azeretMono.variable} antialiased`}>
        <GlobalTopBar />
        {children}
      </body>
    </html>
  );
}
