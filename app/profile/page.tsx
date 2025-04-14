import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, FileText, Settings, BarChart2, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import ResumeHistoryItem from "@/components/resume-history-item"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
            {/* Profile Sidebar */}
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="relative h-24 w-24">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile picture"
                    className="rounded-full border-4 border-background object-cover"
                    fill
                  />
                  <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-teal-500 border-2 border-background"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold">John Doe</h1>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Edit Profile
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Subscription</h3>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Pro Plan</CardTitle>
                    <CardDescription>Renews on Nov 1, 2023</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              <Tabs defaultValue="dashboard">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="resumes">My Resumes</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-6 pt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Resume Score</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">78/100</div>
                        <p className="text-xs text-muted-foreground">+12 from last version</p>
                        <Progress value={78} className="mt-2" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ATS Compatibility</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground">+8% from last version</p>
                        <Progress value={92} className="mt-2" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Keyword Match</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">65%</div>
                        <p className="text-xs text-muted-foreground">+15% from last version</p>
                        <Progress value={65} className="mt-2" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2 days ago</div>
                        <p className="text-xs text-muted-foreground">Oct 12, 2023</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Improvement Suggestions</CardTitle>
                      <CardDescription>Top recommendations to improve your resume</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5 rounded-full bg-amber-500/20 p-1 text-amber-500">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium leading-none">Add more quantifiable achievements</p>
                            <p className="text-sm text-muted-foreground">
                              Include specific metrics and results to make your accomplishments more impactful.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5 rounded-full bg-red-500/20 p-1 text-red-500">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium leading-none">Remove outdated skills</p>
                            <p className="text-sm text-muted-foreground">
                              Your skills section contains some outdated technologies that may date your experience.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5 rounded-full bg-teal-500/20 p-1 text-teal-500">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium leading-none">Improve your summary statement</p>
                            <p className="text-sm text-muted-foreground">
                              Make your professional summary more compelling by highlighting your unique value
                              proposition.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Resumes Tab */}
                <TabsContent value="resumes" className="space-y-6 pt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resume History</CardTitle>
                      <CardDescription>Your previously uploaded and analyzed resumes</CardDescription>
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
                      <div className="mt-6 flex justify-center">
                        <Button className="bg-teal-500 hover:bg-teal-600">Upload New Resume</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6 pt-6">
                  <Card>
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

                  <Card>
                    <CardHeader>
                      <CardTitle>Industry Comparison</CardTitle>
                      <CardDescription>How your resume compares to others in your industry</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Content Quality</span>
                            <span className="text-sm text-muted-foreground">Above Average</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Keyword Optimization</span>
                            <span className="text-sm text-muted-foreground">Average</span>
                          </div>
                          <Progress value={50} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">ATS Compatibility</span>
                            <span className="text-sm text-muted-foreground">Excellent</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Format & Structure</span>
                            <span className="text-sm text-muted-foreground">Good</span>
                          </div>
                          <Progress value={68} className="h-2" />
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

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} ResumeRise. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-teal-500">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-teal-500">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-teal-500">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
