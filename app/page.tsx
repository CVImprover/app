import Link from "next/link"
import Image from "next/image"
import { CheckCircle, BarChart, ArrowRight, ChevronRight, Star, FileUp, Users, Award, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import UploadSection from "@/components/upload-section"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Use the new Header component */}
      <Header showNav={true} showGetStarted={true} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-background"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-[500px] overflow-hidden">
            <div className="absolute -top-[350px] -left-[100px] w-[600px] h-[600px] rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-900/20"></div>
            <div className="absolute -top-[250px] left-[40%] w-[500px] h-[500px] rounded-full bg-teal-300/20 blur-3xl dark:bg-teal-800/20"></div>
            <div className="absolute top-[100px] -right-[150px] w-[600px] h-[600px] rounded-full bg-teal-100/20 blur-3xl dark:bg-teal-900/10"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-teal-200 bg-white px-3 py-1 text-sm text-teal-700 dark:border-teal-800 dark:bg-slate-900 dark:text-teal-400">
                  <span className="flex h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
                  AI-Powered Resume Analysis
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Elevate Your Resume to <span className="text-teal-500">New Heights</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Upload your CV and get instant, AI-powered feedback to make your resume stand out from the
                  competition.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#upload">
                    <Button size="lg" className="bg-teal-500 hover:bg-teal-600 group">
                      Analyze My Resume
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-teal-500" />
                    <span>Free Analysis</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-teal-500" />
                    <span>No Credit Card</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-teal-500" />
                    <span>Instant Results</span>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto lg:mr-0">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:bg-teal-900/30"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:bg-teal-800/30"></div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500 to-teal-400 opacity-20 blur-2xl transform -rotate-6 scale-105"></div>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=550&width=550"
                    alt="Resume analysis dashboard"
                    width={550}
                    height={550}
                    className="rounded-lg object-cover shadow-xl"
                    priority
                  />
                  <div className="absolute -right-6 -bottom-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center gap-3 border border-teal-100 dark:border-slate-700">
                    <div className="bg-teal-500 rounded-full p-2 text-white">
                      <Star className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Resume Score</div>
                      <div className="text-2xl font-bold">92/100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-6 lg:py-8 border-y bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2 relative group">
                <div className="absolute inset-0 bg-teal-100 dark:bg-teal-900/30 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <h3 className="text-3xl font-bold text-teal-500">98%</h3>
                <p className="text-sm text-muted-foreground">Improved Interview Rate</p>
              </div>
              <div className="space-y-2 relative group">
                <div className="absolute inset-0 bg-teal-100 dark:bg-teal-900/30 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <h3 className="text-3xl font-bold text-teal-500">24h</h3>
                <p className="text-sm text-muted-foreground">Faster Job Applications</p>
              </div>
              <div className="space-y-2 relative group">
                <div className="absolute inset-0 bg-teal-100 dark:bg-teal-900/30 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <h3 className="text-3xl font-bold text-teal-500">50K+</h3>
                <p className="text-sm text-muted-foreground">Resumes Improved</p>
              </div>
              <div className="space-y-2 relative group">
                <div className="absolute inset-0 bg-teal-100 dark:bg-teal-900/30 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <h3 className="text-3xl font-bold text-teal-500">4.9/5</h3>
                <p className="text-sm text-muted-foreground">User Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-teal-50 dark:from-background dark:to-slate-900"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-900/30 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to perfect your resume
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our AI-powered platform analyzes every aspect of your CV to help you land your dream job.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-teal-500" />}
                title="ATS Compatibility Check"
                description="Ensure your resume passes through Applicant Tracking Systems with our compatibility analysis."
              />
              <FeatureCard
                icon={<BarChart className="h-10 w-10 text-teal-500" />}
                title="Keyword Optimization"
                description="Get suggestions for industry-specific keywords to increase your chances of getting noticed."
              />
              <FeatureCard
                icon={<FileUp className="h-10 w-10 text-teal-500" />}
                title="Content Improvement"
                description="Receive detailed feedback on how to improve your resume's content, structure, and impact."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-background"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-900/30 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
                  Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How ResumeRise Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Three simple steps to transform your resume and boost your career prospects.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-teal-200 dark:bg-teal-900/50 hidden md:block"></div>

              <div className="flex flex-col items-center space-y-4 text-center relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30 relative z-10">
                  <span className="text-2xl font-bold text-teal-700 dark:text-teal-300">1</span>
                </div>
                <h3 className="text-xl font-bold">Upload Your CV</h3>
                <p className="text-muted-foreground">Simply upload your current resume in PDF, DOCX, or TXT format.</p>
                <div className="mt-4 flex justify-center">
                  <Link href="#upload">
                    <Button variant="ghost" size="sm" className="group text-teal-500 hover:text-teal-600">
                      Start Now
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30 relative z-10">
                  <span className="text-2xl font-bold text-teal-700 dark:text-teal-300">2</span>
                </div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your resume against industry standards and job requirements.
                </p>
                <div className="mt-4 flex justify-center">
                  <Button variant="ghost" size="sm" className="text-muted-foreground" disabled>
                    Automatic
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30 relative z-10">
                  <span className="text-2xl font-bold text-teal-700 dark:text-teal-300">3</span>
                </div>
                <h3 className="text-xl font-bold">Get Detailed Feedback</h3>
                <p className="text-muted-foreground">
                  Receive personalized suggestions to improve your resume and increase your chances of landing
                  interviews.
                </p>
                <div className="mt-4 flex justify-center">
                  <Link href="/analysis/demo">
                    <Button variant="ghost" size="sm" className="group text-teal-500 hover:text-teal-600">
                      See Example
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section id="upload" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-teal-50 dark:from-background dark:to-slate-900"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-900/30 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
                  Get Started
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Upload Your Resume Now</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Get instant feedback and start improving your job prospects today.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <UploadSection />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-background"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-900/30 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of professionals who have transformed their careers with ResumeRise.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="transform transition-all duration-200 hover:scale-105 hover:-rotate-1">
                <TestimonialCard
                  quote="After using ResumeRise, I received 3 interview calls in just one week. The suggestions were spot on!"
                  author="Sarah J."
                  role="Marketing Specialist"
                  image="/placeholder.svg?height=80&width=80"
                  rating={5}
                />
              </div>
              <div className="transform transition-all duration-200 hover:scale-105">
                <TestimonialCard
                  quote="The ATS compatibility check saved my application. I had no idea my resume wasn't being seen by recruiters."
                  author="Michael T."
                  role="Software Engineer"
                  image="/placeholder.svg?height=80&width=80"
                  rating={5}
                />
              </div>
              <div className="transform transition-all duration-200 hover:scale-105 hover:rotate-1">
                <TestimonialCard
                  quote="As a career changer, I needed help highlighting my transferable skills. ResumeRise made it so easy!"
                  author="Elena R."
                  role="Project Manager"
                  image="/placeholder.svg?height=80&width=80"
                  rating={4}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section (Replacing CTA) */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-teal-50 dark:from-background dark:to-slate-900"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-900/30 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
                  Success Stories
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">From Resume to Dream Job</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Real stories from professionals who landed their ideal positions after using ResumeRise
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Success Story 1 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
                <div className="h-3 bg-teal-500"></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">Tech Industry</h3>
                      <p className="text-sm text-muted-foreground">Senior Developer Position</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    "After 6 months of job searching with no callbacks, I used ResumeRise to optimize my resume. Within
                    2 weeks, I had 5 interviews and landed a senior role at a top tech company with a 30% salary
                    increase."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-medium">30% Salary Increase</span>
                    </div>
                    <Link href="#upload">
                      <Button variant="ghost" size="sm" className="text-teal-500 hover:text-teal-600 p-0">
                        Try It Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Success Story 2 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
                <div className="h-3 bg-teal-500"></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">Career Change</h3>
                      <p className="text-sm text-muted-foreground">Marketing to UX Design</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    "Changing careers seemed impossible until I used ResumeRise to highlight my transferable skills. The
                    AI helped me showcase relevant experience I didn't know I had. I'm now a UX designer at my dream
                    company."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-medium">Career Transition Success</span>
                    </div>
                    <Link href="#upload">
                      <Button variant="ghost" size="sm" className="text-teal-500 hover:text-teal-600 p-0">
                        Try It Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Success Story 3 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
                <div className="h-3 bg-teal-500"></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <FileUp className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">Recent Graduate</h3>
                      <p className="text-sm text-muted-foreground">First Professional Role</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    "With limited experience, I struggled to get interviews. ResumeRise helped me optimize my academic
                    projects and internships to showcase relevant skills. I received 3 job offers within a month!"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-medium">3 Job Offers</span>
                    </div>
                    <Link href="#upload">
                      <Button variant="ghost" size="sm" className="text-teal-500 hover:text-teal-600 p-0">
                        Try It Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="#upload">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                  Start Your Success Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <FileUp className="h-5 w-5 text-teal-500" />
            <p className="text-sm font-medium">© {new Date().getFullYear()} ResumeRise. All rights reserved.</p>
          </div>
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
