import { FileText, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ResumeHistoryItemProps {
  title: string
  date: string
  score: number
  status: "Active" | "Archived"
}

export default function ResumeHistoryItem({ title, date, score, status }: ResumeHistoryItemProps) {
  return (
    <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-muted p-2">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground">Uploaded: {date}</p>
            <span className="text-xs text-muted-foreground">•</span>
            <div className={`text-xs ${status === "Active" ? "text-teal-500" : "text-muted-foreground"}`}>{status}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:block w-32 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Score</span>
            <span className="text-xs font-medium">{score}/100</span>
          </div>
          <Progress value={score} className="h-1.5" />
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
