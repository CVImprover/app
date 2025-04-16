"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { API_URL } from "@/lib/api"

interface CsrfContextType {
  csrfToken: string | null
  loading: boolean
}

const CsrfContext = createContext<CsrfContextType>({
  csrfToken: null,
  loading: true,
})

export function CsrfProvider({ children }: { children: ReactNode }) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Function to get CSRF token
    const fetchCsrfToken = async () => {
      try {
        // Make a GET request to an endpoint that sets the CSRF cookie
        await fetch(`${API_URL}/auth/csrf-token/`, {
          method: "GET",
          credentials: "include",
        })

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

  return <CsrfContext.Provider value={{ csrfToken, loading }}>{children}</CsrfContext.Provider>
}

export function useCsrf() {
  return useContext(CsrfContext)
}
