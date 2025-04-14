"use client"

import { useState } from "react"
import { FileUp, Upload, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import UploadContextForm from "@/components/upload-context-form"

export default function UploadSection() {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "context" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [resumeId, setResumeId] = useState("")

  const handleUpload = () => {
    setUploadState("uploading")
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Generate a random ID for the resume
          const id = Math.random().toString(36).substring(2, 10)
          setResumeId(id)
          setUploadState("context")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleContextComplete = () => {
    setUploadState("success")
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        {uploadState === "idle" && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="rounded-full bg-teal-100 p-4 dark:bg-teal-900/30">
              <FileUp className="h-10 w-10 text-teal-500" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Upload your resume</h3>
              <p className="text-sm text-muted-foreground">Drag and drop your file here, or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports PDF, DOCX, and TXT (Max 5MB)</p>
            </div>
            <Button onClick={handleUpload} className="bg-teal-500 hover:bg-teal-600">
              <Upload className="mr-2 h-4 w-4" />
              Select File
            </Button>
          </div>
        )}

        {uploadState === "uploading" && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                Please wait while we upload and analyze your resume
              </p>
            </div>
          </div>
        )}

        {uploadState === "context" && (
          <div className="py-6">
            <UploadContextForm resumeId={resumeId} onComplete={handleContextComplete} />
          </div>
        )}

        {uploadState === "success" && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/30">
              <Check className="h-10 w-10 text-green-500" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Analysis Complete!</h3>
              <p className="text-sm text-muted-foreground">
                Your resume has been successfully analyzed based on your target job
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                className="bg-teal-500 hover:bg-teal-600"
                onClick={() => (window.location.href = `/analysis/${resumeId}`)}
              >
                View Detailed Analysis
              </Button>
              <Button variant="outline" onClick={() => setUploadState("idle")}>
                Upload Another
              </Button>
            </div>
          </div>
        )}

        {uploadState === "error" && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/30">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Upload Failed</h3>
              <p className="text-sm text-muted-foreground">There was an error uploading your file. Please try again.</p>
            </div>
            <Button variant="outline" onClick={() => setUploadState("idle")}>
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
