"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileUp, Upload, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import UploadContextForm from "@/components/upload-context-form"

export default function UploadSection() {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "context" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [resumeId, setResumeId] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please select a smaller file.")
        return
      }

      // Check file type
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please select a PDF, DOCX, or TXT file.")
        return
      }

      setSelectedFile(file)
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleProceedToQuestions = () => {
    if (!selectedFile) {
      alert("Please select a file first")
      return
    }

    // Simulate a brief loading state
    setUploadState("uploading")
    setProgress(0)

    // Simulate progress for a better UX
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Generate a temporary ID for the resume
          const tempId = Math.random().toString(36).substring(2, 10)
          setResumeId(tempId)
          setUploadState("context")
          return 100
        }
        return prev + 20
      })
    }, 200)
  }

  const handleContextComplete = () => {
    setUploadState("success")
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please select a smaller file.")
        return
      }

      // Check file type
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please select a PDF, DOCX, or TXT file.")
        return
      }

      setSelectedFile(file)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        {uploadState === "idle" && (
          <div
            className="flex flex-col items-center justify-center space-y-4 py-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="rounded-full bg-teal-100 p-4 dark:bg-teal-900/30">
              <FileUp className="h-10 w-10 text-teal-500" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Upload your resume</h3>
              <p className="text-sm text-muted-foreground">Drag and drop your file here, or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports PDF, DOCX, and TXT (Max 5MB)</p>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={handleFileChange}
            />

            {selectedFile ? (
              <div className="space-y-4 w-full max-w-md">
                <div className="flex items-center justify-between p-3 bg-teal-50 dark:bg-teal-900/20 rounded-md">
                  <div className="flex items-center">
                    <FileUp className="h-5 w-5 text-teal-500 mr-2" />
                    <span className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <Button onClick={handleProceedToQuestions} className="w-full bg-teal-500 hover:bg-teal-600">
                  <Upload className="mr-2 h-4 w-4" />
                  Continue to Questions
                </Button>
              </div>
            ) : (
              <Button onClick={handleUploadClick} className="bg-teal-500 hover:bg-teal-600">
                <Upload className="mr-2 h-4 w-4" />
                Select File
              </Button>
            )}
          </div>
        )}

        {uploadState === "uploading" && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Processing {selectedFile?.name}...</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                Please wait while we prepare your resume for analysis
              </p>
            </div>
          </div>
        )}

        {uploadState === "context" && (
          <div className="py-6">
            <UploadContextForm resumeId={resumeId} resumeFile={selectedFile} onComplete={handleContextComplete} />
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
              <Button
                variant="outline"
                onClick={() => {
                  setUploadState("idle")
                  setSelectedFile(null)
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                  }
                }}
              >
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
            <Button
              variant="outline"
              onClick={() => {
                setUploadState("idle")
                setSelectedFile(null)
                if (fileInputRef.current) {
                  fileInputRef.current.value = ""
                }
              }}
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
