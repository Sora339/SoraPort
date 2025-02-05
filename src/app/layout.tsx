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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${Poppins_style.variable} ${Noto_style.variable} text-white font-Poppin bg-[url('/img/layered-peaks-haikei.svg')] bg-cover bg-fixed`}
      >
        <div>
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
