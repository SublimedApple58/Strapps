import type { Metadata } from "next";
import { Azeret_Mono } from "next/font/google";
import { SiteFooter } from "@/components/strapps/site-footer";
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
  icons: {
    icon: "/strapps.png",
    shortcut: "/strapps.png",
    apple: "/strapps.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${azeretMono.variable} antialiased`}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
