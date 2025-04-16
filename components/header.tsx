"use client"

import Link from "next/link"
import { FileUp, User, LogIn, UserPlus, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
// Import the new LogoutConfirmationDialog component
import LogoutConfirmationDialog from "@/components/logout-confirmation-dialog"

interface HeaderProps {
  showNav?: boolean
  showGetStarted?: boolean
}

export default function Header({ showNav = true, showGetStarted = true }: HeaderProps) {
  const { isAuthenticated, isLoading, logout, user } = useAuth()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  // Debug log
  console.log("Header - Auth state:", { isAuthenticated, isLoading, user })

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <FileUp className="h-6 w-6 text-teal-500" />
            <span className="text-xl font-bold">ResumeRise</span>
          </Link>
        </div>

        {showNav && (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-teal-500">
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-teal-500">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-teal-500">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-teal-500">
              Testimonials
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                      <User className="h-4 w-4" />
                      {user?.username || "Account"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile/edit" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setLogoutDialogOpen(true)}
                      className="cursor-pointer text-red-500 focus:text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}

              {showGetStarted && (
                <Link href="#upload">
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                    Get Started
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmationDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen} onConfirm={logout} />
    </header>
  )
}
