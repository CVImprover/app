import { Loader2 } from 'lucide-react'

interface LoadingScreenProps {
  /**
   * Optional message to display below the spinner
   */
  message?: string
  /**
   * Size of the spinner in pixels (default: 32)
   */
  size?: number
  /**
   * Whether to take up the full screen height (default: true)
   */
  fullScreen?: boolean
  /**
   * Optional additional className for the container
   */
  className?: string
}

export default function LoadingScreen({
  message = "Loading...",
  size = 32,
  fullScreen = true,
  className = "",
}: LoadingScreenProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "min-h-[200px]"
      } ${className}`}
    >
      <Loader2 className={`h-${size / 4} w-${size / 4} animate-spin text-teal-500`} style={{ height: size, width: size }} />
      {message && <p className="mt-4 text-muted-foreground">{message}</p>}
    </div>
  )
}
