import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { CsrfProvider } from "@/components/csrf-provider"
import CookieConsent from "@/components/cookie-consent"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ResumeRise - CV Improvement Tool",
  description:
    "Upload your CV and get instant, AI-powered feedback to make your resume stand out from the competition.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CsrfProvider>
            <AuthProvider>
              {children}
              <CookieConsent />
              <Toaster />
            </AuthProvider>
          </CsrfProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"
