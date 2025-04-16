"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { API_URL, authApi } from "@/lib/api"

// Update the CsrfContext to include isAuthenticated
interface CsrfContextType {
  csrfToken: string | null
  loading: boolean
  isAuthenticated: boolean
}

const CsrfContext = createContext<CsrfContextType>({
  csrfToken: null,
  loading: true,
  isAuthenticated: false,
})

export function CsrfProvider({ children }: { children: ReactNode }) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Function to get CSRF token and check authentication
    const fetchCsrfToken = async () => {
      try {
        // Make a GET request to an endpoint that sets the CSRF cookie
        await fetch(`${API_URL}/auth/csrf-token/`, {
          method: "GET",
          credentials: "include",
        })

        // Check if user is authenticated
        try {
          const authCheck = await authApi.checkAuth()
          setIsAuthenticated(authCheck.isAuthenticated)
        } catch (error) {
          console.error("Error checking authentication:", error)
          setIsAuthenticated(false)
        }

        // The CSRF token should now be in the cookies
        // We can extract it from cookies if needed
        const cookies = document.cookie.split(";")
        for (const cookie of cookies) {
          const [name, value] = cookie.trim().split("=")
          if (name === "csrftoken") {
            setCsrfToken(value)
            break
          }
        }
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCsrfToken()
  }, [])

  return <CsrfContext.Provider value={{ csrfToken, loading, isAuthenticated }}>{children}</CsrfContext.Provider>
}

export function useCsrf() {
  return useContext(CsrfContext)
}
