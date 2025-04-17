"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Upload, Save, Shield, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"
import Footer from "@/components/footer"
import { userApi } from "@/lib/api"

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
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [authLoading, isAuthenticated, router, toast])

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

    setIsSaving(true)
    try {
      // Create a copy of userData and remove any fields you don't want to update
      // For example, you might want to exclude username, pk, etc.
      const { username, pk, ...updateData } = userData

      console.log("Submitting update data:", updateData)

      const updatedData = await userApi.updateProfile(updateData)
      setUserData({ ...userData, ...updatedData })
      setError(null)
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (err) {
      console.error("Failed to update profile:", err)
      setError("Failed to update profile. Please try again.")
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile",
        variant: "destructive",
      })
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
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been successfully updated.",
      })
    }, 1500)
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

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
              {error}
            </div>
          )}

          <Separator className="mb-6" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Upload a new profile picture or avatar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative">
                    <div className="relative h-24 w-24">
                      <Image
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile picture"
                        className="rounded-full border-4 border-background object-cover"
                        fill
                      />
                      {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="text-sm text-muted-foreground">
                      <p>Recommended: Square JPG, PNG, or GIF, at least 300x300 pixels.</p>
                      <p>Maximum file size: 5MB</p>
                    </div>
                    <div className="flex gap-4">
                      <Button type="button" variant="outline" size="sm" onClick={handleImageUpload} className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload New Picture
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <Input id="last_name" name="last_name" value={userData?.last_name || ""} onChange={handleChange} />
                  </div>
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={userData?.email || ""} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={userData?.phone_number || ""}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={userData?.address || ""}
                    onChange={handleChange}
                    placeholder="Your address"
                    className="min-h-[80px]"
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

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="button" variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
