import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider} from '@clerk/nextjs'



export const metadata:Metadata = {
  title: "AetherMinds",
  description: "Elevate learning and well-being to a higher plane, where academic success meets mental clarity.",
};


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>

      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon.png" />
      </head>
      <body>
          
      
     
        {children}
        
      </body>
    </html>
    </ClerkProvider>
  );
}
