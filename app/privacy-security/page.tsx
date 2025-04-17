import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Lock, Shield, Eye, FileText, Server, UserCog } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy & Security | CV Improver",
  description: "Learn about how we protect your data and privacy at CV Improver",
}

export default function PrivacySecurityPage() {
  return (
    <>
      <Header showNav={true} showGetStarted={false} />
      <div className="container max-w-4xl py-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Privacy & Security</h1>
          <p className="text-muted-foreground text-lg">
            At CV Improver, we take your privacy and the security of your data seriously. Learn about how we protect
            your information and the measures we have in place.
          </p>
        </div>

        <Separator className="my-8" />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Privacy Policy</CardTitle>
              </div>
              <CardDescription>How we collect, use, and protect your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our privacy policy outlines the types of information we collect, how we use it, and the steps we take to
                protect your data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <CardTitle>Security Measures</CardTitle>
              </div>
              <CardDescription>How we keep your data secure and protected</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                We implement industry-standard security measures to ensure your personal information and documents
                remain secure and confidential.
              </p>
            </CardContent>
          </Card>
        </div>

        <Alert className="mt-8">
          <Shield className="h-4 w-4" />
          <AlertTitle>Your data belongs to you</AlertTitle>
          <AlertDescription>
            We never sell your personal information to third parties. You can request deletion of your data at any time.
          </AlertDescription>
        </Alert>

        <div id="privacy-details" className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Privacy Policy</h2>
          <p className="text-muted-foreground">Last updated: April 17, 2024</p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Information We Collect</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>We collect information you provide directly to us when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create an account and use our services</li>
                    <li>Upload your resume or CV for analysis</li>
                    <li>Provide feedback or contact customer support</li>
                    <li>Subscribe to our newsletter or promotional communications</li>
                    <li>Participate in surveys, contests, or other promotional activities</li>
                  </ul>
                  <p>
                    This information may include your name, email address, resume content, professional history, and any
                    other information you choose to provide.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <span>How We Use Your Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Analyze and enhance your resume or CV</li>
                    <li>Process and complete transactions</li>
                    <li>Send you technical notices, updates, security alerts, and support messages</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Develop new products and services</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  <span>Data Storage and Retention</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in
                    this privacy policy, unless a longer retention period is required or permitted by law.
                  </p>
                  <p>
                    Your resume data is stored securely in our encrypted databases. We maintain regular backups to
                    prevent data loss, and all backups are also encrypted.
                  </p>
                  <p>
                    You can request deletion of your account and associated data at any time through your account
                    settings or by contacting our support team.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <UserCog className="h-5 w-5 text-primary" />
                  <span>Your Rights and Choices</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>Depending on your location, you may have certain rights regarding your personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and update your information through your account settings</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to the processing of your personal information</li>
                    <li>Request a copy of your personal information in a structured, commonly used format</li>
                    <li>Opt out of marketing communications</li>
                  </ul>
                  <p>To exercise these rights, please contact us at privacy@cvimprover.com.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div id="security-details" className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Security Measures</h2>
          <p className="text-muted-foreground">We implement comprehensive security measures to protect your data.</p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Encryption</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All data is encrypted both in transit and at rest using industry-standard encryption protocols. Your
                  resume and personal information are never stored in plain text.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Access Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We implement strict access controls and authentication mechanisms to ensure only authorized personnel
                  can access user data, and only for legitimate business purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regular Security Audits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We conduct regular security audits and vulnerability assessments to identify and address potential
                  security issues before they can be exploited.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Backups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We maintain regular, encrypted backups of all user data to prevent loss in case of hardware failure or
                  other incidents.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            If you have any questions about our privacy policy or security practices, please contact us at:
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> privacy@cvimprover.com
            </p>
            <p>
              <strong>Address:</strong> CV Improver Inc., 123 Resume Street, Career City, CV 12345
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            This privacy policy and security information is effective as of April 17, 2024 and will remain in effect
            except with respect to any changes in its provisions in the future, which will be in effect immediately
            after being posted on this page.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            We reserve the right to update or change our privacy policy at any time and you should check this page
            periodically. Your continued use of the service after we post any modifications to the privacy policy will
            constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified
            privacy policy.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
