import Link from "next/link"
import { FileUp, ArrowRight, ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Footer from "@/components/footer"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <FileUp className="h-6 w-6 text-teal-500" />
              <span className="text-xl font-bold">ResumeRise</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-[350px] -left-[100px] w-[600px] h-[600px] rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-900/20"></div>
          <div className="absolute top-[30%] -right-[150px] w-[600px] h-[600px] rounded-full bg-teal-100/20 blur-3xl dark:bg-teal-900/10"></div>
        </div>

        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-md space-y-6 relative">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Reset Your Password</h1>
              <p className="text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>

              <Button className="w-full bg-teal-500 hover:bg-teal-600 group">
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <div className="text-center text-sm">
                <Link href="/sign-in" className="text-teal-500 hover:underline inline-flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Link>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center gap-3 border border-teal-100 dark:border-slate-700">
              <div className="bg-teal-500 rounded-full p-2 text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">Check Your Email</div>
                <div className="text-xs text-muted-foreground">We'll send a reset link</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
