// API configuration and utility functions

// Get the API URL from environment variables
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Function to get CSRF token from cookies
function getCsrfToken(): string | null {
  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=")
    if (name === "csrftoken") {
      return value
    }
  }
  return null
}

// Function to build API URLs
export function getApiUrl(path: string): string {
  return `${API_URL}${path}`
}

// Generic fetch function that includes credentials for cookies
export async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
  // Always include credentials to ensure cookies are sent
  const fetchOptions: RequestInit = {
    ...options,
    credentials: "include", // This is crucial for cookies to be sent
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  }

  // Add CSRF token for non-GET requests
  if (options.method && ["POST", "PUT", "PATCH", "DELETE"].includes(options.method)) {
    const csrfToken = getCsrfToken()
    if (csrfToken) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        "X-CSRFToken": csrfToken,
      }
    }
  }

  const response = await fetch(getApiUrl(url), fetchOptions)

  // If the response is not ok, throw an error
  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json()
      console.log("Error data from API:", errorData) // Debug log

      // Check if the error response contains field-specific validation errors
      if (typeof errorData === "object" && errorData !== null) {
        // Just throw the error data object directly
        throw errorData
      } else {
        // Otherwise use the detail or message field
        throw new Error(errorData.detail || errorData.message || `API error: ${response.status}`)
      }
    } catch (e) {
      // If the error is already an object (not an Error instance), throw it directly
      if (e && typeof e === "object" && !(e instanceof Error)) {
        throw e
      }
      // If we can't parse the JSON or it's already an Error object, just throw it
      throw e instanceof Error ? e : new Error(`API error: ${response.status}`)
    }
  }

  // For 204 No Content responses, return null
  if (response.status === 204) {
    return null as T
  }

  // Otherwise parse the JSON response
  return response.json()
}

// Authentication API functions
export const authApi = {
  // Get CSRF token - this is a special endpoint that just returns a new CSRF token
  // You may need to create this endpoint in your Django backend
  getCsrfToken: async () => {
    return fetchApi<{ csrfToken: string }>("/auth/csrf-token/", {
      method: "GET",
    })
  },

  // Login function
  login: async (username: string, password: string) => {
    // First, ensure we have a CSRF token
    try {
      // You might need to make a GET request to your login page first to get a CSRF token
      await fetch(getApiUrl("/auth/csrf-token/"), {
        method: "GET",
        credentials: "include",
      })
    } catch (error) {
      console.error("Failed to get CSRF token:", error)
    }

    // Now attempt login with the CSRF token that should be in cookies
    return fetchApi<{ success: boolean; message?: string }>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
  },

  // Register function
  register: async (username: string, email: string, password: string) => {
    return fetchApi<{ success: boolean }>("/auth/registration/", {
      method: "POST",
      body: JSON.stringify({ username, email, password1: password, password2: password }),
    })
  },

  // Update the logout function in the API to ensure proper cleanup
  logout: async () => {
    try {
      const result = await fetchApi<{ success: boolean }>("/auth/logout/", {
        method: "POST",
        // Empty body but still need to send the CSRF token
        body: JSON.stringify({}),
      })

      // Broadcast logout event to other tabs
      localStorage.setItem("logout", Date.now().toString())
      // Remove the item immediately to allow future logout events
      localStorage.removeItem("logout")

      return result
    } catch (error) {
      console.error("Logout API error:", error)
      throw error
    }
  },

  // Check if user is authenticated
  checkAuth: async () => {
    try {
      const userData = await fetchApi<any>("/auth/user/", {
        method: "GET",
      })

      console.log("Raw user data from API:", userData) // Debug log

      // If we get a response with a username, the user is authenticated
      const isAuthenticated = !!(userData && userData.username)

      return {
        isAuthenticated,
        user: isAuthenticated ? userData : null,
      }
    } catch (error) {
      console.error("Error checking auth:", error)
      return { isAuthenticated: false, user: null }
    }
  },
}
