import type { Metadata } from "next";

import "./globals.css";
import { cn } from "@/utils/cn";
import {Mulish, Roboto} from 'next/font/google' 


import { ToastProvider } from "@/components/ui/toasts/ToastProvider";
import NextToploader from "nextjs-toploader";
import {NuqsAdapter} from 'nuqs/adapters/next/app';  // Example adapter import

export const metadata: Metadata = {
  title: "Car Dealership Webstore",
  description: "A modern car dealership webstore built with Next.js and Nuqs.",
};

const mulish = Mulish({ // Use the Mulish font
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const roboto = Roboto({  // Use the Roboto font
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});


  export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body


    className={cn(
          "antialiased overscroll-none bg background ", roboto.variable, 
          mulish.variable,
        )}
      >   

     {/* Global providers */}
 <NextToploader showSpinner = {false} />
        <ToastProvider>  </ToastProvider>
<NuqsAdapter>{children}</NuqsAdapter>
        
      </body>
    </html>
  );
}

