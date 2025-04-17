import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, Scale, Shield, AlertTriangle, BookOpen, Gavel, RefreshCw } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms and Conditions | ResumeRise",
  description: "Terms and conditions for using the ResumeRise platform",
}

export default function TermsPage() {
  return (
    <>
      <Header showNav={true} showGetStarted={false} />
      <div className="container max-w-4xl py-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Terms and Conditions</h1>
          <p className="text-muted-foreground text-lg">
            Please read these terms and conditions carefully before using the ResumeRise platform.
          </p>
        </div>

        <Separator className="my-8" />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>User Agreement</CardTitle>
              </div>
              <CardDescription>Your rights and responsibilities when using our platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                By accessing or using ResumeRise, you agree to be bound by these Terms and Conditions and our Privacy
                Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                <CardTitle>Legal Information</CardTitle>
              </div>
              <CardDescription>Important legal details about our service</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about our liability limitations, dispute resolution process, and the governing laws that apply.
              </p>
            </CardContent>
          </Card>
        </div>

        <Alert className="mt-8">
          <BookOpen className="h-4 w-4" />
          <AlertTitle>Last Updated: April 17, 2024</AlertTitle>
          <AlertDescription>
            These terms may be updated periodically. Please check back regularly for any changes.
          </AlertDescription>
        </Alert>

        <div id="user-agreement" className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">User Agreement</h2>
          <p className="text-muted-foreground">The following terms govern your use of the ResumeRise platform.</p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Acceptance of Terms</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    By accessing or using the ResumeRise platform, website, or any applications made available by
                    ResumeRise (collectively, the "Service"), you agree to be bound by these terms and conditions
                    ("Terms"). If you do not agree to all of these Terms, you may not access or use the Service.
                  </p>
                  <p>
                    We reserve the right to modify these Terms at any time. Your continued use of the Service following
                    the posting of revised Terms means that you accept and agree to the changes.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>User Accounts</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    To access certain features of the Service, you may be required to register for an account. You agree
                    to provide accurate, current, and complete information during the registration process and to update
                    such information to keep it accurate, current, and complete.
                  </p>
                  <p>
                    You are responsible for safeguarding your password and for all activities that occur under your
                    account. You agree to notify us immediately of any unauthorized use of your account.
                  </p>
                  <p>
                    We reserve the right to disable any user account at any time if, in our opinion, you have failed to
                    comply with any provision of these Terms.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <span>User Responsibilities</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    You are solely responsible for the content you upload to the Service, including your resume, CV, and
                    any other information. You agree not to upload any content that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Is false, misleading, or deceptive</li>
                    <li>Infringes on any third party's intellectual property rights</li>
                    <li>Contains software viruses or any other code designed to harm computer systems</li>
                    <li>Contains personal or identifying information about another person without their consent</li>
                    <li>Is illegal, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
                  </ul>
                  <p>
                    We reserve the right to remove any content that violates these Terms or that we find objectionable
                    for any reason, without prior notice.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Intellectual Property</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    The Service and its original content, features, and functionality are owned by ResumeRise and are
                    protected by international copyright, trademark, patent, trade secret, and other intellectual
                    property laws.
                  </p>
                  <p>
                    You retain all rights to the content you upload to the Service. By uploading content, you grant us a
                    worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate,
                    and distribute your content in connection with providing the Service to you.
                  </p>
                  <p>
                    Our name, logo, and all related names, logos, product and service names, designs, and slogans are
                    trademarks of ResumeRise. You may not use such marks without our prior written permission.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  <span>Subscription and Payments</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Some aspects of the Service may be offered on a subscription basis. By subscribing to our Service,
                    you agree to the following terms:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Subscription fees are charged in advance on a monthly or annual basis, depending on your selected
                      plan
                    </li>
                    <li>
                      Subscriptions automatically renew unless canceled at least 24 hours before the end of the current
                      period
                    </li>
                    <li>You can cancel your subscription at any time through your account settings</li>
                    <li>No refunds will be provided for partial subscription periods</li>
                  </ul>
                  <p>
                    We reserve the right to change our subscription fees upon reasonable notice. Such notice may be
                    provided by email, through the Service, or by posting the changes on our website.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div id="legal-information" className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Legal Information</h2>
          <p className="text-muted-foreground">Important legal details about using our service.</p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-6">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <span>Limitation of Liability</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    To the maximum extent permitted by law, ResumeRise and its affiliates, officers, employees, agents,
                    partners, and licensors shall not be liable for any indirect, incidental, special, consequential, or
                    punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                    intangible losses, resulting from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your access to or use of or inability to access or use the Service</li>
                    <li>Any conduct or content of any third party on the Service</li>
                    <li>Any content obtained from the Service</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  </ul>
                  <p>
                    In no event shall our total liability to you for all claims exceed the amount you have paid to us
                    for the Service in the past twelve months.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  <span>Disclaimer of Warranties</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    The Service is provided on an "AS IS" and "AS AVAILABLE" basis without any representation or
                    warranty, whether express, implied, or statutory. ResumeRise specifically disclaims any implied
                    warranties of title, merchantability, fitness for a particular purpose, and non-infringement.
                  </p>
                  <p>ResumeRise does not warrant that:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The Service will meet your specific requirements</li>
                    <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                    <li>The results that may be obtained from the use of the Service will be accurate or reliable</li>
                    <li>
                      The quality of any products, services, information, or other material purchased or obtained by you
                      through the Service will meet your expectations
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-primary" />
                  <span>Governing Law</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction],
                    without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of
                    those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the
                    remaining provisions of these Terms will remain in effect.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  <span>Changes to Terms</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                    revision is material, we will try to provide at least 30 days' notice prior to any new terms taking
                    effect.
                  </p>
                  <p>
                    What constitutes a material change will be determined at our sole discretion. By continuing to
                    access or use our Service after those revisions become effective, you agree to be bound by the
                    revised terms.
                  </p>
                  <p>If you do not agree to the new terms, please stop using the Service.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <span>Termination</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    We may terminate or suspend your account and bar access to the Service immediately, without prior
                    notice or liability, under our sole discretion, for any reason whatsoever, including without
                    limitation if you breach the Terms.
                  </p>
                  <p>
                    If you wish to terminate your account, you may simply discontinue using the Service or delete your
                    account through the account settings.
                  </p>
                  <p>
                    All provisions of the Terms which by their nature should survive termination shall survive
                    termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity,
                    and limitations of liability.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> legal@resumeRise.com
            </p>
            <p>
              <strong>Address:</strong> ResumeRise Inc., 123 Resume Street, Career City, CV 12345
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            By using ResumeRise, you acknowledge that you have read these Terms and Conditions, understand them, and
            agree to be bound by them.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            If you do not agree to these Terms and Conditions, you must not access or use the Service.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
