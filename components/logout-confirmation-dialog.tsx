"use client"

import { useState } from "react"
import { AlertTriangle, LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface LogoutConfirmationDialogProps {
  /**
   * Controls whether the dialog is open
   */
  open: boolean
  /**
   * Callback function when the dialog open state changes
   */
  onOpenChange: (open: boolean) => void
  /**
   * Callback function when the user confirms logout
   */
  onConfirm: () => Promise<void>
  /**
   * Optional title for the dialog
   */
  title?: string
  /**
   * Optional description for the dialog
   */
  description?: string
}

export default function LogoutConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Confirm Logout",
  description = "Are you sure you want to log out? You'll need to sign in again to access your account.",
}: LogoutConfirmationDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleConfirm = async () => {
    try {
      setIsLoading(true)
      console.log("Logout confirmation: starting logout process")
      await onConfirm()
      console.log("Logout confirmation: logout successful")

      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      })
    } catch (error) {
      console.error("Logout confirmation: Error during logout:", error)
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isLoading} className="gap-2">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4" />
                Log out
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
