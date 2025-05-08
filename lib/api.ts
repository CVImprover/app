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
    try {
      const response = await fetchApi<{ success: boolean; message?: string }>("/auth/registration/", {
        method: "POST",
        body: JSON.stringify({ username, email, password1: password, password2: password }),
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // Logout function
  logout: async () => {
    return fetchApi<{ success: boolean }>("/auth/logout/", {
      method: "POST",
      // Empty body but still need to send the CSRF token
      body: JSON.stringify({}),
    })
  },

  // Check if user is authenticated
  checkAuth: async () => {
    try {
      const userData = await fetchApi<any>("/auth/user/", {
        method: "GET",
      })

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

  // Password change function
  changePassword: async (newPassword1: string, newPassword2: string) => {
    try {
      // Now attempt to change the password
      return fetchApi<{ detail: string }>("/auth/password/change/", {
        method: "POST",
        body: JSON.stringify({ new_password1: newPassword1, new_password2: newPassword2 }),
      })
    } catch (error) {
      console.error("Failed to change password:", error)
      throw error
    }
  },
}

export const userApi = {
  // Get user profile data
  getProfile: async () => {
    try {
      return await fetchApi<any>("/auth/user/", {
        method: "GET",
      })
    } catch (error) {
      console.error("Failed to fetch profile:", error)
      throw error
    }
  },

  // Update user profile data
  updateProfile: async (userData) => {
    try {
      await fetch(getApiUrl("/auth/csrf-token/"), {
        method: "GET",
        credentials: "include",
      })

      return await fetchApi<any>("/auth/user/", {
        method: "PATCH",
        body: JSON.stringify(userData),
      })
    } catch (error) {
      console.error("Failed to update profile:", error)
      throw error
    }
  },
}

// Resume API functions
export const resumeApi = {
  // Submit questionnaire data and resume file
  submitQuestionnaire: async (resumeId: string, questionnaireData: any, resumeFile: File | null) => {
    try {
      if (!resumeFile) {
        throw new Error("No resume file provided")
      }

      // Create FormData object to send both the file and questionnaire data
      const formData = new FormData()

      // Add the resume file
      formData.append("resume", resumeFile)

      // Add each field individually to match the API schema
      formData.append("position", questionnaireData.jobTitle)
      formData.append("industry", questionnaireData.industry)
      formData.append("experience_level", mapExperienceLevel(questionnaireData.experienceLevel))
      formData.append("company_size", questionnaireData.targetCompanySize)
      formData.append("location", questionnaireData.targetLocation || "")
      formData.append("application_timeline", mapTimeframe(questionnaireData.timeframe))
      formData.append("job_description", questionnaireData.specificJobDescription || "")

      console.log("Submitting form data to API:", {
        position: questionnaireData.jobTitle,
        industry: questionnaireData.industry,
        experience_level: mapExperienceLevel(questionnaireData.experienceLevel),
        company_size: questionnaireData.targetCompanySize,
        location: questionnaireData.targetLocation || "",
        application_timeline: mapTimeframe(questionnaireData.timeframe),
        job_description: questionnaireData.specificJobDescription || "",
        resume: resumeFile.name,
      })

      // For FormData, we need to remove the Content-Type header
      // so the browser can set it with the correct boundary
      const response = await fetch(getApiUrl("/api/questionnaire/"), {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          // Don't set Content-Type here, let the browser handle it
          "X-CSRFToken": getCsrfToken() || "",
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API error response:", errorText)

        try {
          // Try to parse as JSON if possible
          const errorData = JSON.parse(errorText)
          throw errorData
        } catch (e) {
          // If not JSON, throw the text
          throw new Error(`API error (${response.status}): ${errorText}`)
        }
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to submit questionnaire and file:", error)
      throw error
    }
  },
}

// Helper functions to map form values to expected schema values
function mapExperienceLevel(level: string): string {
  switch (level) {
    case "entry-level":
      return "0-2"
    case "mid-level":
      return "3-5"
    case "senior-level":
      return "6+"
    default:
      return "0-2"
  }
}

function mapTimeframe(timeframe: string): string {
  switch (timeframe) {
    case "immediately":
      return "immediate"
    case "1-3 months":
      return "1-3 months"
    case "3-6 months":
      return "3-6 months"
    case "6+ months":
      return "6+ months"
    default:
      return "immediate"
  }
}
