"use client"

import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface SuccessScreenProps {
  /**
   * Title to display
   */
  title: string
  /**
   * Message to display
   */
  message: string
  /**
   * Redirect path
   */
  redirectPath: string
  /**
   * Redirect delay in milliseconds
   */
  redirectDelay?: number
  /**
   * Optional additional className for the container
   */
  className?: string
  /**
   * Optional button text
   */
  buttonText?: string
}

export default function SuccessScreen({
  title,
  message,
  redirectPath,
  redirectDelay = 3000,
  className = "",
  buttonText = "Continue",
}: SuccessScreenProps) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(redirectDelay / 1000)

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Redirect after delay
    const redirect = setTimeout(() => {
      router.push(redirectPath)
    }, redirectDelay)

    // Cleanup
    return () => {
      clearInterval(timer)
      clearTimeout(redirect)
    }
  }, [redirectPath, redirectDelay, router])

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen text-center px-4 ${className}`}>
      <div className="animate-fade-in-up">
        <div className="mb-6 bg-teal-100 dark:bg-teal-900/30 rounded-full p-4 inline-flex">
          <Check className="h-12 w-12 text-teal-500" />
        </div>

        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">{message}</p>

        <div className="flex flex-col items-center">
          <Button onClick={() => router.push(redirectPath)} className="bg-teal-500 hover:bg-teal-600 group mb-2">
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-sm text-muted-foreground">
            Redirecting in <span className="font-medium">{countdown}</span> seconds...
          </p>
        </div>
      </div>
    </div>
  )
}
