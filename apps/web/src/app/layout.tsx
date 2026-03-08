import type { Metadata } from "next";
import { Azeret_Mono, Averia_Serif_Libre } from "next/font/google";
import { SiteFooter } from "@/components/strapps/site-footer";
import "./globals.css";

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "900"],
  variable: "--font-azeret-mono",
});

const averiaSerifLibre = Averia_Serif_Libre({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "700"],
  variable: "--font-averia",
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
    <html lang="it" className="scroll-smooth">
      <head>
        {/* eslint-disable-next-line @next/next/no-script-component-in-head */}
        <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1966122067585580');fbq('track','PageView');` }} />
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1966122067585580&ev=PageView&noscript=1" />` }} />
      </head>
      <body className={`${azeretMono.variable} ${averiaSerifLibre.variable} antialiased`}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
