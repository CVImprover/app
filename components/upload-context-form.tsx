"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import AuthenticationModal from "@/components/authentication-modal"
import {
  Briefcase,
  Building2,
  GraduationCap,
  Users,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

interface UploadContextFormProps {
  resumeId: string
  onComplete: () => void
}

export default function UploadContextForm({ resumeId, onComplete }: UploadContextFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const [formData, setFormData] = useState({
    jobTitle: "",
    industry: "",
    experienceLevel: "mid-level",
    targetCompanySize: "any",
    targetLocation: "",
    timeframe: "1-3 months",
    specificJobDescription: "",
    additionalContext: "",
  })

  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (contentRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const offset = 80 // px from the top, adjust as needed
        const top = contentRef.current.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: "smooth" })
      }, 100)
    }
  }, [step])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      // Remove this line: window.scrollTo(0, 0)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      // Remove this line: window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    // In a real app, you would send the formData to your backend
    console.log("Form data submitted:", formData)

    // Check if the user is authenticated
    if (isAuthenticated) {
      // If authenticated, navigate to the analysis page
      router.push(`/analysis/${resumeId}`)
      onComplete()
    } else {
      // If not authenticated, show the authentication modal
      setShowAuthModal(true)
    }
  }

  const canProceed = () => {
    if (step === 1) {
      return formData.jobTitle.trim() !== "" && formData.industry.trim() !== ""
    }
    return true
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Help us tailor your resume analysis</CardTitle>
        <CardDescription>
          Provide details about your target job to receive more personalized recommendations
        </CardDescription>
        <Progress value={progress} className="h-2 mt-4" />
      </CardHeader>
      <CardContent ref={contentRef}>
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-teal-500" />
                <h3 className="text-lg font-medium">Target Position</h3>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">What position are you applying for?</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    value={formData.jobTitle}
                    onChange={(e) => handleChange("jobTitle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">What industry is this position in?</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Technology, Healthcare, Finance"
                    value={formData.industry}
                    onChange={(e) => handleChange("industry", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-teal-500" />
                <h3 className="text-lg font-medium">Experience Level</h3>
              </div>
              <div className="space-y-3">
                <Label>What experience level are you targeting?</Label>
                <RadioGroup
                  value={formData.experienceLevel}
                  onValueChange={(value) => handleChange("experienceLevel", value)}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                >
                  <div>
                    <RadioGroupItem value="entry-level" id="entry-level" className="peer sr-only" />
                    <Label
                      htmlFor="entry-level"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <span className="text-sm font-medium">Entry Level</span>
                      <span className="text-xs text-muted-foreground">0-2 years</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="mid-level" id="mid-level" className="peer sr-only" />
                    <Label
                      htmlFor="mid-level"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <span className="text-sm font-medium">Mid Level</span>
                      <span className="text-xs text-muted-foreground">3-5 years</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="senior-level" id="senior-level" className="peer sr-only" />
                    <Label
                      htmlFor="senior-level"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <span className="text-sm font-medium">Senior Level</span>
                      <span className="text-xs text-muted-foreground">6+ years</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-teal-500" />
                <h3 className="text-lg font-medium">Company Details</h3>
              </div>
              <div className="space-y-3">
                <Label>What size company are you targeting?</Label>
                <RadioGroup
                  value={formData.targetCompanySize}
                  onValueChange={(value) => handleChange("targetCompanySize", value)}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-4"
                >
                  <div>
                    <RadioGroupItem value="startup" id="startup" className="peer sr-only" />
                    <Label
                      htmlFor="startup"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <Users className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">Startup</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="small" id="small" className="peer sr-only" />
                    <Label
                      htmlFor="small"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <Users className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">Small</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                    <Label
                      htmlFor="medium"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <Users className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">Medium</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="enterprise" id="enterprise" className="peer sr-only" />
                    <Label
                      htmlFor="enterprise"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <Users className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">Enterprise</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-teal-500" />
                <h3 className="text-lg font-medium">Location & Timeframe</h3>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="targetLocation">Target Location (optional)</Label>
                  <Input
                    id="targetLocation"
                    placeholder="e.g., Remote, New York, London"
                    value={formData.targetLocation}
                    onChange={(e) => handleChange("targetLocation", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This helps us tailor location-specific keywords and formatting
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-teal-500" />
                <h3 className="text-lg font-medium">Job Search Timeframe</h3>
              </div>
              <div className="space-y-3">
                <Label>When are you planning to apply for jobs?</Label>
                <Select value={formData.timeframe} onValueChange={(value) => handleChange("timeframe", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="1-3 months">Within 1-3 months</SelectItem>
                    <SelectItem value="3-6 months">Within 3-6 months</SelectItem>
                    <SelectItem value="6+ months">6+ months from now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-teal-500" />
                <h3 className="text-lg font-medium">Specific Job Details</h3>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="specificJobDescription">Do you have a specific job description? (optional)</Label>
                  <Textarea
                    id="specificJobDescription"
                    placeholder="Paste the job description here for more targeted analysis"
                    className="min-h-[100px]"
                    value={formData.specificJobDescription}
                    onChange={(e) => handleChange("specificJobDescription", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={step === 1} className="w-[100px]">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="text-sm text-muted-foreground">
          Step {step} of {totalSteps}
        </div>
        <Button onClick={handleNext} disabled={!canProceed()} className="w-[100px] bg-teal-500 hover:bg-teal-600">
          {step === totalSteps ? (
            <>
              Finish
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false)
          onComplete()
        }}
        resumeId={resumeId}
      />
    </Card>
  )
}
