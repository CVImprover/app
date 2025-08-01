import type React from "react"
import Script from "next/script"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { CsrfProvider } from "@/components/csrf-provider"
import CookieConsent from "@/components/cookie-consent"
import GoogleAnalytics from "@/components/google-analytics"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

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
        {/* Google Analytics Scripts */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CsrfProvider>
            <AuthProvider>
              {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
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
