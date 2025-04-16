"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authApi } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useCsrf } from "@/components/csrf-provider"

// Update the User interface to match the API response structure
interface User {
    pk?: number // Add pk field from API
    id?: string // Keep id for backward compatibility
    username: string
    email?: string
    first_name?: string
    last_name?: string
    name?: string // Keep name for backward compatibility
  }

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { csrfToken, loading: csrfLoading } = useCsrf()

  // Check authentication status on mount and when CSRF token changes
  useEffect(() => {
    // Don't check auth until CSRF is ready
    if (csrfLoading) return

    const checkAuth = async () => {
        try {
          setIsLoading(true)
          const response = await authApi.checkAuth()
          console.log("Auth check response:", response) // Debug log
  
          setIsAuthenticated(response.isAuthenticated)
  
          // If we have user data, set it
          if (response.user) {
            console.log("User data from API:", response.user) // Debug log
            setUser(response.user)
          } else {
            setUser(null)
          }
        } catch (err) {
          console.error("Auth check failed:", err)
          setIsAuthenticated(false)
          setUser(null)
        } finally {
          setIsLoading(false)
        }
      }

    checkAuth()
  }, [csrfLoading, csrfToken])

  // Login function
  const login = async (username: string, password: string) => {
    setError(null)
    setIsLoading(true)

    try {
      await authApi.login(username, password)

      // After successful login, fetch user data
      const { user } = await authApi.checkAuth()
      setUser(user)
      setIsAuthenticated(true)

      // Redirect to profile page after successful login
      router.push("/profile")
    } catch (err) {
      console.error("Login failed:", err)
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)

    try {
      await authApi.logout()
      setUser(null)
      setIsAuthenticated(false)

      // Redirect to home page after logout
      router.push("/")
    } catch (err) {
      console.error("Logout failed:", err)
      setError(err instanceof Error ? err.message : "Logout failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
