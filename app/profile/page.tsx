"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, FileText, BarChart2, Clock, CheckCircle, Upload, Bell, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import ResumeHistoryItem from "@/components/resume-history-item"
import { useAuth } from "@/lib/auth-context"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()

  // Debug log to see what user data we're getting
  console.log("Profile page - User data:", user)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:text-teal-500 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] font-medium text-white">
                3
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 md:py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
            {/* Profile Sidebar */}
            <div className="space-y-6">
              <Card className="overflow-hidden border-none shadow-md">
                <div className="bg-gradient-to-r from-teal-500 to-teal-400 h-24"></div>
                <div className="px-6 pb-6 -mt-12">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="relative h-24 w-24">
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        alt="Profile picture"
                        className="rounded-full border-4 border-background object-cover shadow-md"
                        fill
                      />
                      <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-background"></div>
                    </div>
                    <div>
                      {isLoading ? (
                        <>
                          <Skeleton className="h-6 w-32 mb-2" />
                          <Skeleton className="h-4 w-48" />
                        </>
                      ) : (
                        <>
                          <h1 className="text-xl font-bold">
                            {user?.first_name && user?.last_name
                              ? `${user.first_name} ${user.last_name}`
                              : user?.name || user?.username || "User"}
                          </h1>
                          <p className="text-sm text-muted-foreground">{user?.email || "No email provided"}</p>
                        </>
                      )}
                    </div>
                    <Link href="/profile/edit" className="w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full transition-all hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-950/30 dark:hover:text-teal-400"
                      >
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">Subscription</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-teal-500">Pro</Badge>
                      <span className="text-sm font-medium">$19.99/month</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Renews Nov 1, 2023</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-500" />
                      <span className="text-sm">Unlimited resume analyses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-500" />
                      <span className="text-sm">Advanced ATS compatibility</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-500" />
                      <span className="text-sm">Industry-specific insights</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/profile/subscription" className="w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full transition-all hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-950/30 dark:hover:text-teal-400"
                    >
                      Manage Subscription
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <nav className="space-y-1">
                    <Link
                      href="/profile/edit"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <span>Account Settings</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <span>Privacy & Security</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <span>Notification Preferences</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <span>Help & Support</span>
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              <Tabs defaultValue="dashboard" className="w-full">
                <div className="bg-background rounded-lg border p-1 shadow-sm">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      value="dashboard"
                      className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-950/30 dark:data-[state=active]:text-teal-300"
                    >
                      Dashboard
                    </TabsTrigger>
                    <TabsTrigger
                      value="resumes"
                      className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-950/30 dark:data-[state=active]:text-teal-300"
                    >
                      My Resumes
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-950/30 dark:data-[state=active]:text-teal-300"
                    >
                      Analytics
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-6 pt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-none shadow-md overflow-hidden">
                      <div className="h-1 bg-teal-500"></div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Resume Score</CardTitle>
                        <FileText className="h-4 w-4 text-teal-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">78/100</div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-green-500 font-medium">+12 points</span>
                          <span className="text-xs text-muted-foreground ml-2">from last version</span>
                        </div>
                        <Progress value={78} className="mt-2 h-1.5 bg-muted" indicatorClassName="bg-teal-500" />
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-md overflow-hidden">
                      <div className="h-1 bg-green-500"></div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ATS Compatibility</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-green-500 font-medium">+8%</span>
                          <span className="text-xs text-muted-foreground ml-2">from last version</span>
                        </div>
                        <Progress value={92} className="mt-2 h-1.5 bg-muted" indicatorClassName="bg-green-500" />
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-md overflow-hidden">
                      <div className="h-1 bg-amber-500"></div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Keyword Match</CardTitle>
                        <BarChart2 className="h-4 w-4 text-amber-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">65%</div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-green-500 font-medium">+15%</span>
                          <span className="text-xs text-muted-foreground ml-2">from last version</span>
                        </div>
                        <Progress value={65} className="mt-2 h-1.5 bg-muted" indicatorClassName="bg-amber-500" />
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-md overflow-hidden">
                      <div className="h-1 bg-blue-500"></div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2 days ago</div>
                        <p className="text-xs text-muted-foreground mt-1">Oct 12, 2023</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-none shadow-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Improvement Suggestions</CardTitle>
                          <CardDescription>Top recommendations to improve your resume</CardDescription>
                        </div>
                        <Link href="#" className="text-sm text-teal-500 hover:underline flex items-center">
                          <span>View All</span>
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="mt-0.5 rounded-full bg-amber-500/20 p-1.5 text-amber-500">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium leading-none">Add more quantifiable achievements</p>
                            <p className="text-sm text-muted-foreground">
                              Include specific metrics and results to make your accomplishments more impactful.
                            </p>
                            <div className="pt-2">
                              <Button variant="link" className="h-auto p-0 text-teal-500">
                                Learn how
                              </Button>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="mt-0.5 rounded-full bg-red-500/20 p-1.5 text-red-500">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium leading-none">Remove outdated skills</p>
                            <p className="text-sm text-muted-foreground">
                              Your skills section contains some outdated technologies that may date your experience.
                            </p>
                            <div className="pt-2">
                              <Button variant="link" className="h-auto p-0 text-teal-500">
                                Learn how
                              </Button>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="mt-0.5 rounded-full bg-teal-500/20 p-1.5 text-teal-500">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium leading-none">Improve your summary statement</p>
                            <p className="text-sm text-muted-foreground">
                              Make your professional summary more compelling by highlighting your unique value
                              proposition.
                            </p>
                            <div className="pt-2">
                              <Button variant="link" className="h-auto p-0 text-teal-500">
                                Learn how
                              </Button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Resumes Tab */}
                <TabsContent value="resumes" className="space-y-6 pt-6">
                  <Card className="border-none shadow-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Resume History</CardTitle>
                          <CardDescription>Your previously uploaded and analyzed resumes</CardDescription>
                        </div>
                        <Button className="bg-teal-500 hover:bg-teal-600 shadow-sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload New
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <ResumeHistoryItem
                          title="Software_Engineer_Resume_v3.pdf"
                          date="Oct 12, 2023"
                          score={78}
                          status="Active"
                        />
                        <ResumeHistoryItem
                          title="Software_Engineer_Resume_v2.pdf"
                          date="Sep 28, 2023"
                          score={66}
                          status="Archived"
                        />
                        <ResumeHistoryItem
                          title="Software_Engineer_Resume_v1.pdf"
                          date="Aug 15, 2023"
                          score={54}
                          status="Archived"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6 pt-6">
                  <Card className="border-none shadow-md">
                    <CardHeader>
                      <CardTitle>Resume Performance</CardTitle>
                      <CardDescription>Track your resume's improvement over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <BarChart2 className="mx-auto h-12 w-12 opacity-50" />
                        <p className="mt-2">Analytics visualization would appear here</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md">
                    <CardHeader>
                      <CardTitle>Industry Comparison</CardTitle>
                      <CardDescription>How your resume compares to others in your industry</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Content Quality</span>
                            <Badge
                              variant="outline"
                              className="text-green-500 border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                            >
                              Above Average
                            </Badge>
                          </div>
                          <Progress value={75} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Keyword Optimization</span>
                            <Badge
                              variant="outline"
                              className="text-amber-500 border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30"
                            >
                              Average
                            </Badge>
                          </div>
                          <Progress value={50} className="h-2 bg-muted" indicatorClassName="bg-amber-500" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">ATS Compatibility</span>
                            <Badge
                              variant="outline"
                              className="text-green-500 border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                            >
                              Excellent
                            </Badge>
                          </div>
                          <Progress value={92} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Format & Structure</span>
                            <Badge
                              variant="outline"
                              className="text-blue-500 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30"
                            >
                              Good
                            </Badge>
                          </div>
                          <Progress value={68} className="h-2 bg-muted" indicatorClassName="bg-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} ResumeRise. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-teal-500 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-teal-500 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-teal-500 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
