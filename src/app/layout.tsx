import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/utils/cn"
import { Mulish, Roboto } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"
import NextToploader from "nextjs-toploader"
import { NuqsAdapter } from "nuqs/adapters/next/app"

export const metadata: Metadata = {
  title: "Car Dealership Webstore",
  description: "A modern car dealership webstore built with Next.js and Nuqs.",
}

const mulish = Mulish({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased overscroll-none bg-background",
          roboto.variable,
          mulish.variable
        )}
      >
        {/* Global Providers */}
        <NextToploader showSpinner={true} />

        <NuqsAdapter>{children}</NuqsAdapter>

        
        <Toaster />
      </body>
    </html>
  )
}
