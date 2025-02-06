import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import Footer from "./components/footer";

const Poppins_style = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-Poppins",
});

const Noto_style = Noto_Sans_JP({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-NotoSansJP",
});

export const metadata: Metadata = {
  title: "SoraPort",
  description: "Sora_339のポートフォリオサイトです。",
  openGraph: {
    type: "website",
    title: "SoraPort",
    description:
      "Sora_339のポートフォリオサイトです。",
    siteName: "SoraPort",
    url: "https://nextsorablog.com/",
    images: {
      url: "/img/ogp.png",
      type: "image/png",
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    title: "SoraPort",
    description:
      "Sora_339のポートフォリオサイトです。",
    site: "SoraPort",
    images: {
      url: "/img/ogp.png",
      type: "image/png",
      width: 1200,
      height: 630,
    },
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${Poppins_style.variable} ${Noto_style.variable} text-white bg-[url('/img/layered-peaks-haikei.svg')] bg-cover bg-fixed`}
      >
        <div>
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
