"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, Download, FileText, Info, Plus, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [currentPlan, setCurrentPlan] = useState<"free" | "pro" | "enterprise">("pro")

  const handleUpgrade = (plan: "free" | "pro" | "enterprise") => {
    if (plan === currentPlan) {
      toast({
        title: "Already subscribed",
        description: `You are already subscribed to the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.`,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      })
      return
    }

    // Simulate upgrading
    setCurrentPlan(plan)
    toast({
      title: "Subscription updated",
      description: `You have successfully switched to the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.`,
      action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
    })
  }

  const handleCancelSubscription = () => {
    // Simulate cancellation confirmation
    if (
      confirm(
        "Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.",
      )
    ) {
      toast({
        title: "Subscription cancelled",
        description: "Your subscription has been cancelled. You will have access until the end of your billing period.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/profile" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Profile</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex gap-2">
              <Download className="h-4 w-4" />
              Billing History
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 md:py-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-[350px] -left-[100px] w-[600px] h-[600px] rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-900/20"></div>
          <div className="absolute top-[30%] -right-[150px] w-[600px] h-[600px] rounded-full bg-teal-100/20 blur-3xl dark:bg-teal-900/10"></div>
        </div>

        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
            <p className="text-muted-foreground">Manage your subscription plan and billing information</p>
          </div>

          <Tabs defaultValue="plans" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Current Subscription Status */}
            <div className="bg-muted/50 border rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">Current Plan: Pro</h2>
                  <Badge className="bg-teal-500">Active</Badge>
                </div>
                <p className="text-muted-foreground mt-1">Your subscription renews on November 1, 2023</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none" onClick={handleCancelSubscription}>
                  Cancel
                </Button>
                <Button className="flex-1 md:flex-none bg-teal-500 hover:bg-teal-600">Manage Payment</Button>
              </div>
            </div>

            {/* Plans Tab */}
            <TabsContent value="plans" className="space-y-6">
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center rounded-full border p-1 bg-muted/50">
                  <Button
                    variant={billingCycle === "monthly" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setBillingCycle("monthly")}
                    className={billingCycle === "monthly" ? "bg-teal-500 hover:bg-teal-600" : ""}
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={billingCycle === "yearly" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setBillingCycle("yearly")}
                    className={billingCycle === "yearly" ? "bg-teal-500 hover:bg-teal-600" : ""}
                  >
                    Yearly
                    <Badge
                      variant="outline"
                      className="ml-2 bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-0"
                    >
                      Save 20%
                    </Badge>
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Free Plan */}
                <Card className={`border ${currentPlan === "free" ? "border-teal-500 dark:border-teal-700" : ""}`}>
                  <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <CardDescription>Basic resume analysis</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$0</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>1 resume analysis per month</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Basic ATS compatibility check</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Limited keyword suggestions</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>Detailed content improvement</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>Industry-specific insights</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>Resume history & versions</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={currentPlan === "free" ? "outline" : "default"}
                      className={`w-full ${currentPlan === "free" ? "" : "bg-teal-500 hover:bg-teal-600"}`}
                      onClick={() => handleUpgrade("free")}
                    >
                      {currentPlan === "free" ? "Current Plan" : "Downgrade"}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card
                  className={`border relative ${currentPlan === "pro" ? "border-teal-500 dark:border-teal-700" : ""}`}
                >
                  {/* Popular badge */}
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <Badge className="bg-teal-500">Popular</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>Advanced resume optimization</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">${billingCycle === "monthly" ? "19.99" : "15.99"}</span>
                      <span className="text-muted-foreground">
                        /{billingCycle === "monthly" ? "month" : "month, billed yearly"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Unlimited resume analyses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Advanced ATS compatibility check</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Comprehensive keyword optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Detailed content improvement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Industry-specific insights</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>Priority support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={currentPlan === "pro" ? "outline" : "default"}
                      className={`w-full ${currentPlan === "pro" ? "" : "bg-teal-500 hover:bg-teal-600"}`}
                      onClick={() => handleUpgrade("pro")}
                    >
                      {currentPlan === "pro" ? "Current Plan" : currentPlan === "enterprise" ? "Downgrade" : "Upgrade"}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Enterprise Plan */}
                <Card
                  className={`border ${currentPlan === "enterprise" ? "border-teal-500 dark:border-teal-700" : ""}`}
                >
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <CardDescription>Complete career solution</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">${billingCycle === "monthly" ? "39.99" : "31.99"}</span>
                      <span className="text-muted-foreground">
                        /{billingCycle === "monthly" ? "month" : "month, billed yearly"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Everything in Pro plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Cover letter analysis & optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>LinkedIn profile optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>1-on-1 expert consultation (30 min)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Job application tracking</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={currentPlan === "enterprise" ? "outline" : "default"}
                      className={`w-full ${currentPlan === "enterprise" ? "" : "bg-teal-500 hover:bg-teal-600"}`}
                      onClick={() => handleUpgrade("enterprise")}
                    >
                      {currentPlan === "enterprise" ? "Current Plan" : "Upgrade"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3 mt-4">
                <Info className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Need a custom plan for your team?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer special pricing for teams and organizations. Contact our sales team for a custom quote.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-teal-500 mt-2">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup defaultValue="card1">
                    <div className="flex items-center justify-between space-x-2 border rounded-md p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card1" id="card1" />
                        <Label htmlFor="card1" className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Visa ending in 4242</div>
                            <div className="text-sm text-muted-foreground">Expires 04/2025</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Default</Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-2 border rounded-md p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card2" id="card2" />
                        <Label htmlFor="card2" className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Mastercard ending in 5678</div>
                            <div className="text-sm text-muted-foreground">Expires 08/2024</div>
                          </div>
                        </Label>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </RadioGroup>
                  <Button variant="outline" className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your billing details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Billing Contact</div>
                    <div className="text-sm">John Doe</div>
                    <div className="text-sm">john.doe@example.com</div>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Billing Address</div>
                    <div className="text-sm">123 Main Street</div>
                    <div className="text-sm">Apt 4B</div>
                    <div className="text-sm">New York, NY 10001</div>
                    <div className="text-sm">United States</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Billing Information
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Preferences</CardTitle>
                  <CardDescription>Manage your billing settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Receipts</div>
                      <div className="text-sm text-muted-foreground">Receive receipts via email</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Payment Reminders</div>
                      <div className="text-sm text-muted-foreground">Receive payment reminders</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View your past invoices and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-2">
                        <div>
                          <div className="font-medium">Pro Plan - Monthly</div>
                          <div className="text-sm text-muted-foreground">October 1, 2023</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-green-500">Paid</Badge>
                          <div className="font-medium">$19.99</div>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Invoice</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-2">
                        <div>
                          <div className="font-medium">Pro Plan - Monthly</div>
                          <div className="text-sm text-muted-foreground">September 1, 2023</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-green-500">Paid</Badge>
                          <div className="font-medium">$19.99</div>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Invoice</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-2">
                        <div>
                          <div className="font-medium">Pro Plan - Monthly</div>
                          <div className="text-sm text-muted-foreground">August 1, 2023</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-green-500">Paid</Badge>
                          <div className="font-medium">$19.99</div>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Invoice</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-2">
                        <div>
                          <div className="font-medium">Pro Plan - Monthly</div>
                          <div className="text-sm text-muted-foreground">July 1, 2023</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-green-500">Paid</Badge>
                          <div className="font-medium">$19.99</div>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Invoice</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download All Invoices
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription History</CardTitle>
                  <CardDescription>View your subscription changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 rounded-full bg-teal-100 p-1.5 dark:bg-teal-900/30">
                        <Star className="h-4 w-4 text-teal-500" />
                      </div>
                      <div>
                        <div className="font-medium">Upgraded to Pro Plan</div>
                        <div className="text-sm text-muted-foreground">July 1, 2023</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 rounded-full bg-teal-100 p-1.5 dark:bg-teal-900/30">
                        <Star className="h-4 w-4 text-teal-500" />
                      </div>
                      <div>
                        <div className="font-medium">Started Free Trial</div>
                        <div className="text-sm text-muted-foreground">June 15, 2023</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 rounded-full bg-teal-100 p-1.5 dark:bg-teal-900/30">
                        <Star className="h-4 w-4 text-teal-500" />
                      </div>
                      <div>
                        <div className="font-medium">Account Created</div>
                        <div className="text-sm text-muted-foreground">June 15, 2023</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} ResumeRise. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-teal-500">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-teal-500">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-teal-500">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
