import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs";
import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { ReactNode } from "react"
import AuthGuard from "@/components/auth/guards/AuthGuard";
import { Toaster } from "@workspace/ui/components/sonner";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const RootLayout=({
  children,
}: Readonly<{
  children: ReactNode
}>) =>{
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <ClerkProvider>
          <Providers>
            <AuthGuard>
              <Toaster />
              {children}
            </AuthGuard>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
export default RootLayout;