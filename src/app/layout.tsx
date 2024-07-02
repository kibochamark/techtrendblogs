import "./globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { ThemeProvider } from "./ThemeProvider"
import { NavBar } from "@/components/Layout/NavBar"
import Footer from "@/components/Layout/Footer"
import QueryProvider from "./QueryProvider"
import { Toaster } from "@/components/ui/sonner"
import ReduxProvider from "./ReduxProvider"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ReduxProvider>

              <NavBar />
              {children}
              <Footer />
              <Toaster position="top-right" />
            </ReduxProvider>
          </QueryProvider>


        </ThemeProvider>
      </body>
    </html >
  )
}
