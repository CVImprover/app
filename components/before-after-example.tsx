"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function BeforeAfterExample() {
  const [view, setView] = useState<"before" | "after">("before")

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2">
        <Button
          variant={view === "before" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("before")}
          className={view === "before" ? "bg-teal-500 hover:bg-teal-600" : ""}
        >
          Before
        </Button>
        <Button
          variant={view === "after" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("after")}
          className={view === "after" ? "bg-teal-500 hover:bg-teal-600" : ""}
        >
          After
        </Button>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
        {view === "before" ? (
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Resume before formatting improvements"
            fill
            className="object-contain"
          />
        ) : (
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Resume after formatting improvements"
            fill
            className="object-contain"
          />
        )}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        {view === "before"
          ? "Dense paragraphs, inconsistent spacing, and cluttered layout make this resume difficult to scan"
          : "Clean bullet points, consistent spacing, and clear section headings make this resume easy to navigate"}
      </div>
    </div>
  )
}
