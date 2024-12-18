import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ToastifyProvider } from "@/providers/toastify.provider";
import { TanstackProvider } from "@/providers/tanstak.provider";
import { QueryClintProvider } from "@/providers/queryclient.provider";
import Footer from "@/components/Footer";
import ReduxProvider from "@/providers/redux.provider";

export const metadata: Metadata = {
  title: "پلی مدا",
  description: "فروشگاه لوازم دیجیتال پلی مدا"
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">
        <ToastifyProvider>
          <TanstackProvider>
            <QueryClintProvider>
              <ReduxProvider>
                <Header/>
                  <div className="max-w-[1440px] mx-auto px-5">
                    {children}
                  </div>
                <Footer/>
              </ReduxProvider>
            </QueryClintProvider>
          </TanstackProvider>
        </ToastifyProvider>
      </body>
    </html>
  )
}