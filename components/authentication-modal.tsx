"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, UserPlus, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { authApi } from "@/lib/api"

interface AuthenticationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  resumeId: string
}

export default function AuthenticationModal({ isOpen, onClose, onSuccess, resumeId }: AuthenticationModalProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login } = useAuth()

  // Sign in form state
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  // Sign up form state
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  })

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSignInData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSignUpData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await login(signInData.username, signInData.password)
      onSuccess()
      router.push(`/analysis/${resumeId}`)
    } catch (err) {
      console.error("Login failed:", err)
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!signUpData.agreedToTerms) {
      setError("You must agree to the terms of service and privacy policy")
      return
    }

    setIsLoading(true)

    try {
      // Register the user
      await authApi.register(signUpData.username, signUpData.email, signUpData.password)

      // After successful registration, log them in
      await login(signUpData.username, signUpData.password)

      onSuccess()
      router.push(`/analysis/${resumeId}`)
    } catch (err) {
      console.error("Registration failed:", err)

      if (err && typeof err === "object" && !(err instanceof Error)) {
        // Format API validation errors
        const errorMessages = Object.entries(err)
          .map(([field, messages]) => {
            if (Array.isArray(messages)) {
              return `${field}: ${messages.join(", ")}`
            }
            return `${field}: ${messages}`
          })
          .join("; ")

        setError(errorMessages || "Registration failed. Please try again.")
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{activeTab === "signin" ? "Sign in to view your analysis" : "Create an account"}</DialogTitle>
          <DialogDescription>
            Please sign in or create an account to view your resume analysis results.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs
          defaultValue="signin"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
        >
          {/* Sign In Form */}
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="signin-username">Username</Label>
                <Input
                  id="signin-username"
                  name="username"
                  value={signInData.username}
                  onChange={handleSignInChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="signin-password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs" type="button">
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="signin-password"
                  name="password"
                  type="password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  name="rememberMe"
                  checked={signInData.rememberMe}
                  onCheckedChange={(checked) => setSignInData((prev) => ({ ...prev, rememberMe: checked === true }))}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>

              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
            <div className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-teal-500"
                type="button"
                onClick={() => setActiveTab("signup")}
              >
                Sign up
              </Button>
            </div>
          </TabsContent>

          {/* Sign Up Form */}
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  name="username"
                  value={signUpData.username}
                  onChange={handleSignUpChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  required
                />
                <p className="text-xs text-muted-foreground">Password must be at least 8 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={handleSignUpChange}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  name="agreedToTerms"
                  checked={signUpData.agreedToTerms}
                  onCheckedChange={(checked) => setSignUpData((prev) => ({ ...prev, agreedToTerms: checked === true }))}
                />
                <Label htmlFor="terms" className="text-xs">
                  I agree to the terms of service and privacy policy
                </Label>
              </div>

              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
            <div className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-teal-500"
                type="button"
                onClick={() => setActiveTab("signin")}
              >
                Sign in
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
