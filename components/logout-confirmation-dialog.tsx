"use client"

import { AlertTriangle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  onConfirm: () => void
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
