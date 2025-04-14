import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image: string
  rating: number
}

export default function TestimonialCard({ quote, author, role, image, rating }: TestimonialCardProps) {
  return (
    <div className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm bg-background">
      <div className="flex-1">
        <div className="flex mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
            />
          ))}
        </div>
        <p className="text-muted-foreground italic">"{quote}"</p>
      </div>
      <div className="flex items-center space-x-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={author}
          width={40}
          height={40}
          className="rounded-full border border-muted"
        />
        <div>
          <p className="text-sm font-medium">{author}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  )
}
