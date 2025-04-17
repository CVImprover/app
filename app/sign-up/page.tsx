"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileUp, ArrowRight, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCsrf } from "@/components/csrf-provider"
import { authApi, userApi } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import SuccessScreen from "@/components/success-screen"
import { useToast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | Record<string, string[]> | null>(null)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [registeredCredentials, setRegisteredCredentials] = useState<{ username: string; password: string } | null>(
    null,
  )
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const { loading: csrfLoading, isAuthenticated } = useCsrf()
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is already authenticated by calling getProfile
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // First check if CSRF is still loading
        if (csrfLoading) {
          return // Wait for CSRF to load
        }

        // If isAuthenticated is already true from context, redirect immediately
        if (isAuthenticated) {
          console.log("User already authenticated via context, redirecting to profile")
          router.push("/profile")
          return
        }

        // Otherwise, try to fetch profile data to double-check authentication
        console.log("Checking authentication via getProfile API call")
        const userData = await userApi.getProfile()

        // If we get here without an error, the user is authenticated
        console.log("User is authenticated via API, redirecting to profile")
        router.push("/profile")
      } catch (err) {
        // If getProfile fails, user is not authenticated
        console.log("User is not authenticated, showing sign-up form")
        setPageLoading(false)
      }
    }

    checkAuthentication()
  }, [csrfLoading, isAuthenticated, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreedToTerms) {
      setError("You must agree to the terms of service and privacy policy")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      // Register the user using the authApi
      await authApi.register(formData.username, formData.email, formData.password)
      console.log("Registration successful")

      // Store credentials for later login
      setRegisteredCredentials({
        username: formData.username,
        password: formData.password,
      })

      // Show success screen
      setRegistrationSuccess(true)
    } catch (err) {
      console.error("Registration failed:", err)

      // Log the error type for debugging
      console.log("Error type:", typeof err)
      console.log("Error is Error instance:", err instanceof Error)
      console.log("Error keys:", err && typeof err === "object" ? Object.keys(err) : "Not an object")

      // Handle different error types
      if (err && typeof err === "object" && !(err instanceof Error)) {
        setError(err as Record<string, string[]>)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle login
  const handleLogin = async () => {
    if (!registeredCredentials || isLoggingIn) return

    setIsLoggingIn(true)
    try {
      await login(registeredCredentials.username, registeredCredentials.password)
      console.log("Auto-login successful after registration")
      // The login function will handle the redirect to the profile page
    } catch (err) {
      console.error("Auto-login failed:", err)
      toast({
        title: "Login Failed",
        description: "We couldn't log you in automatically. Please try signing in manually.",
        variant: "destructive",
      })
      router.push("/sign-in")
    }
  }

  // If registration was successful, show the success screen with login
  if (registrationSuccess) {
    return (
      <SuccessScreen
        title="Registration Successful!"
        message={`Welcome to ResumeRise, ${registeredCredentials?.username || ""}! Your account has been created successfully. You'll be redirected to your profile page in a moment.`}
        redirectPath="/profile"
        redirectDelay={3000}
        buttonText={isLoggingIn ? "Logging in..." : "Go to Profile"}
        onButtonClick={handleLogin}
        isButtonLoading={isLoggingIn}
      />
    )
  }

  // Show loading screen while checking authentication
  if (csrfLoading || pageLoading) {
    return <LoadingScreen message="Checking authentication..." />
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header showNav={false} showGetStarted={false} />

      <main className="flex-1 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-[350px] -left-[100px] w-[600px] h-[600px] rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-900/20"></div>
          <div className="absolute top-[30%] -right-[150px] w-[600px] h-[600px] rounded-full bg-teal-100/20 blur-3xl dark:bg-teal-900/10"></div>
        </div>

        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-md space-y-6 relative">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-muted-foreground">
                Sign up to get started with ResumeRise and improve your resume today.
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {typeof error === "string" ? (
                    error
                  ) : (
                    <ul className="list-disc pl-5 space-y-1">
                      {Object.entries(error).map(([field, messages]) =>
                        Array.isArray(messages) ? (
                          messages.map((message, i) => (
                            <li key={`${field}-${i}`}>
                              <strong>{field === "password1" ? "Password" : field}:</strong> {message}
                            </li>
                          ))
                        ) : (
                          <li key={field}>
                            <strong>{field === "password1" ? "Password" : field}:</strong> {String(messages)}
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters and cannot be entirely numeric.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-teal-500 hover:underline">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-security" className="text-teal-500 hover:underline">
                    privacy policy
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 group" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-teal-500 hover:underline">
                  Sign in
                </Link>
              </div>
            </form>

          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

