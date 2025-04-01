import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark, BarChart3, Wallet, Code, Database, ArrowRight, Check, Download } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navigation */}
      <header className="container mx-auto py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">B</span>
            </div>
            <span className="font-bold text-xl">Bonsai</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
              How it works
            </Link>
            <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
            <Button asChild>
              <Link href="#download">Install Extension</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Developer Dashboard <br /> for Chrome
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Transform your new tab into a powerful command center for developers and professionals. Organize bookmarks,
          track market data, and manage your crypto wallet in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="#download">
              <Download className="mr-2 h-4 w-4" />
              Install for Chrome
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/">
              Try Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Hero Image */}
        <div className="mt-16 rounded-lg overflow-hidden shadow-xl border">
          <img src="/placeholder.svg?height=600&width=1200" alt="Bonsai Dashboard Preview" className="w-full" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Everything You Need in One Tab</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Bookmark className="h-6 w-6 text-primary" />}
            title="Smart Bookmarks"
            description="Organize and access your bookmarks with a visual, searchable interface. Group by category and access with keyboard shortcuts."
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6 text-primary" />}
            title="Market Data"
            description="Track cryptocurrency prices, stock market trends, and financial data in real-time without leaving your browser."
          />
          <FeatureCard
            icon={<Wallet className="h-6 w-6 text-primary" />}
            title="Wallet Integration"
            description="Connect your crypto wallet to monitor balances, track transactions, and interact with Web3 applications."
          />
          <FeatureCard
            icon={<Code className="h-6 w-6 text-primary" />}
            title="Developer Tools"
            description="Quick access to coding utilities, documentation, and developer resources to streamline your workflow."
          />
          <FeatureCard
            icon={<Database className="h-6 w-6 text-primary" />}
            title="DeFi Dashboard"
            description="Monitor your DeFi positions, yields, and investments across multiple protocols in one place."
          />
          <FeatureCard
            icon={<Check className="h-6 w-6 text-primary" />}
            title="Customizable"
            description="Personalize your dashboard with themes, layouts, and widgets to match your workflow and preferences."
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-secondary/30 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Install the Extension</h3>
              <p className="text-muted-foreground">
                Add Bonsai Dashboard to Chrome with just one click. No account required.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Open a New Tab</h3>
              <p className="text-muted-foreground">
                Your new tab is automatically transformed into your personalized dashboard.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Customize & Enjoy</h3>
              <p className="text-muted-foreground">
                Arrange your dashboard sections, connect your wallet, and boost your productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-secondary/30 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FaqItem
              question="Is Bonsai Dashboard free to use?"
              answer="Yes, Bonsai Dashboard is completely free to use. We may introduce premium features in the future, but the core functionality will always remain free."
            />
            <FaqItem
              question="Does Bonsai collect my browsing data?"
              answer="No. Bonsai Dashboard respects your privacy and does not collect any browsing history or personal data. All your bookmarks and settings are stored locally on your device."
            />
            <FaqItem
              question="Which browsers are supported?"
              answer="Currently, Bonsai Dashboard is available for Google Chrome and Chromium-based browsers like Brave and Edge. Support for Firefox and Safari is coming soon."
            />
            <FaqItem
              question="Is my wallet information secure?"
              answer="Absolutely. Bonsai Dashboard uses read-only connections to your wallet and never stores your private keys or seed phrases. All sensitive data remains on your device."
            />
            <FaqItem
              question="Can I sync my dashboard across devices?"
              answer="Yes, when you sign in with your Google account, your dashboard settings and layout preferences will sync across all your devices."
            />
            <FaqItem
              question="How do I request new features?"
              answer="We love hearing from our users! You can submit feature requests through our GitHub repository or by clicking the feedback button in the extension settings."
            />
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Browser?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Join thousands of developers and professionals who have upgraded their browsing experience with Bonsai
          Dashboard.
        </p>
        <Button size="lg" className="px-8">
          <Download className="mr-2 h-4 w-4" />
          Install Bonsai Dashboard
        </Button>
        <p className="text-sm text-muted-foreground mt-4">Available for Chrome, Brave, and Edge browsers</p>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">B</span>
              </div>
              <span className="font-bold text-xl">Bonsai</span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="https://github.com" className="text-sm text-muted-foreground hover:text-foreground">
                GitHub
              </Link>
            </div>
          </div>
          <div className="text-center md:text-left text-sm text-muted-foreground mt-8">
            © {new Date().getFullYear()} Bonsai Dashboard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border bg-card">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}

