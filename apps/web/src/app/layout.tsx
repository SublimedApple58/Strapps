import type { Metadata } from "next";
import { Azeret_Mono } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/strapps/site-footer";
import "./globals.css";

const META_PIXEL_ID = "1966122067585580";

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
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${META_PIXEL_ID}');fbq('track','PageView');
        `}</Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
