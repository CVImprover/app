import Link from "next/link"
import { FileUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <FileUp className="h-5 w-5 text-teal-500" />
          <p className="text-sm font-medium">© {new Date().getFullYear()} ResumeRise. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-teal-500">
            Terms
          </Link>
          <Link href="/privacy-security" className="text-sm font-medium text-muted-foreground hover:text-teal-500">
            Privacy
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-teal-500">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
