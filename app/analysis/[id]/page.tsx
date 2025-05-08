import Link from "next/link"
import { ArrowLeft, FileText, Download, CheckCircle, XCircle, AlertTriangle, Info, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import BeforeAfterExample from "@/components/before-after-example"


export default async function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  // In a real app, you would fetch the analysis data based on the ID
  const { id } = await params
  const resumeId = id
  

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/profile" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Profile</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
              Apply Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Resume Analysis</h1>
                <p className="text-muted-foreground">
                  Detailed analysis and improvement suggestions for your resume (ID: {resumeId})
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-teal-500">Software Engineer</Badge>
                <Badge variant="outline">Technology</Badge>
                <Badge variant="outline">Mid-Level</Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_300px]">
            {/* Main Content */}
            <div className="space-y-8">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="format">Format</TabsTrigger>
                  <TabsTrigger value="keywords">Keywords</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 pt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Overall Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold">78/100</div>
                          <Badge className="bg-amber-500">Good</Badge>
                        </div>
                        <Progress value={78} className="mt-2" />
                        <p className="mt-2 text-xs text-muted-foreground">
                          Your resume is performing well but has room for improvement
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">ATS Compatibility</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold">92%</div>
                          <Badge className="bg-green-500">Excellent</Badge>
                        </div>
                        <Progress value={92} className="mt-2" />
                        <p className="mt-2 text-xs text-muted-foreground">
                          Your resume is well-optimized for Applicant Tracking Systems
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Keyword Match</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold">65%</div>
                          <Badge className="bg-amber-500">Average</Badge>
                        </div>
                        <Progress value={65} className="mt-2" />
                        <p className="mt-2 text-xs text-muted-foreground">
                          Your resume could include more relevant industry keywords
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Section Analysis</CardTitle>
                      <CardDescription>Performance breakdown by resume section</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Professional Summary</span>
                            <div className="flex items-center">
                              <span className="mr-2 text-sm text-muted-foreground">65%</span>
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            </div>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Work Experience</span>
                            <div className="flex items-center">
                              <span className="mr-2 text-sm text-muted-foreground">82%</span>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                          </div>
                          <Progress value={82} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Skills</span>
                            <div className="flex items-center">
                              <span className="mr-2 text-sm text-muted-foreground">70%</span>
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            </div>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Education</span>
                            <div className="flex items-center">
                              <span className="mr-2 text-sm text-muted-foreground">90%</span>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Projects</span>
                            <div className="flex items-center">
                              <span className="mr-2 text-sm text-muted-foreground">55%</span>
                              <XCircle className="h-4 w-4 text-red-500" />
                            </div>
                          </div>
                          <Progress value={55} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Improvement Areas</CardTitle>
                      <CardDescription>Focus on these areas for the biggest impact</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 rounded-lg border p-4">
                          <div className="mt-0.5 rounded-full bg-red-500/20 p-1 text-red-500">
                            <XCircle className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">Quantify Your Achievements</h3>
                            <p className="text-sm text-muted-foreground">
                              Your work experience lacks specific metrics and results. Add numbers to demonstrate your
                              impact.
                            </p>
                            <div className="mt-2">
                              <Link href="#content" className="text-xs text-teal-500 hover:underline">
                                See detailed suggestions →
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 rounded-lg border p-4">
                          <div className="mt-0.5 rounded-full bg-amber-500/20 p-1 text-amber-500">
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">Enhance Your Professional Summary</h3>
                            <p className="text-sm text-muted-foreground">
                              Your summary is too generic. Make it more compelling by highlighting your unique value
                              proposition.
                            </p>
                            <div className="mt-2">
                              <Link href="#content" className="text-xs text-teal-500 hover:underline">
                                See detailed suggestions →
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 rounded-lg border p-4">
                          <div className="mt-0.5 rounded-full bg-amber-500/20 p-1 text-amber-500">
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">Update Your Skills Section</h3>
                            <p className="text-sm text-muted-foreground">
                              Remove outdated skills and add more relevant technologies that match current job
                              requirements.
                            </p>
                            <div className="mt-2">
                              <Link href="#keywords" className="text-xs text-teal-500 hover:underline">
                                See detailed suggestions →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Content Tab */}
                <TabsContent value="content" className="space-y-6 pt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Summary</CardTitle>
                      <CardDescription>First impressions matter</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md bg-muted p-4">
                          <p className="text-sm italic">
                            "Experienced software engineer with a background in web development and a passion for
                            creating user-friendly applications. Skilled in JavaScript, React, and Node.js."
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Analysis:</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                              <p className="text-sm text-muted-foreground">
                                Too generic and doesn't differentiate you from other candidates
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                              <p className="text-sm text-muted-foreground">
                                Lacks specific achievements or unique value proposition
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                              <p className="text-sm text-muted-foreground">
                                Missing targeted information for the specific role
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Improvement Suggestions:</h3>
                          <div className="rounded-md bg-teal-50 p-4 dark:bg-teal-950/30">
                            <p className="text-sm italic text-teal-700 dark:text-teal-300">
                              "Results-driven software engineer with 5+ years of experience delivering high-performance
                              web applications that improved user engagement by 35%. Specialized in React.js, Node.js,
                              and cloud architecture, with a track record of reducing load times by 40% and implementing
                              CI/CD pipelines that cut deployment time by 60%."
                            </p>
                          </div>
                          <div className="space-y-2 pt-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Includes specific metrics and achievements
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Highlights specialized skills relevant to the job market
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Demonstrates business impact, not just technical skills
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Work Experience</CardTitle>
                      <CardDescription>Make your experience stand out</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="text-base font-medium">
                            Senior Developer at TechCorp (2020-Present)
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="rounded-md bg-muted p-4">
                                <ul className="list-disc space-y-1 pl-5 text-sm">
                                  <li>Developed web applications using React and Node.js</li>
                                  <li>Collaborated with the design team to implement UI features</li>
                                  <li>Participated in code reviews and mentored junior developers</li>
                                  <li>Worked on improving application performance</li>
                                </ul>
                              </div>

                              <div className="space-y-2">
                                <h3 className="text-sm font-medium">Analysis:</h3>
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Bullet points are vague and don't showcase specific achievements
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Uses passive language instead of action verbs
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Lacks quantifiable results and business impact
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h3 className="text-sm font-medium">Improvement Suggestions:</h3>
                                <div className="rounded-md bg-teal-50 p-4 dark:bg-teal-950/30">
                                  <ul className="list-disc space-y-1 pl-5 text-sm text-teal-700 dark:text-teal-300">
                                    <li>
                                      Architected and developed a React-based customer portal that increased user
                                      engagement by 35% and reduced support tickets by 25%
                                    </li>
                                    <li>
                                      Led the migration from monolith to microservices architecture, reducing deployment
                                      time by 60% and improving system reliability with 99.9% uptime
                                    </li>
                                    <li>
                                      Mentored 5 junior developers through structured code reviews and pair programming,
                                      accelerating their productivity by 40% within 3 months
                                    </li>
                                    <li>
                                      Optimized application performance by implementing lazy loading and code splitting,
                                      resulting in a 40% reduction in load time and 20% increase in conversion rates
                                    </li>
                                  </ul>
                                </div>
                                <div className="space-y-2 pt-2">
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Uses strong action verbs to begin each bullet point
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Includes specific metrics and percentages to quantify achievements
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Demonstrates business impact beyond technical implementation
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                          <AccordionTrigger className="text-base font-medium">
                            Web Developer at StartupX (2018-2020)
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="rounded-md bg-muted p-4">
                                <ul className="list-disc space-y-1 pl-5 text-sm">
                                  <li>Built features for the company's main product</li>
                                  <li>Fixed bugs and improved existing functionality</li>
                                  <li>Worked with the team to meet project deadlines</li>
                                </ul>
                              </div>

                              <div className="space-y-2">
                                <h3 className="text-sm font-medium">Analysis:</h3>
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Extremely vague descriptions that could apply to any developer
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                    <p className="text-sm text-muted-foreground">
                                      No mention of specific technologies or methodologies used
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Missing context about the company's product or industry
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h3 className="text-sm font-medium">Improvement Suggestions:</h3>
                                <div className="rounded-md bg-teal-50 p-4 dark:bg-teal-950/30">
                                  <ul className="list-disc space-y-1 pl-5 text-sm text-teal-700 dark:text-teal-300">
                                    <li>
                                      Developed key features for a SaaS analytics platform serving 50,000+ users,
                                      including a real-time dashboard that became the product's most-used feature
                                    </li>
                                    <li>
                                      Reduced bug backlog by 70% through systematic code refactoring and implementing
                                      comprehensive test coverage, increasing customer satisfaction scores by 25%
                                    </li>
                                    <li>
                                      Collaborated in an agile team of 8 developers to deliver 12 major releases on
                                      time, contributing to the company's successful Series A funding round of $5M
                                    </li>
                                  </ul>
                                </div>
                                <div className="space-y-2 pt-2">
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Provides context about the company's product and scale
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Highlights specific contributions with measurable outcomes
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <p className="text-sm text-muted-foreground">
                                      Connects individual work to broader business success
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Projects Section</CardTitle>
                      <CardDescription>Showcase your practical skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/30">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <p className="font-medium text-red-700 dark:text-red-300">Missing Section</p>
                          </div>
                          <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                            Your resume doesn't include a dedicated projects section, which is highly valuable for
                            showcasing practical skills and initiative.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Recommendation:</h3>
                          <p className="text-sm text-muted-foreground">
                            Add a projects section that highlights your most impressive technical work, especially if
                            you're early in your career or transitioning to a new field.
                          </p>

                          <div className="mt-4 rounded-md bg-teal-50 p-4 dark:bg-teal-950/30">
                            <h4 className="font-medium text-teal-700 dark:text-teal-300">Example Project Entry:</h4>
                            <div className="mt-2 space-y-2 text-sm text-teal-700 dark:text-teal-300">
                              <p className="font-medium">E-commerce Analytics Dashboard (2022)</p>
                              <ul className="list-disc space-y-1 pl-5">
                                <li>
                                  Developed a full-stack analytics dashboard using React, Node.js, and MongoDB that
                                  visualizes sales data and customer behavior patterns
                                </li>
                                <li>
                                  Implemented responsive design and data visualization components that process 10,000+
                                  data points while maintaining sub-second rendering performance
                                </li>
                                <li>
                                  Integrated with payment gateway APIs and implemented secure authentication using JWT
                                  and OAuth 2.0
                                </li>
                                <li>
                                  GitHub: <span className="underline">github.com/username/project</span> | Demo:{" "}
                                  <span className="underline">project-demo.com</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="space-y-2 pt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Include 2-4 projects that are most relevant to your target role
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                For each project, describe the technologies used, your role, and the problem solved
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Include links to live demos or repositories when possible
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Format Tab */}
                <TabsContent value="format" className="space-y-6 pt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resume Structure</CardTitle>
                      <CardDescription>Organization and readability analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2 rounded-lg border p-4">
                            <h3 className="font-medium">Current Structure</h3>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>1. Contact Information</li>
                              <li>2. Professional Summary</li>
                              <li>3. Skills</li>
                              <li>4. Work Experience</li>
                              <li>5. Education</li>
                            </ul>
                          </div>
                          <div className="space-y-2 rounded-lg border border-teal-200 bg-teal-50 p-4 dark:border-teal-900 dark:bg-teal-950/30">
                            <h3 className="font-medium text-teal-700 dark:text-teal-300">Recommended Structure</h3>
                            <ul className="space-y-1 text-sm text-teal-700 dark:text-teal-300">
                              <li>1. Contact Information</li>
                              <li>2. Professional Summary</li>
                              <li>3. Work Experience</li>
                              <li>4. Projects</li>
                              <li>5. Skills</li>
                              <li>6. Education</li>
                              <li>7. Certifications/Awards (if applicable)</li>
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Structure Analysis:</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                              <p className="text-sm text-muted-foreground">
                                Skills section placed too high, drawing attention away from your experience
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                              <p className="text-sm text-muted-foreground">
                                Missing a dedicated projects section to showcase practical applications
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Good placement of professional summary near the top
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Recommendations:</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Move work experience higher to emphasize your professional background
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Add a projects section to demonstrate practical application of skills
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Move skills section after experience to support your claimed expertise
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Visual Formatting</CardTitle>
                      <CardDescription>Design and readability improvements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <BeforeAfterExample />

                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Formatting Issues:</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                              <p className="text-sm text-muted-foreground">
                                Inconsistent spacing between sections creates visual confusion
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                              <p className="text-sm text-muted-foreground">
                                Dense paragraphs make it difficult for recruiters to scan quickly
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                              <p className="text-sm text-muted-foreground">
                                Inconsistent font sizes and styles create a disjointed appearance
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Formatting Recommendations:</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Use consistent spacing between sections (0.5-0.75 inches)
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Convert dense paragraphs to bullet points for better scannability
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Standardize font styles: 10-12pt for body text, 12-14pt for headings
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Use bold for section headings and job titles, italics sparingly for emphasis
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Maintain consistent alignment throughout the document
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>ATS Optimization</CardTitle>
                      <CardDescription>Making your resume machine-readable</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md bg-green-50 p-4 dark:bg-green-950/30">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <p className="font-medium text-green-700 dark:text-green-300">Good ATS Compatibility</p>
                          </div>
                          <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                            Your resume is generally well-formatted for ATS systems with a score of 92%. Here are some
                            minor improvements to reach 100%.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">ATS Recommendations:</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Use standard section headings (e.g., "Work Experience" instead of "Professional
                                Journey")
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Avoid using tables, text boxes, or columns that ATS systems may misinterpret
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Save your resume as a standard .docx or .pdf file (avoid PDFs created from scans)
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Include your full contact information at the top of the document
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Keywords Tab */}
                <TabsContent value="keywords" className="space-y-6 pt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Keyword Analysis</CardTitle>
                      <CardDescription>How well your resume matches job requirements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950/30">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <p className="font-medium text-amber-700 dark:text-amber-300">Average Keyword Match: 65%</p>
                          </div>
                          <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                            Your resume includes some relevant keywords but is missing several important terms that
                            appear frequently in job descriptions for your target role.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium">Keywords Present in Your Resume:</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge className="bg-green-500">React</Badge>
                              <Badge className="bg-green-500">JavaScript</Badge>
                              <Badge className="bg-green-500">Node.js</Badge>
                              <Badge className="bg-green-500">HTML</Badge>
                              <Badge className="bg-green-500">CSS</Badge>
                              <Badge className="bg-green-500">Git</Badge>
                              <Badge className="bg-green-500">Agile</Badge>
                              <Badge className="bg-green-500">REST API</Badge>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium">Missing Important Keywords:</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline" className="border-amber-500 text-amber-500">
                                TypeScript
                              </Badge>
                              <Badge variant="outline" className="border-amber-500 text-amber-500">
                                Redux
                              </Badge>
                              <Badge variant="outline" className="border-amber-500 text-amber-500">
                                Next.js
                              </Badge>
                              <Badge variant="outline" className="border-amber-500 text-amber-500">
                                CI/CD
                              </Badge>
                              <Badge variant="outline" className="border-amber-500 text-amber-500">
                                Docker
                              </Badge>
                              <Badge variant="outline" className="border-amber-500 text-amber-500">
                                AWS
                              </Badge>
                              <Badge variant="outline" className="border-amber-500 text-amber-500">
                                Unit Testing
                              </Badge>
                              <Badge variant="outline" className="border-amber-500 text-amber-500">
                                GraphQL
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium">Outdated Keywords to Remove:</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline" className="border-red-500 text-red-500">
                                jQuery
                              </Badge>
                              <Badge variant="outline" className="border-red-500 text-red-500">
                                AngularJS
                              </Badge>
                              <Badge variant="outline" className="border-red-500 text-red-500">
                                Backbone.js
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Keyword Recommendations:</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Add missing keywords that you genuinely have experience with (don't keyword stuff)
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Remove outdated technologies to avoid appearing behind the curve
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Include both the spelled-out term and acronym where applicable (e.g., "Continuous
                                Integration/Continuous Deployment (CI/CD)")
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Incorporate keywords naturally throughout your resume, not just in the skills section
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Industry-Specific Terminology</CardTitle>
                      <CardDescription>Tailoring your resume to your field</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Software Development Terminology:</h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2 rounded-lg border p-4">
                              <h4 className="text-sm font-medium">Technical Terms to Include:</h4>
                              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                <li>Microservices Architecture</li>
                                <li>RESTful API Design</li>
                                <li>Continuous Integration/Deployment</li>
                                <li>Test-Driven Development</li>
                                <li>Serverless Computing</li>
                                <li>Infrastructure as Code</li>
                                <li>Version Control Systems</li>
                                <li>Agile/Scrum Methodologies</li>
                              </ul>
                            </div>
                            <div className="space-y-2 rounded-lg border p-4">
                              <h4 className="text-sm font-medium">Business Impact Terms:</h4>
                              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                <li>Scalability</li>
                                <li>Performance Optimization</li>
                                <li>User Engagement</li>
                                <li>Conversion Rates</li>
                                <li>System Reliability</li>
                                <li>Technical Debt Reduction</li>
                                <li>Time-to-Market</li>
                                <li>Cost Efficiency</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Application Example:</h3>
                          <div className="rounded-md bg-muted p-4">
                            <p className="text-sm italic">
                              "Implemented caching strategies that improved API response times by 40%"
                            </p>
                          </div>
                          <div className="rounded-md bg-teal-50 p-4 dark:bg-teal-950/30">
                            <p className="text-sm italic text-teal-700 dark:text-teal-300">
                              "Architected and implemented Redis-based caching strategies within a microservices
                              environment, reducing API response times by 40% and improving system scalability to handle
                              3x the previous user load"
                            </p>
                          </div>
                          <div className="space-y-2 pt-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Added specific technology (Redis) and architecture context (microservices)
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <p className="text-sm text-muted-foreground">
                                Included business impact terms (scalability) with quantifiable metrics
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Job Description Matching</CardTitle>
                      <CardDescription>Tailoring your resume to specific opportunities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md bg-muted p-4">
                          <h3 className="text-sm font-medium">Sample Job Description Keywords:</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            React, TypeScript, Node.js, AWS, CI/CD, microservices, REST APIs, GraphQL, agile
                            development, unit testing, performance optimization, cloud infrastructure, containerization
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Tailoring Recommendations:</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <div>
                                <p className="text-sm font-medium">Create a master resume with all your experience</p>
                                <p className="text-sm text-muted-foreground">
                                  Maintain a comprehensive document with all your skills and experiences
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <div>
                                <p className="text-sm font-medium">Analyze each job description</p>
                                <p className="text-sm text-muted-foreground">
                                  Identify key requirements, skills, and terminology used in the posting
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <div>
                                <p className="text-sm font-medium">Customize your resume for each application</p>
                                <p className="text-sm text-muted-foreground">
                                  Prioritize experiences and skills that match the specific job requirements
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <div>
                                <p className="text-sm font-medium">Mirror the language used in the job posting</p>
                                <p className="text-sm text-muted-foreground">
                                  Use the same terminology and phrasing when describing your relevant experience
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950/30">
                          <div className="flex items-center gap-2">
                            <Info className="h-5 w-5 text-amber-500" />
                            <p className="font-medium text-amber-700 dark:text-amber-300">Pro Tip</p>
                          </div>
                          <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                            Many companies use ATS systems that score resumes based on keyword matching. Tailoring your
                            resume to include relevant keywords from the job description can significantly increase your
                            chances of getting past the initial screening.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">File Name</span>
                      <span className="text-sm">Software_Engineer_Resume_v3.pdf</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uploaded</span>
                      <span className="text-sm">Oct 12, 2023</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Size</span>
                      <span className="text-sm">245 KB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pages</span>
                      <span className="text-sm">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Word Count</span>
                      <span className="text-sm">642</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Industry Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Target Industry</h3>
                      <p className="text-sm text-muted-foreground">Software Development</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Average Resume Score</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">72/100</span>
                        <Badge className="bg-teal-500">+6</Badge>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Top Skills in Demand</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="secondary">Node.js</Badge>
                        <Badge variant="secondary">AWS</Badge>
                        <Badge variant="secondary">CI/CD</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm font-medium text-teal-500 hover:underline"
                    >
                      <FileText className="h-4 w-4" />
                      Software Engineer Resume Guide
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm font-medium text-teal-500 hover:underline"
                    >
                      <FileText className="h-4 w-4" />
                      ATS Optimization Tips
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm font-medium text-teal-500 hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Industry Keyword Database
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm font-medium text-teal-500 hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Resume Templates
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Get personalized assistance from our resume experts to further improve your resume.
                    </p>
                    <Button className="w-full bg-teal-500 hover:bg-teal-600">Schedule Consultation</Button>
                  </div>
                </CardContent>
              </Card>
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
