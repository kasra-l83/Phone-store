import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "پلی مدا",
  description: "فروشگاه لوازم دیجیتال پلی مدا"
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased max-w-[1600px] mx-auto px-5">
        <Header/>
        {children}
      </body>
    </html>
  )
}