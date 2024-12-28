import { HomeContent } from '@/components/ui/home-content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Instagram, Bot, MessageCircle, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl font-bold sm:text-6xl">
            Instagram Automation Made Simple
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automate your Instagram engagement with AI-powered responses and smart automation rules.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                <Instagram className="w-5 h-5" />
                Connect Instagram
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline" className="gap-2">
                <MessageCircle className="w-5 h-5" />
                Try AI Chat
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 border rounded-lg">
            <Bot className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Smart Automation</h3>
            <p className="text-muted-foreground">
              Set up intelligent automation rules for your Instagram engagement.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <MessageCircle className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">AI Chat Assistant</h3>
            <p className="text-muted-foreground">
              Get help with automation setup and Instagram strategy.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <Settings className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Easy Configuration</h3>
            <p className="text-muted-foreground">
              Simple settings to control your automation preferences.
            </p>
          </div>
        </div>

        <HomeContent />
      </main>
    </div>
  );
}