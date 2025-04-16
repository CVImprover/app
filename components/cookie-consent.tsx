"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"

// Cookie types and their default states
const COOKIE_TYPES = {
  necessary: { name: "Necessary", enabled: true, required: true },
  functional: { name: "Functional", enabled: false, required: false },
  analytics: { name: "Analytics", enabled: false, required: false },
  marketing: { name: "Marketing", enabled: false, required: false },
}

type CookiePreferences = {
  [key in keyof typeof COOKIE_TYPES]: boolean
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  // Check if user has already made a choice
  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent")
    if (!consentGiven) {
      setShowBanner(true)
    }
  }, [])

  // Save preferences to localStorage
  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookieConsent", "true")
    localStorage.setItem("cookiePreferences", JSON.stringify(prefs))
    setShowBanner(false)
    setOpen(false)
  }

  // Accept all cookies
  const acceptAll = () => {
    const allEnabled = Object.keys(COOKIE_TYPES).reduce((acc, key) => {
      acc[key as keyof typeof COOKIE_TYPES] = true
      return acc
    }, {} as CookiePreferences)

    savePreferences(allEnabled)
  }

  // Reject all optional cookies
  const rejectAll = () => {
    const essentialOnly = Object.keys(COOKIE_TYPES).reduce((acc, key) => {
      // Only set required cookies to true
      acc[key as keyof typeof COOKIE_TYPES] = COOKIE_TYPES[key as keyof typeof COOKIE_TYPES].required
      return acc
    }, {} as CookiePreferences)

    savePreferences(essentialOnly)
  }

  // Save current preferences
  const saveCurrentPreferences = () => {
    savePreferences(preferences)
  }

  // Toggle a specific cookie type
  const toggleCookieType = (type: keyof typeof COOKIE_TYPES) => {
    if (COOKIE_TYPES[type].required) return // Can't toggle required cookies

    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  // Open preferences dialog
  const openPreferences = () => {
    setOpen(true)
  }

  if (!showBanner) {
    return null
  }

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-4 right-4 z-50 max-w-md w-full md:w-[400px] bg-background rounded-lg border shadow-lg animate-in fade-in slide-in-from-bottom-10 duration-500">
        <div className="p-4 md:p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">We value your privacy</h3>
              <p className="text-sm text-muted-foreground mt-2">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
                traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button variant="outline" onClick={openPreferences} className="flex-1">
                Customize
              </Button>
              <Button variant="outline" onClick={rejectAll} className="flex-1">
                Reject All
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600 flex-1" onClick={acceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Customize which cookies you want to accept. Necessary cookies help make the website usable and cannot be
              disabled.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(COOKIE_TYPES).map(([key, { name, required }]) => (
                <AccordionItem key={key} value={key}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <AccordionTrigger className="py-0 [&>svg]:h-4 [&>svg]:w-4">
                        <span className="font-medium">{name} Cookies</span>
                        {required && <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded">Required</span>}
                      </AccordionTrigger>
                    </div>
                    <Switch
                      checked={preferences[key as keyof typeof COOKIE_TYPES]}
                      onCheckedChange={() => toggleCookieType(key as keyof typeof COOKIE_TYPES)}
                      disabled={required}
                      className="mr-4"
                    />
                  </div>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {key === "necessary" &&
                      "Necessary cookies are essential for the website to function properly. These cookies ensure basic functionalities and security features of the website."}
                    {key === "functional" &&
                      "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features."}
                    {key === "analytics" &&
                      "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc."}
                    {key === "marketing" &&
                      "Marketing cookies are used to provide visitors with relevant ads and marketing campaigns. These cookies track visitors across websites and collect information to provide customized ads."}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600" onClick={saveCurrentPreferences}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
