"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Upload, Save, Shield, X, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"
import Footer from "@/components/footer"
import { userApi, authApi } from "@/lib/api"

// Define the user data interface based on your API response
interface UserData {
  pk: number
  username: string
  email: string
  first_name: string
  last_name: string
  phone_number: string
  address: string
  date_of_birth: string
}

export default function EditProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg?height=96&width=96")
  const [isUploading, setIsUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Password state
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | Record<string, string[]> | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (authLoading) return

      if (!isAuthenticated) {
        router.push("/sign-in")
        return
      }

      try {
        setIsLoading(true)
        const data = await userApi.getProfile()
        setUserData(data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch user data:", err)
        setError("Failed to load profile data. Please try again.")
        showErrorToast("Failed to load profile data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [authLoading, isAuthenticated, router])

  // Helper function to show success toast
  const showSuccessToast = (message: string) => {
    toast({
      title: "Success",
      description: message,
      variant: "default",
      duration: 5000,
      action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    })
  }

  // Helper function to show error toast
  const showErrorToast = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
      duration: 7000,
      action: <ToastAction altText="Try again">Try again</ToastAction>,
      icon: <AlertCircle className="h-5 w-5" />,
    })
  }

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (userData) {
      setUserData({
        ...userData,
        [name]: value,
      })
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userData) return

    // Clear previous messages
    setError(null)
    setSuccessMessage(null)
    setIsSaving(true)

    try {
      // Create a copy of userData and remove any fields you don't want to update
      const { username, pk, ...updateData } = userData

      if (updateData.date_of_birth === "") {
        updateData.date_of_birth = null
      }

      console.log("Submitting update data:", updateData)

      const updatedData = await userApi.updateProfile(updateData)
      setUserData({ ...userData, ...updatedData })

      // Set success message
      const successMsg = "Your profile has been successfully updated."
      setSuccessMessage(successMsg)
      showSuccessToast(successMsg)

      // Scroll to top to show the success message
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      console.error("Failed to update profile:", err)

      // Handle different error types
      let errorMessage = "There was a problem updating your profile. Please try again."

      if (err && typeof err === "object") {
        // If the error is an object with field-specific errors
        if ("email" in err) {
          errorMessage = `Email error: ${err.email}`
        } else if ("first_name" in err) {
          errorMessage = `First name error: ${err.first_name}`
        } else if ("last_name" in err) {
          errorMessage = `Last name error: ${err.last_name}`
        } else if ("detail" in err) {
          errorMessage = err.detail
        } else if ("message" in err) {
          errorMessage = err.message
        }
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      setError(errorMessage)
      showErrorToast(errorMessage)

      // Scroll to top to show the error message
      window.scrollTo({ top: 0, behavior: "smooth" })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle profile image upload
  const handleImageUpload = () => {
    // Simulate image upload - replace with actual upload logic
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setProfileImage("/placeholder.svg?height=96&width=96")
      showSuccessToast("Your profile picture has been successfully updated.")
    }, 1500)
  }

  // Handle password form field changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  // Handle password update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault() // This is crucial to prevent page reload
    console.log("Password update form submitted")

    // Clear previous messages
    setPasswordError(null)
    setPasswordSuccess(null)

    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      return
    }

    setIsChangingPassword(true)

    try {
      await authApi.changePassword(passwordData.newPassword, passwordData.confirmPassword)

      // Set success message
      const successMsg = "Your password has been successfully updated."
      setPasswordSuccess(successMsg)
      showSuccessToast(successMsg)

      // Clear form
      setPasswordData({
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      console.error("Failed to update password:", err)

      // Handle different error types
      let errorMessage = "There was a problem updating your password. Please try again."

      if (err && typeof err === "object") {
        // If the error is an object with field-specific errors
        if ("old_password" in err) {
          errorMessage = `Current password error: ${err.old_password}`
        } else if ("new_password1" in err) {
          errorMessage = `New password error: ${err.new_password1}`
        } else if ("new_password2" in err) {
          errorMessage = `Confirm password error: ${err.new_password2}`
        } else if ("detail" in err) {
          errorMessage = err.detail
        } else if ("message" in err) {
          errorMessage = err.message
        }
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      setPasswordError(errorMessage)
      showErrorToast(errorMessage)
    } finally {
      setIsChangingPassword(false)
    }
  }

  // Show loading screen while fetching data
  if (authLoading || (isLoading && !error)) {
    return <LoadingScreen message="Loading profile..." />
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/profile" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Profile</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/profile")}
              className="hidden md:flex gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-teal-500 hover:bg-teal-600 gap-2"
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 md:py-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-[350px] -left-[100px] w-[600px] h-[600px] rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-900/20"></div>
          <div className="absolute top-[30%] -right-[150px] w-[600px] h-[600px] rounded-full bg-teal-100/20 blur-3xl dark:bg-teal-900/10"></div>
        </div>

        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
            <p className="text-muted-foreground">Update your personal information and account settings</p>
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>{successMessage}</div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>{error}</div>
            </div>
          )}

          <Separator className="mb-6" />

          <div className="space-y-6">
            {/* Profile form */}
            <form onSubmit={handleSubmit}>
              {/* Profile Picture
              // <Card>
              //   <CardHeader>
              //     <CardTitle>Profile Picture</CardTitle>
              //     <CardDescription>Upload a new profile picture or avatar</CardDescription>
              //   </CardHeader>
              //   <CardContent className="space-y-4">
              //     <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              //       <div className="relative">
              //         <div className="relative h-24 w-24">
              //           <Image
              //             src={profileImage || "/placeholder.svg"}
              //             alt="Profile picture"
              //             className="rounded-full border-4 border-background object-cover"
              //             fill
              //           />
              //           {isUploading && (
              //             <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              //               <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
              //             </div>
              //           )}
              //         </div>
              //       </div>
              //       <div className="flex flex-col gap-4">
              //         <div className="text-sm text-muted-foreground">
              //           <p>Recommended: Square JPG, PNG, or GIF, at least 300x300 pixels.</p>
              //           <p>Maximum file size: 5MB</p>
              //         </div>
              //         <div className="flex gap-4">
              //           <Button type="button" variant="outline" size="sm" onClick={handleImageUpload} className="gap-2">
              //             <Upload className="h-4 w-4" />
              //             Upload New Picture
              //           </Button>
              //           <Button
              //             type="button"
              //             variant="ghost"
              //             size="sm"
              //             className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
              //           >
              //             Remove
              //           </Button>
              //         </div>
              //       </div>
              //     </div>
              //   </CardContent>
              // </Card> */}

              {/* Personal Information */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={userData?.username || ""}
                      onChange={handleChange}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Username cannot be changed</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={userData?.first_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={userData?.last_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData?.email || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <Input
                        id="date_of_birth"
                        name="date_of_birth"
                        type="date"
                        value={userData?.date_of_birth || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-teal-500 hover:bg-teal-600 gap-2" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </form>

            {/* Password Change - SEPARATE FORM */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Password success message */}
                {passwordSuccess && (
                  <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>{passwordSuccess}</div>
                  </div>
                )}

                {/* Password error message */}
                {passwordError && (
                  <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      {typeof passwordError === "string" ? (
                        passwordError
                      ) : (
                        <ul className="list-disc pl-5 space-y-1">
                          {Object.entries(passwordError).map(([field, messages]) =>
                            Array.isArray(messages) ? (
                              messages.map((message, i) => (
                                <li key={`${field}-${i}`}>
                                  <strong>
                                    {field === "new_password1"
                                      ? "New password"
                                      : field === "new_password2"
                                        ? "Confirm password"
                                        : field === "old_password"
                                          ? "Current password"
                                          : field}
                                    :
                                  </strong>{" "}
                                  {message}
                                </li>
                              ))
                            ) : (
                              <li key={field}>
                                <strong>
                                  {field === "new_password1"
                                    ? "New password"
                                    : field === "new_password2"
                                      ? "Confirm password"
                                      : field === "old_password"
                                        ? "Current password"
                                        : field}
                                  :
                                </strong>{" "}
                                {String(messages)}
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

                {/* Password change form - SEPARATE FORM */}
                <form onSubmit={handlePasswordUpdate}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showNewPassword ? "Hide" : "Show"} password</span>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 8 characters and cannot be entirely numeric.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showConfirmPassword ? "Hide" : "Show"} password</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button type="submit" className="gap-2 bg-teal-500 hover:bg-teal-600" disabled={isChangingPassword}>
                      {isChangingPassword ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Updating Password...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4" />
                          Update Password
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
