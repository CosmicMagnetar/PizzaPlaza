import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import SessionWrapper from "./Component/SessionWrapper"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
